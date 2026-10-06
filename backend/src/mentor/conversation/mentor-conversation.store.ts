import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { randomUUID } from "crypto";
import { DataSource } from "typeorm";
import { returnedRows } from "../mentor-sql";

export type ConversationRow = {
  id: string;
  title: string;
  updated_at: string;
  created_at: string;
};
export type MessageRow = {
  id: string;
  sequence: number;
  role: "user" | "assistant";
  content: string;
  status: "complete" | "partial";
  created_at: string;
};
@Injectable()
export class MentorConversationStore {
  constructor(@InjectDataSource() private readonly db: DataSource) {}
  async create(accountId: string, title: string): Promise<ConversationRow> {
    const rows: ConversationRow[] = await this.db.query(
      `INSERT INTO webdev_mentor_conversations(id,account_id,title) VALUES($1,$2,$3)
       RETURNING id,title,updated_at,created_at`,
      [randomUUID(), accountId, title]
    );
    return rows[0];
  }
  async list(accountId: string, limit: number, cursor: string | null) {
    const rows: ConversationRow[] = await this.db.query(
      `SELECT id,title,updated_at,created_at FROM webdev_mentor_conversations
       WHERE account_id=$1 AND status='active'
       AND ($2::uuid IS NULL OR (updated_at,id) <
         (SELECT updated_at,id FROM webdev_mentor_conversations WHERE id=$2 AND account_id=$1))
       ORDER BY updated_at DESC,id DESC LIMIT $3`,
      [accountId, cursor, limit + 1]
    );
    return {
      entries: rows.slice(0, limit),
      nextCursor: rows.length > limit ? rows[limit - 1].id : null,
    };
  }
  async messages(
    accountId: string,
    conversationId: string,
    limit: number,
    cursor: number | null
  ) {
    await this.owned(accountId, conversationId);
    const rows: MessageRow[] = await this.db.query(
      `SELECT id,sequence,role,content,status,created_at FROM webdev_mentor_messages
       WHERE account_id=$1 AND conversation_id=$2 AND ($3::integer IS NULL OR sequence<$3)
       ORDER BY sequence DESC LIMIT $4`,
      [accountId, conversationId, cursor, limit + 1]
    );
    return {
      entries: rows.slice(0, limit).reverse(),
      nextCursor: rows.length > limit ? rows[limit - 1].sequence : null,
    };
  }
  async add(
    accountId: string,
    conversationId: string,
    role: "user" | "assistant",
    content: string
  ): Promise<MessageRow> {
    const runner = this.db.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const owners: { id: string }[] = await runner.query(
        `SELECT id FROM webdev_mentor_conversations WHERE id=$1 AND account_id=$2 AND status='active' FOR UPDATE`,
        [conversationId, accountId]
      );
      if (!owners.length) throw new NotFoundException("Conversation not found");
      const [{ next }]: { next: number }[] = await runner.query(
        `SELECT coalesce(max(sequence),0)+1 AS next FROM webdev_mentor_messages WHERE conversation_id=$1`,
        [conversationId]
      );
      const rows: MessageRow[] = await runner.query(
        `INSERT INTO webdev_mentor_messages(id,conversation_id,account_id,sequence,role,content)
         VALUES($1,$2,$3,$4,$5,$6) RETURNING id,sequence,role,content,status,created_at`,
        [randomUUID(), conversationId, accountId, next, role, content]
      );
      await runner.query(
        `UPDATE webdev_mentor_conversations SET updated_at=now() WHERE id=$1 AND account_id=$2`,
        [conversationId, accountId]
      );
      await runner.commitTransaction();
      return rows[0];
    } catch (error) {
      await runner.rollbackTransaction();
      throw error;
    } finally {
      await runner.release();
    }
  }
  async remove(accountId: string, conversationId: string) {
    const rows = returnedRows<{ id: string }>(
      await this.db.query(
        `DELETE FROM webdev_mentor_conversations WHERE id=$1 AND account_id=$2 RETURNING id`,
        [conversationId, accountId]
      )
    );
    if (!rows.length) throw new NotFoundException("Conversation not found");
    return { deleted: true };
  }
  private async owned(accountId: string, conversationId: string) {
    const rows: { id: string }[] = await this.db.query(
      `SELECT id FROM webdev_mentor_conversations WHERE id=$1 AND account_id=$2 AND status='active'`,
      [conversationId, accountId]
    );
    if (!rows.length) throw new NotFoundException("Conversation not found");
  }
}

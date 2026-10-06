import { ConflictException, Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import type { LearnerInput } from "../api/mentor-input";
import { returnedRows } from "../mentor-sql";

type ProfileRow = {
  goal: LearnerInput["goal"];
  level: LearnerInput["level"];
  weekly_hours: number;
  goal_text: string;
  version: number;
};
@Injectable()
export class MentorProfileStore {
  constructor(@InjectDataSource() private readonly db: DataSource) {}
  async get(accountId: string) {
    const rows: ProfileRow[] = await this.db.query(
      `SELECT goal,level,weekly_hours,goal_text,version FROM webdev_learner_profiles WHERE account_id=$1`,
      [accountId]
    );
    const row = rows[0];
    return row
      ? {
          goal: row.goal,
          level: row.level,
          hours: row.weekly_hours,
          outcome: row.goal_text,
          version: row.version,
        }
      : null;
  }
  async save(
    accountId: string,
    profile: LearnerInput,
    expectedVersion: number | null
  ) {
    if (expectedVersion === null) {
      const rows: ProfileRow[] = await this.db.query(
        `INSERT INTO webdev_learner_profiles(account_id,goal,level,weekly_hours,goal_text)
         VALUES($1,$2,$3,$4,$5) ON CONFLICT(account_id) DO NOTHING
         RETURNING goal,level,weekly_hours,goal_text,version`,
        [accountId, profile.goal, profile.level, profile.hours, profile.outcome]
      );
      if (!rows.length) throw new ConflictException("Profile version changed");
    } else {
      const rows = returnedRows<ProfileRow>(
        await this.db.query(
          `UPDATE webdev_learner_profiles SET goal=$2,level=$3,weekly_hours=$4,goal_text=$5,
         version=version+1,updated_at=now() WHERE account_id=$1 AND version=$6 RETURNING version`,
          [
            accountId,
            profile.goal,
            profile.level,
            profile.hours,
            profile.outcome,
            expectedVersion,
          ]
        )
      );
      if (!rows.length) throw new ConflictException("Profile version changed");
    }
    return this.get(accountId);
  }
}

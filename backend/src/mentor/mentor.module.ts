import { Module } from "@nestjs/common";
import { AnalyticsModule } from "../analytics/analytics.module";
import { MentorController } from "./api/mentor.controller";
import { MentorProfileStore } from "./profile/mentor-profile.store";
import { MentorConversationStore } from "./conversation/mentor-conversation.store";
import { MentorPathwayStore } from "./pathway/mentor-pathway.store";

@Module({
  imports: [AnalyticsModule],
  controllers: [MentorController],
  providers: [MentorProfileStore, MentorConversationStore, MentorPathwayStore],
})
export class MentorModule {}

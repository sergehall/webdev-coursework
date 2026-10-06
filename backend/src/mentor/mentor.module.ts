import { Module } from "@nestjs/common";
import { AnalyticsModule } from "../analytics/analytics.module";
import { MentorController } from "./api/mentor.controller";
import { MentorProfileStore } from "./profile/mentor-profile.store";
import { MentorConversationStore } from "./conversation/mentor-conversation.store";
import { MentorPathwayStore } from "./pathway/mentor-pathway.store";
import { MentorGenerationController } from "./api/mentor-generation.controller";
import { GenerationStore } from "./generation/generation.store";
import { GenerationPrompt } from "./generation/generation-prompt";
import { CloudflareProvider } from "./generation/cloudflare-provider";
import { GenerationService } from "./generation/generation.service";
import { PlanPrompt } from "./pathway/plan-prompt";
import { PlanGenerationStore } from "./pathway/plan-generation.store";

@Module({
  imports: [AnalyticsModule],
  controllers: [MentorController, MentorGenerationController],
  providers: [
    MentorProfileStore,
    MentorConversationStore,
    MentorPathwayStore,
    GenerationStore,
    GenerationPrompt,
    CloudflareProvider,
    GenerationService,
    PlanPrompt,
    PlanGenerationStore,
  ],
})
export class MentorModule {}

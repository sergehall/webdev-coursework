import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";
import { CircuitBreakerService } from "./app/circuit-breaker.service";
import { TypeOrmPostgresOptions } from "./db/TypeOrmPostgresOptions";
import { HttpLoggingMiddleware } from "./app/http-logging.middleware";
import { QuizModule } from "./quiz/quiz.module";
import { TokensModule } from "./tokens/tokens.module";
import { MentorModule } from "./mentor/mentor.module";
import { AnalyticsModule } from "./analytics/analytics.module";
import { SecurityModule } from "./security/security.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public", "assets"),
      serveRoot: "/assets",
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === "production" ? ".env" : [".env.local", ".env"],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmPostgresOptions,
    }),
    SecurityModule,
    QuizModule,
    TokensModule,
    AnalyticsModule,
    MentorModule,
  ],
  controllers: [AppController],
  providers: [AppService, CircuitBreakerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggingMiddleware)
      .forRoutes({ path: "*path", method: RequestMethod.ALL }); // all routes
  }
}

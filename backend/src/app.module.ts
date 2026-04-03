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
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CircuitBreakerService } from "./app/circuit-breaker.service";
import { TypeOrmPostgresOptions } from "./db/TypeOrmPostgresOptions";
import { HttpLoggingMiddleware } from "./middlewares/http-logging.middleware";
import { QuizModule } from "./quiz/quiz.module";
import { TokensModule } from "./tokens/tokens.module";

@Module({
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, "..", "uploads"),
        serveRoot: "/uploads",
      },
      {
        rootPath: join(__dirname, "..", "public", "assets"),
        serveRoot: "/assets",
      }
    ),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmPostgresOptions,
    }),
    QuizModule,
    TokensModule,
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

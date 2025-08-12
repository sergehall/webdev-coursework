import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmPostgresOptions } from "./db/TypeOrmPostgresOptions";
import { HttpLoggingMiddleware } from "./middlewares/http-logging.middleware";
import { QuizModule } from "./quiz/quiz.module";
import { TokensModule } from "./tokens/tokens.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads",
    }),
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
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggingMiddleware).forRoutes("*"); // Apply logger middleware to all routes
  }
}

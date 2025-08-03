import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello from backend --- Web Developer Learning Portal! ---";
  }
}

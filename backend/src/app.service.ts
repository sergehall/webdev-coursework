import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello from  backend smc-2025-cs81-javascript-programming!";
  }
}

// src/swagger/api-doc.service.ts
import { applyDecorators } from "@nestjs/common";
import { ApiDocRegistry } from "./api-doc.registry";
import { EndpointKeys } from "./enums/endpoint-keys.enum";

export class ApiDocService {
  static apply(
    endpointKey: EndpointKeys,
    method: string,
    description?: string
  ) {
    const domain = (ApiDocRegistry as any)[endpointKey] ?? {};
    const factory = domain[method];
    return factory ? factory(description) : applyDecorators();
  }
}

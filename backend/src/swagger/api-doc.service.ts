// src/swagger/api-doc.service.ts
import { applyDecorators } from "@nestjs/common";
import { ApiDocRegistry } from "./api-doc.registry";
import type { EndpointKeys } from "./enums/endpoint-keys.enum";

type ApiDocFactory = (
  description?: string
) => ReturnType<typeof applyDecorators>;
type ApiDocRegistryShape = Record<
  EndpointKeys,
  Partial<Record<string, ApiDocFactory>>
>;

export class ApiDocService {
  static apply(
    endpointKey: EndpointKeys,
    method: string,
    description?: string
  ) {
    const registry = ApiDocRegistry as ApiDocRegistryShape;
    const domain = registry[endpointKey] ?? {};
    const factory = domain[method];
    return factory ? factory(description) : applyDecorators();
  }
}

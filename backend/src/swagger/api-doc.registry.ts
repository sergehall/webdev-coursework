import { appApiDocRegistry } from "./api-doc.registry.app";
import { quizzesApiDocRegistry } from "./api-doc.registry.quizzes";
import { EndpointKeys } from "./enums/endpoint-keys.enum";

export const ApiDocRegistry = {
  [EndpointKeys.Quizzes]: quizzesApiDocRegistry,
  [EndpointKeys.App]: appApiDocRegistry,
} as const;

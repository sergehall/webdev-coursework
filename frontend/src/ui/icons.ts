// frontend/src/ui/icons.ts
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import {
  Circle,
  FileCode2,
  Paintbrush2,
  Code2,
  Braces,
  Route,
  Cloud,
  Wrench,
  BadgeHelp,
  Atom,
  Palette,
  Sparkles,
  Rocket,
  CloudSun,
  GaugeCircle,
  LayoutTemplate,
  Regex,
  Terminal,
  FileText,
  Database,
  Table,
  Boxes,
  Key,
  Lock,
  Server,
} from "lucide-react";

export type IconProps = LucideProps;

export const ICONS = {
  Circle,
  FileCode2,
  Paintbrush2,
  Code2,
  Braces,
  Route,
  Cloud,
  Wrench,
  BadgeHelp,
  Atom,
  Palette,
  Sparkles,
  Rocket,
  CloudSun,
  GaugeCircle,
  LayoutTemplate,
  Regex,
  Terminal,
  FileText,
  Database,
  Table,
  Boxes,
  Key,
  Lock,
  Server,
} as const;

export type IconName = keyof typeof ICONS;

export function getIconComponent(name: string): ComponentType<IconProps> {
  return (ICONS as Record<string, ComponentType<IconProps>>)[name] ?? Circle;
}

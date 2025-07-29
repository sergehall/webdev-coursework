import type { Variants } from "@/components/buttons/types/variants";

// Color variants mapping
const variants: Record<Variants, string> = {
  gray: "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100",
  brown:
    "bg-yellow-900/20 hover:bg-yellow-900/30 dark:bg-yellow-900 dark:hover:bg-yellow-800 text-yellow-900 dark:text-white",

  slate:
    "bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100",
  zinc: "bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-900 dark:text-zinc-100",
  neutral:
    "bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-neutral-900 dark:text-neutral-100",
  stone:
    "bg-stone-200 hover:bg-stone-300 dark:bg-stone-700 dark:hover:bg-stone-600 text-stone-900 dark:text-stone-100",
  red: "bg-red-100 hover:bg-red-200 dark:bg-red-600 dark:hover:bg-red-700 text-red-900 dark:text-white",
  orange:
    "bg-orange-100 hover:bg-orange-200 dark:bg-orange-600 dark:hover:bg-orange-700 text-orange-900 dark:text-white",
  amber:
    "bg-amber-100 hover:bg-amber-200 dark:bg-amber-500 dark:hover:bg-amber-600 text-amber-900 dark:text-white",
  yellow:
    "bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-yellow-900 dark:text-black",
  lime: "bg-lime-100 hover:bg-lime-200 dark:bg-lime-600 dark:hover:bg-lime-700 text-lime-900 dark:text-white",
  green:
    "bg-green-100 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 text-green-900 dark:text-green-100",
  emerald:
    "bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-emerald-900 dark:text-white",
  teal: "bg-teal-100 hover:bg-teal-200 dark:bg-teal-600 dark:hover:bg-teal-700 text-teal-900 dark:text-white",
  cyan: "bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-cyan-900 dark:text-white",
  sky: "bg-sky-100 hover:bg-sky-200 dark:bg-sky-600 dark:hover:bg-sky-700 text-sky-900 dark:text-white",
  blue: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 text-blue-900 dark:text-white",
  indigo:
    "bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-indigo-900 dark:text-white",
  violet:
    "bg-violet-100 hover:bg-violet-200 dark:bg-violet-600 dark:hover:bg-violet-700 text-violet-900 dark:text-white",
  purple:
    "bg-purple-100 hover:bg-purple-200 dark:bg-purple-600 dark:hover:bg-purple-700 text-purple-900 dark:text-white",
  fuchsia:
    "bg-fuchsia-100 hover:bg-fuchsia-200 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 text-fuchsia-900 dark:text-white",
  pink: "bg-pink-100 hover:bg-pink-200 dark:bg-pink-600 dark:hover:bg-pink-700 text-pink-900 dark:text-white",
  rose: "bg-rose-100 hover:bg-rose-200 dark:bg-rose-600 dark:hover:bg-rose-700 text-rose-900 dark:text-white",
  primary:
    "bg-blue-100 hover:bg-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 text-blue-900 dark:text-white",
  secondary:
    "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-white",
  success:
    "bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-emerald-900 dark:text-white",
  danger:
    "bg-red-100 hover:bg-red-200 dark:bg-red-600 dark:hover:bg-red-700 text-red-900 dark:text-white",
  warning:
    "bg-amber-100 hover:bg-amber-200 dark:bg-amber-500 dark:hover:bg-amber-600 text-amber-900 dark:text-black",
  info: "bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-cyan-900 dark:text-white",
  lightBrown:
    "bg-amber-100 hover:bg-amber-200 dark:bg-amber-700 dark:hover:bg-amber-800 text-amber-900 dark:text-white",

  default:
    "bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-600 dark:hover:bg-neutral-500 text-neutral-900 dark:text-white",
};

export default function ColoredButton({
  variant = "default",
  className = "",
}: {
  variant?: Variants;
  className?: string;
}): string {
  return `${variants[variant]} ${className}`.trim();
}

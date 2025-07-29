export interface UIQuestion {
  id: number;
  question: string;
  options: string[];
  imageUrl?: string[];
  multiple?: boolean;
}

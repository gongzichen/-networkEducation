import Lesson from "./Lesson";
export interface CartItem {
  lesson: Lesson;
  count: number;
  checked: boolean;
}

export interface CartState {}

export type CartItem = CartItem[];

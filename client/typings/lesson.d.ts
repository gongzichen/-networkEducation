export default interface Lesson {
  id: string;
  title: string;
  video: string;
  poster: string;
  url: string;
  price: string;
  category: string;
}

export interface LessonResult {
  data: Lesson;
  success: boolean;
}

export interface Question {
  question: string;
  answers: string[];
  result: string;
}

export interface SelectedAnswer {
  question: string;
  selectedAnswer: string;
}

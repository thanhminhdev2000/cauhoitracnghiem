import React, { useState } from "react";
import "./App.css";
import type { Question, SelectedAnswer } from "./type";
import { fullQuestions } from "./questions";

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Quiz: React.FC<{
  index: number;
  question: string;
  answers: string[];
  onSelectAnswer: (answer: string) => void;
}> = ({ index, question, answers, onSelectAnswer }) => {
  return (
    <div className="quiz">
      <h2>
        Câu {index} : {question}
      </h2>
      <div className="answers">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(answer)}
            className="answer-btn"
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [numQuestions, setNumQuestions] = useState<number>(1);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const [questions] = useState<Question[]>(fullQuestions);

  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const handleSelectAnswer = (answer: string) => {
    const currentQ = shuffledQuestions[currentQuestionIndex];

    // Kiểm tra đúng/sai
    if (answer === currentQ.result) {
      setCorrectCount((prev) => prev + 1);
    }

    setSelectedAnswers([
      ...selectedAnswers,
      {
        question: currentQ.question,
        selectedAnswer: answer,
      },
    ]);

    // Chuyển sang câu tiếp theo
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
    } else {
      alert(`✅ Bạn trả lời đúng ${correctCount} câu!`);
      setQuizStarted(false);
    }
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <div className="App">
      {!quizStarted ? (
        <div className="start-screen">
          <h2>Chọn số lượng câu hỏi muốn làm:</h2>
          <input
            type="number"
            min={1}
            max={questions.length}
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
          />
          <button
            onClick={() => {
              const shuffled = shuffleArray(questions).slice(0, numQuestions);
              setShuffledQuestions(shuffled);
              setQuizStarted(true);
              setCurrentQuestionIndex(0);
              setSelectedAnswers([]);
            }}
            disabled={numQuestions < 1 || numQuestions > questions.length}
          >
            Bắt đầu
          </button>
        </div>
      ) : (
        <>
          <Quiz
            index={currentQuestionIndex + 1}
            question={currentQuestion.question}
            answers={currentQuestion.answers}
            onSelectAnswer={handleSelectAnswer}
          />

          <div className="quiz-controls">
            <button
              onClick={() => {
                if (currentQuestionIndex > 0) {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                  setShowAnswer(false);
                }
              }}
              disabled={currentQuestionIndex === 0}
            >
              Quay lại
            </button>

            <button onClick={() => setShowAnswer(!showAnswer)}>
              {showAnswer ? "Ẩn đáp án" : "Hiện đáp án đúng"}
            </button>

            <button
              onClick={() => {
                if (currentQuestionIndex < shuffledQuestions.length - 1) {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                  setShowAnswer(false);
                }
              }}
              disabled={currentQuestionIndex === shuffledQuestions.length - 1}
            >
              Tiếp theo
            </button>
          </div>

          {showAnswer && (
            <div className="correct-answer">
              ✅ Đáp án đúng: <strong>{currentQuestion.result}</strong>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

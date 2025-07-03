import React, { useState, useEffect } from 'react';
import './App.css';

// Định nghĩa kiểu dữ liệu cho câu hỏi
interface Question {
  question: string;
  answers: string[];
  result: string;
}

interface SelectedAnswer {
  question: string;
  selectedAnswer: string;
}

// Component Quiz nhận vào các props question và answers từ App
const Quiz: React.FC<{
  question: string;
  answers: string[];
  onSelectAnswer: (answer: string) => void;
}> = ({ question, answers, onSelectAnswer }) => {
  return (
    <div className="quiz">
      <h2>{question}</h2>
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
  const [questions, setQuestions] = useState<Question[]>([
  {
    "question": "Hôm nay ăn gì?",
    "answers": [
      "Mì tôm", "Đậu phông", "Mắm", "Cá"
    ],
    "result": "Mì tôm"
  },
  {
    "question": "Hôm nay thế nào?",
    "answers": [
      "Buồn", "Vui", "Chán", "Ngủ"
    ],
    "result": "Ngủ"
  },
  {
    "question": "Hôm nay ăn gì?",
    "answers": [
      "Mì tôm", "Đậu phông", "Mắm", "Cá"
    ],
    "result": "Mì tôm"
  }
]

);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  // Tải dữ liệu câu hỏi từ file JSON hoặc API
  useEffect(() => {
    fetch('./questions.json') // Thay thế bằng API nếu cần
      .then(response => response.json())
      .then((data: Question[]) => setQuestions(data));
  }, []);

  console.log({questions})

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswers([
      ...selectedAnswers,
      {
        question: questions[currentQuestionIndex].question,
        selectedAnswer: answer,
      },
    ]);

    // Chuyển sang câu hỏi tiếp theo
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("Bạn đã hoàn thành bài kiểm tra!");
    }
  };

  // if (questions.length === 0) return <div>Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="App">
      <Quiz
        question={currentQuestion.question}
        answers={currentQuestion.answers}
        onSelectAnswer={handleSelectAnswer}
      />
      <div className="selected-answers">
        <h3>Câu trả lời của bạn:</h3>
        <ul>
          {selectedAnswers.map((answer, index) => (
            <li key={index}>
              <strong>{answer.question}: </strong> {answer.selectedAnswer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

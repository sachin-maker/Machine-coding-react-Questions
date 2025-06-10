import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextQuestion, selectAnswer } from "../store/quizSlice";
import '../style.css'



const Quiz = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, status, completed } = useSelector(state => state.quiz);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    setTimeLeft(15);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          setTimeout(() => {
            if (!completed) dispatch(nextQuestion());
          }, 0);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestionIndex, completed, dispatch]);

  // Safe default for memo
  const question = questions?.[currentQuestionIndex];

  const shuffledAnswers = useMemo(() => {
    if (!question) return [];
    const combined = [...question.incorrect_answers, question.correct_answer];
    return combined.sort(() => Math.random() - 0.5);
  }, [question]);

  // Early returns
  if (status === "loading") return <p>Loading questions...</p>;
  if (status === "failed") return <p>Failed to load questions. Please try again.</p>;
  if (!Array.isArray(questions) || questions.length === 0) return <p>Loading questions...</p>;
  if (completed) return <p>Quiz completed! You can show results here.</p>;
  if (!question) return <p>Loading current question...</p>;

  const handleAnswer = (answer) => {
    if (completed) return;
    dispatch(selectAnswer({ questionIndex: currentQuestionIndex, answer }));
    dispatch(nextQuestion());
    setTimeLeft(15);
  };

  return (
    <div className="quiz-container">
      <div className="timer">Time Left: <strong>{timeLeft}</strong>s</div>
      <h2 className="question" dangerouslySetInnerHTML={{ __html: question.question }} />
      <div className="options">
        {shuffledAnswers.map((ans, idx) => (
          <button
            key={idx}
            className="option"
            onClick={() => handleAnswer(ans)}
            dangerouslySetInnerHTML={{ __html: ans }}
          />
        ))}
      </div>
    </div>
  );
};

export default Quiz;

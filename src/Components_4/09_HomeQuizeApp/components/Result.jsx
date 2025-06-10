import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions, resetQuiz } from "../store/quizSlice";


const Result = () => {
  const dispatch = useDispatch();
  const { questions, answers } = useSelector((state) => state.quiz);

  const score = answers.reduce((acc, ans, idx) => {
    return acc + (ans === questions[idx].correct_answer ? 1 : 0);
  }, 0);

  const handleRetry = () => {
    dispatch(resetQuiz());
    dispatch(fetchQuestions()); // ✅ fetch again after reset
  };

  return (
    <div className="result-container">
      <h2 className="score">Your Score: {score}/10</h2>
      <div className="report">
        {questions.map((q, idx) => (
          <div key={idx} className="report-item">
            <div className="report-question" dangerouslySetInnerHTML={{ __html: `${idx + 1}. ${q.question}` }} />
            <div className="correct">
              Correct Answer: <span dangerouslySetInnerHTML={{ __html: q.correct_answer }} />
            </div>
            <div className={answers[idx] === q.correct_answer ? "your-answer correct" : "your-answer incorrect"}>
              Your Answer: <span dangerouslySetInnerHTML={{ __html: answers[idx] || "(No Answer)" }} />
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleRetry} className="retry-button">
        Retry Quiz
      </button>
    </div>
  );
};

export default Result;

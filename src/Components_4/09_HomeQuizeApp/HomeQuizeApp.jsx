import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "./store/quizSlice";
import Result from "./components/Result";
import Quiz from "./components/Quiz";

const HomeQuizeApp = () => {
   const dispatch = useDispatch();
  const { questions, currentQuestionIndex, completed } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div className="home">
      <h1 className="title">React Quiz App</h1>
      {completed ? <Result /> : <Quiz />}
    </div>
  );
};

export default HomeQuizeApp
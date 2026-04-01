
import { useState } from "react";
import QuizStart from "./QuizStart";
import QuizPlay from "./QuizPlay";
import QuizResult from "./QuizResult";
import "./aiquiz.css";

function AIQuiz() {

  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // When quiz is set, reset everything
  const handleSetQuiz = (data) => {
    setQuiz(data);
    setIndex(0);
    setScore(0);
    setFinished(false);
  };

  return (

    <div className="quiz-page">

      {quiz.length === 0 && (
        <QuizStart setQuiz={handleSetQuiz} />
      )}

      {quiz.length > 0 && !finished && (
        <QuizPlay
          quiz={quiz}
          index={index}
          setIndex={setIndex}
          score={score}
          setScore={setScore}
          setFinished={setFinished}
        />
      )}

      {finished && (
        <QuizResult
          score={score}
          total={quiz.length}
        />
      )}

    </div>

  );

}

export default AIQuiz;
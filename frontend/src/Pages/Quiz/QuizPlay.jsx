import { useState } from "react";

function QuizPlay({ quiz, index, setIndex, score, setScore, setFinished }) {

  const [selectedAnswers, setSelectedAnswers] = useState({});

  if (!quiz || quiz.length === 0) return null;

  const currentQuestion = quiz[index];

  const handleSelect = (option) => {

    setSelectedAnswers({
      ...selectedAnswers,
      [index]: option
    });

  };

  const handleNext = () => {

    const selected = selectedAnswers[index];

    // ⭐ SCORE UPDATE HERE
    if (selected === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }

    if (index + 1 < quiz.length) {
      setIndex(prev => prev + 1);
    } else {
      setFinished(true);
    }

  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
    }
  };

  return (

    <div className="quiz-container">

      <div className="quiz-progress">
        Question {index + 1} / {quiz.length}
      </div>

      <h3 className="quiz-question">
        {currentQuestion.question}
      </h3>

      <div className="options">

        {currentQuestion.options.map((opt, i) => {

          let className = "option-btn";

          const selected = selectedAnswers[index];

          if (selected) {

            if (opt === currentQuestion.answer) {
              className += " correct";
            }

            if (opt === selected && opt !== currentQuestion.answer) {
              className += " wrong";
            }

          }

          return (
            <button
              key={i}
              className={className}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </button>
          );

        })}

      </div>

      <div className="quiz-navigation">

        <button
          className="primary-btn"
          onClick={handlePrev}
          disabled={index === 0}
        >
          Previous
        </button>

        <button
          className="primary-btn"
          onClick={handleNext}
        >
          {index + 1 === quiz.length ? "Finish" : "Next"}
        </button>

      </div>

    </div>

  );

}

export default QuizPlay;
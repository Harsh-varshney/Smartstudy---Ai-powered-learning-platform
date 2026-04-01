
function QuizResult({ score, total }) {

  if (!total) return null;

  const percentage = Math.round((score / total) * 100);

  let message = "";
  let messageClass = "";

  if (percentage >= 80) {
    message = "Excellent Performance 🚀";
    messageClass = "success-msg";
  } 
  else if (percentage >= 50) {
    message = "Good Effort 👍";
    messageClass = "medium-msg";
  } 
  else {
    message = "Keep Practicing ";
    messageClass = "low-msg";
  }

  return (

    <div className="quiz-page">

      <div className="quiz-container result-card">

        <h2 className="quiz-title"> Quiz Completed</h2>

        <div className="score-box">
          {score} / {total}
        </div>

        <p className="result-text">
          Score: {percentage}%
        </p>

        <p className={messageClass}>
          {message}
        </p>

        <button
          className="primary-btn"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>

      </div>

    </div>

  );

}

export default QuizResult;
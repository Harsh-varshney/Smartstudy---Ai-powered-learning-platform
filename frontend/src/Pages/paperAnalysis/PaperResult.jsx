function PaperResult({ result }) {

  if (!result) return null;

  return (

    <div className="paper-result">

      <h4>📚 Topics Found</h4>

      <pre>{result}</pre>

    </div>

  );
}

export default PaperResult;
import { useState } from "react";
import axios from "axios";

export default function FeedbackForm() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/submit", { text });
    setResult(res.data.entry);
    setText("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your feedback..."
          rows={4}
          style={{ width: "100%" }}
        />
        <button type="submit">Submit</button>
      </form>

      {result && (
        <div>
          <h3>Sentiment: {result.sentiment}</h3>
          <p>{result.text}</p>
        </div>
      )}
    </div>
  );
}

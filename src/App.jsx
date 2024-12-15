import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', pdfFile);
    await axios.post('https://your-api-gateway-url/upload', formData);
    alert('File uploaded successfully!');
  };

  const handleAskQuestion = async () => {
    const response = await axios.post('https://your-api-gateway-url/ask', { question });
    setAnswer(response.data.answer);
  };

  return (
    <div>
      <h1>Document Q&A System</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload PDF</button>

      <h2>Ask a Question</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about the document..."
      />
      <button onClick={handleAskQuestion}>Ask</button>

      {answer && (
        <div>
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;

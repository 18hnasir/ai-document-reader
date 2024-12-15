import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

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
    <div className="app-container">
      <h1 className="title">Document Q&A System</h1>

      <div className="file-upload">
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button onClick={handleFileUpload} className="primary-button">Upload PDF</button>
      </div>

      <div className="question-section">
        <h2>Ask a Question</h2>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about the document..."
          className="question-input"
        />
        <button onClick={handleAskQuestion} className="primary-button">Ask</button>
      </div>

      {answer && (
        <div className="answer-section">
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;

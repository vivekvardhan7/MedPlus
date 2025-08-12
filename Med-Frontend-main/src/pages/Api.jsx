import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function GeminiInReact({ handleChat }) {
  const [inputValue, setInputValue] = useState("");
  const [promptResponses, setPromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contextText, setContextText] = useState("");

  const genAI = new GoogleGenerativeAI(
    "AIzaSyCp4_N1_x7L5wELBnhIhfkHo3WlJCe3F7c"
  );

  const sampleQuestions = [
    "How do medicine reminder apps help patients?",
    // "Explain the different systems under AYUSH?",
    // "How does the AYUSH Portal support startups?,
  ];

  useEffect(() => {
    fetch("/context.txt")
      .then((response) => response.text())
      .then((data) => setContextText(data))
      .catch((error) => console.error("Error fetching context file:", error));
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const listModels = async () => {
    try {
      const models = await genAI.listModels();
      console.log("Available Models:", models);
    } catch (error) {
      console.error("Error listing models:", error);
    }
  };

  useEffect(() => {
    listModels();
  }, []);

  const handleSampleQuestionClick = (question) => {
    setInputValue(question);
    getResponseForGivenPrompt(question);
  };

  const getResponseForGivenPrompt = async (question = inputValue) => {
    if (!contextText) {
      console.error("Context not loaded");
      setPromptResponses((prevResponses) => [
        ...prevResponses,
        "The context for this query is unavailable. Please try again later.",
      ]);
      return;
    }

    try {
      setLoading(true);
      const context = `${contextText}\nQuestion: `;
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
        apiVersion: "v1",
      });
      const result = await model.generateContent(context + question);
      const response = result.response.text();
      setPromptResponses((prevResponses) => [...prevResponses, response]);
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert("Sorry, your browser doesn't support voice input.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Error recognizing speech. Please try again.");
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
    };
  };

  const playAudioResponse = (response) => {
    const utterance = new SpeechSynthesisUtterance(response);
    speechSynthesis.speak(utterance);
  };

  return (
    <ResponsiveChatBot
      handleChat={handleChat}
      sampleQuestions={sampleQuestions}
      promptResponses={promptResponses}
      getResponseForGivenPrompt={getResponseForGivenPrompt}
      playAudioResponse={playAudioResponse}
      handleVoiceInput={handleVoiceInput}
      loading={loading}
      inputValue={inputValue}
      handleInputChange={handleInputChange}
      handleSampleQuestionClick={handleSampleQuestionClick}
    />
  );
}

function ResponsiveChatBot({
  handleChat,
  sampleQuestions,
  promptResponses,
  getResponseForGivenPrompt,
  playAudioResponse,
  handleVoiceInput,
  loading,
  inputValue,
  handleInputChange,
  handleSampleQuestionClick,
}) {
  return (
    <div
      className="chat-box"
      style={{
        border: "2px solid #6c63ff",
        width: "clamp(250px, 80%, 300px)",
        height: "450px",
        backgroundColor: "#f5f7fb",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button
        className="close-button"
        onClick={handleChat}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          fontSize: "18px",
          color: "#ff5c5c",
          cursor: "pointer",
        }}
      >
        ✖
      </button>
      <div
        style={{
          padding: "15px",
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Hi there! 👋
        <p style={{ margin: "5px 0", fontSize: "12px" }}>
          I am your Personal Digital Assistant. You can type your queries in the
          chat box or select one of the options below.
        </p>
      </div>
      <div style={{ marginBottom: "10px", padding: "0 15px" }}>
        <strong>Sample Questions:</strong>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {sampleQuestions.map((question, index) => (
            <li
              key={index}
              onClick={() => handleSampleQuestionClick(question)}
              style={{
                backgroundColor: "#e9f0ff",
                padding: "8px 10px",
                borderRadius: "8px",
                marginBottom: "8px",
                cursor: "pointer",
                color: "#6c63ff",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                fontSize: "12px",
              }}
            >
              {question}
            </li>
          ))}
        </ul>
      </div>
      <div
        className="response-container"
        style={{
          flex: 1,
          overflowY: "auto",
          marginTop: "8px",
          padding: "8px 15px",
        }}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          promptResponses.map((response, index) => (
            <div
              key={index}
              style={{
                padding: "8px",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                marginBottom: "8px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                position: "relative",
              }}
            >
              <p style={{ fontSize: "12px", color: "#333" }}>{response}</p>
              <button
                onClick={() => playAudioResponse(response)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "none",
                  border: "none",
                  fontSize: "14px",
                  cursor: "pointer",
                  color: "#6c63ff",
                }}
              >
                🔊
              </button>
            </div>
          ))
        )}
      </div>
      <div
        style={{ display: "flex", alignItems: "center", padding: "8px 15px" }}
      >
        <button
          onClick={handleVoiceInput}
          style={{
            marginLeft: "8px",
            borderRadius: "50%",
            padding: "8px",
            backgroundColor: "#6c63ff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          🎤
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your question..."
          style={{
            flex: 1,
            borderRadius: "15px",
            padding: "8px",
            border: "1px solid #ddd",
            fontSize: "12px",
          }}
        />
        <button
          onClick={() => getResponseForGivenPrompt()}
          style={{
            marginLeft: "8px",
            borderRadius: "15px",
            padding: "8px 15px",
            backgroundColor: "#6c63ff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default GeminiInReact;

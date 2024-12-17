import React, { useState } from "react";
import "./VoiceToText.css"; // Importing the CSS for styling

const VoiceToText = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return <p>មិនមានការគាំទ្រពីអ្នកស្តាប់សំឡេងនៅក្នុងកម្មវិធីរបស់អ្នកទេ។</p>;
  }

  const [recognition, setRecognition] = useState(null); // Store recognition instance

  // Initialize recognition
  const initializeRecognition = () => {
    const newRecognition = new SpeechRecognition();
    newRecognition.continuous = true;
    newRecognition.interimResults = true;
    newRecognition.lang = "km-KH"; // Khmer language

    // On result, update text
    newRecognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setText(transcript);
    };

    // Handle errors
    newRecognition.onerror = (event) => {
      console.error("កំហុស:", event.error);
      alert(`កំហុសនៅក្នុងការស្តាប់សំឡេង: ${event.error}`);
    };

    return newRecognition;
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop(); // Stop the recognition
      setIsListening(false);
    } else {
      if (!recognition) {
        const newRecognition = initializeRecognition();
        setRecognition(newRecognition);
        newRecognition.start(); // Start the recognition
      } else {
        recognition.start(); // Continue from existing recognition instance
      }
      setIsListening(true);
    }
  };

  return (
    <div className="voice-to-text">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="អត្ថបទរបស់អ្នកនឹងបង្ហាញនៅទីនេះ..."
        rows="8"
        cols="50"
        className="text-area"
      />
      <div className="controls">
        <button
          onClick={toggleListening}
          className={`btn ${isListening ? "btn-stop" : "btn-start"}`}
        >
          {isListening ? "🛑 បញ្ឈប់ការស្តាប់" : "🎤 ចាប់ផ្តើមស្តាប់"}
        </button>
      </div>
    </div>
  );
};

export default VoiceToText;

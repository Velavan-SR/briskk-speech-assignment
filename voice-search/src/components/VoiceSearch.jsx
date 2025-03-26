import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Mic, MicOff, Search, Upload } from 'lucide-react';
import { getAutocompleteSuggestions } from '../utils/mockData';

export default function VoiceSearch() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const recognition = useCallback(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      return recognition;
    }
    return null;
  }, []);

  const handleListen = useCallback(() => {
    const speechRecognition = recognition();
    
    if (!speechRecognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      speechRecognition.start();
      speechRecognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');
        
        setTranscript(transcript);
        setSuggestions(getAutocompleteSuggestions(transcript));
      };
    } else {
      speechRecognition.stop();
    }

    speechRecognition.onerror = (event) => {
      setError(`Error occurred in recognition: ${event.error}`);
    };
  }, [isListening, recognition]);

  useEffect(() => {
    handleListen();
    return () => {
      const speechRecognition = recognition();
      if (speechRecognition) {
        speechRecognition.stop();
      }
    };
  }, [handleListen, recognition]);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const handleManualInput = (e) => {
    const value = e.target.value;
    setTranscript(value);
    setSuggestions(getAutocompleteSuggestions(value));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      setError('Please upload an audio file (WAV, MP3, etc.)');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const simulatedText = "find me a red dress";
      setTranscript(simulatedText);
      setSuggestions(getAutocompleteSuggestions(simulatedText));
    } catch (err) {
      setError('Failed to process audio file. Please try again.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="voice-search-container">
      <div className="voice-search-box">
        <h1 className="voice-search-title">Voice Search Assistant</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="input-group">
          <input
            type="text"
            value={transcript}
            onChange={handleManualInput}
            placeholder="Speak or type your search..."
            className="search-input"
          />
          <button
            onClick={toggleListening}
            disabled={isProcessing}
            className={`button mic ${isListening ? 'active' : ''}`}
          >
            {isListening ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          <label className={`button upload ${isProcessing ? 'disabled' : ''}`}>
            <Upload size={24} />
            <input
              type="file"
              ref={fileInputRef}
              accept="audio/*"
              onChange={handleFileUpload}
              disabled={isProcessing}
              className="file-input"
            />
          </label>
        </div>

        {suggestions.length > 0 && (
          <div className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => setTranscript(suggestion)}
              >
                <Search size={16} />
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        )}

        {isProcessing && <div className="processing-text">Processing audio file...</div>}

        <div className="features-section">
          <h2 className="features-title">Features:</h2>
          <ul className="features-list">
            <li>Real-time voice recognition using Web Speech API</li>
            <li>Audio file upload support (WAV, MP3, etc.)</li>
            <li>Smart search suggestions based on partial input</li>
            <li>Support for both voice and text input</li>
            <li>Background noise handling through browser's built-in processing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
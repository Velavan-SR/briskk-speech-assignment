Brisk Speech-to-Text Assessment

Overview

Brisk Speech-to-Text is a React-based web application that allows users to perform voice searches using the Web Speech API. Users can also upload audio files, which are processed to extract text-based search queries. The application provides real-time speech recognition, autocomplete suggestions, and a user-friendly interface for seamless interaction.

Features

🎙 Real-time voice recognition using the Web Speech API

📂 Audio file upload (supports WAV, MP3, etc.) for text extraction

🔍 Smart search suggestions based on partial input

⌨ Supports both voice and text input

🎨 Clean UI with proper spacing and design improvements

🔊 Background noise handling through browser's built-in processing

Tech Stack

Frontend: React, JavaScript, CSS

Icons: Lucide-react

Installation & Setup

Prerequisites

Node.js (Ensure you have it installed)

npm (Comes with Node.js)

Steps

Clone the repository

git clone <repo-url>
cd brisk-speech-to-text-assessment

Install dependencies

npm install

Run the project

npm run dev

Open your browser and go to http://localhost:5173/ (or the port shown in the terminal).

Usage

Start voice recognition by clicking the microphone button.

Speak your search query and watch the real-time transcription.

Upload an audio file to process text from it.

Manually enter text in the search box and get autocomplete suggestions.

Click on a suggestion to autofill the search box.

File Structure

📂 brisk-speech-to-text-assessment
├── 📁 src
│   ├── 📄 index.css (Global styling)
│   ├── 📄 main.jsx (Entry point)
│   ├── 📁 components
│   │   ├── 📄 VoiceSearch.jsx (Main component)
│   ├── 📁 utils
│   │   ├── 📄 mockData.js (Dummy data for autocomplete suggestions)
├── 📄 package.json (Dependencies & scripts)
├── 📄 README.md (You're here!)

Git Commands Used

Create a new branch:

git checkout -b <branch-name>

Push the new branch to remote:

git push -u origin <branch-name>

Troubleshooting

Speech recognition not working?

Make sure you're using Google Chrome (Web Speech API is not supported in some browsers).

Check if microphone access is enabled.

Audio upload failing?

Ensure you upload a valid audio file (MP3, WAV, etc.).

Check console logs for errors.

Future Enhancements

🌐 Multi-language support for speech recognition

📊 Improved AI-based autocomplete suggestions

🖥 Backend support for better audio processing
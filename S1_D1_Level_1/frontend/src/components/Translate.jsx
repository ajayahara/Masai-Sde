// src/components/TranslationApp.js

import { useState } from 'react';

const languageOptions = [
  'English',
  'French',
  'Hindi',
  'Spanish',
  'German',
  'Italian',
  'Japanese',
  'Chinese',
  'Russian',
];

function TranslationApp() {
  const [translateFrom, setTranslateFrom] = useState('English');
  const [translateTo, setTranslateTo] = useState('French');
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
        const res = await fetch(`http://localhost:3000/translate`,{
            method:'POST',
            body:JSON.stringify({translateFrom,translateTo,textToTranslate}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data = await res.json();
        if(data.translatedText){
            setTranslatedText(data.translatedText);
        }else{
            alert(data?.error)
        }
      } catch (error) {
        alert(error)
      }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-400">
      <h1 className="text-2xl font-bold mb-4 text-center">Language Translation App</h1>

      <div className="mb-4">
        <label htmlFor="translateFrom" className="block mb-2">
          Translate From:
        </label>
        <select
          id="translateFrom"
          className="w-full p-2 border bg-white"
          value={translateFrom}
          onChange={(e) => setTranslateFrom(e.target.value)}
        >
          {languageOptions.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="translateTo" className="block mb-2">
          Translate To:
        </label>
        <select
          id="translateTo"
          className="w-full p-2 border bg-white"
          value={translateTo}
          onChange={(e) => setTranslateTo(e.target.value)}
        >
          {languageOptions.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="textToTranslate" className="block mb-2">
          Text to Translate:
        </label>
        <textarea
          id="textToTranslate"
          className="w-full p-2 border bg-white"
          rows="4"
          value={textToTranslate}
          onChange={(e) => setTextToTranslate(e.target.value)}
        ></textarea>
      </div>

      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleTranslate}>
        Translate
      </button>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Translated Text:</h2>
        <p>{translatedText}</p>
      </div>
    </div>
  );
}

export default TranslationApp;

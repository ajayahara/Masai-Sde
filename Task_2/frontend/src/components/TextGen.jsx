// src/components/TextGenerator.js

import { useState } from 'react';

const TextGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const generateText = async () => {
    try {
        const res = await fetch(`http://localhost:3000/textgen`,{
            method:'POST',
            body:JSON.stringify({text:prompt}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data = await res.json();
        if(data.genText){
            setGeneratedText(data.genText);
        }else{
            alert(data?.error)
        }
    } catch (error) {
      console.error('Error generating text:', error);
    }
  };

  return (
    <div className=" mx-auto p-4 mb-6 bg-gray-400">
      <h1 className="text-2xl font-bold mb-4 text-center">Text Generator</h1>

      <div className="mb-4">
        <label htmlFor="prompt" className="block mb-2">
          Enter a prompt:
        </label>
        <textarea
          id="prompt"
          className="w-full p-2 border bg-white"
          rows="4"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
      </div>

      <button className="bg-blue-500 text-white p-2 rounded" onClick={generateText}>
        Generate Text
      </button>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Generated Text:</h2>
        <p>{generatedText}</p>
      </div>
    </div>
  );
};

export default TextGenerator;

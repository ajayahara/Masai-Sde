import { useState } from 'react';

const SentimentAnalysis = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');

  const analyzeSentiment = async () => {
    try {
      const res = await fetch(`http://localhost:3000/sentimate`,{
          method:'POST',
          body:JSON.stringify({text:text}),
          headers:{
              'Content-Type':'application/json'
          }
      });
      const data = await res.json();
      if(data.sentimate){
          setSentiment(data.sentimate);
      }else{
          alert(data?.error)
      }
  } catch (error) {
    console.error('Error generating text:', error);
  }
};

  return (
    <div className="w-full mx-auto p-4 bg-gray-400 ">
      <h1 className="text-2xl font-bold mb-4 text-center">Sentiment Analysis</h1>
      <textarea
        className="w-full p-2 border rounded-md mb-4"
        placeholder="Enter text for sentiment analysis..."
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={analyzeSentiment}
      >
        Analyze Sentiment
      </button>
        <div className="mt-4">
          <strong>Sentiment:</strong> {sentiment}
        </div>
    </div>
  );
};

export default SentimentAnalysis;

// src/components/ArticleSummarizer.js

import{ useState } from 'react';
const ArticleSummarizer = () => {
  const [article, setArticle] = useState('');
  const [summary, setSummary] = useState('');

  const summarizeArticle = async () => {
    try {
        const res = await fetch(`http://localhost:3000/summerize`,{
            method:'POST',
            body:JSON.stringify({article}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data = await res.json();
        if(data.summary){
            setSummary(data.summary);
        }else{
            alert(data?.error)
        }
    } catch (error) {
      console.error('Error summarizing article:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-400 mb-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Article Summarizer</h1>

      <div className="mb-4">
        <label htmlFor="article" className="block mb-2">
          Article Text:
        </label>
        <textarea
          id="article"
          className="w-full p-2 border bg-white"
          rows="8"
          value={article}
          onChange={(e) => setArticle(e.target.value)}
        ></textarea>
      </div>

      <button className="bg-blue-500 text-white p-2 rounded" onClick={summarizeArticle}>
        Summarize
      </button>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Summary:</h2>
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default ArticleSummarizer;

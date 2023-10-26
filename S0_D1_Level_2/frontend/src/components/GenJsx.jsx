import { useState } from 'react';

function ShayariGenerator() {
  const [keyword, setKeyword] = useState('');
  const [shayari, setShayari] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('sayari');
  const shareOnFacebook = () => {
    const shareLink = `https://www.example.com/share?content=${encodeURIComponent(shayari)}`;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shareLink}`,
      'facebook-share-dialog',
      'width=626,height=436'
    );
  };

  const generateContent = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://openai-int.onrender.com/generate/sayari?keyword=${keyword}&type=${selectedOption}`);
      const data = await res.json();
      setShayari(data?.shayari);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-500 to-green-500">
      <div className="bg-white p-6 rounded-lg shadow-md w-2/3 text-center mt-5">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Content Generator</h1>
        <div className="md:w-1/3 m-auto mb-3">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 text-lg"
          >
            <option value="story">Story</option>
            <option value="quote">Quote</option>
            <option value="sayari">Shayari</option>
            <option value="joke">Joke</option>
          </select>
        </div>

        <input
          type="text"
          id="keyword"
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 text-lg"
          placeholder="Enter a keyword (e.g., Love)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium mt-3 py-2 px-4 rounded-lg focus:outline-none"
          onClick={generateContent}
          disabled={loading}
        >
          {loading ? 'Loading>>>' : 'Generate Content'}
        </button>

        {shayari && (
          <div className="mt-6 text-gray-700 text-lg font-medium">
            <p className="italic">{shayari}</p>
          </div>
        )}
       {
        shayari? <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg focus-outline-none"
        onClick={shareOnFacebook}
      >
        Share on Facebook
      </button>:''
       }
      </div>
    </div>
  );
}

export default ShayariGenerator;

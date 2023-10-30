import { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (text.trim() === '') return;
    const message = text;
    setLoading(true);
    setMessages(prev => [...prev, { text: text, isUser: true }]);
    setText('');
    try {
      const response=await fetch('http://localhost:3000/weather',{
        method:'POST',
        body:JSON.stringify({message}),
        headers:{
          'Content-Type':'application/json'
        }
      });
      const data=await response.json();
      setMessages(prev => [...prev, { text: data?.message, isUser: false }]);
    } catch (err) {
      console.log(err)
    }
    setLoading(false);
  };
  console.log(messages)
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-blue-700">
      <div className="w-full md:w-4/12 p-4 bg-white text-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">ChatbOt</h2>
        <div className="bg-gray-200 h-80 p-4 rounded-t-lg overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`my-2 ${message.isUser ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`px-3 py-2 rounded-lg inline-block ${message.isUser ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'
                  }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-2">
          <input
            type="text"
            value={text}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="w-full p-2 rounded-l-md border outline-none"
          />
          <button
            onClick={handleSendMessage}
            className={`${loading ? 'bg-gray-200' : 'bg-blue-700'} text-white p-2 rounded-r-md`}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useContext, useState } from "react";
import { context } from "../context-api/Context";
const initialData = {
  email: '',
  pass: '',
}
function LoginCard() {
  const { updateSignUp, updateLogin, updateUser } = useContext(context);
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, pass } = formData;
    const res = await fetch('https://openai-int.onrender.com/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: pass }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    if (data?.message) {
      alert(data.message);
      const name = email.split('@')[0];
      updateUser({ name })
    } else {
      alert(data?.error)
    }
    setFormData({ ...initialData })
    setLoading(false);
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-green-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h1 className="text-3xl font-bold text-blue-500 mb-4">Login</h1>
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="youremail@example.com"
              onChange={(e) => setFormData({
                ...formData, email: e.target.value
              })}
              value={formData.email}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Your password"
              onChange={(e) => setFormData({
                ...formData, pass: e.target.value
              })}
              value={formData.pass}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading>>>' : 'Log In'}
          </button>
        </form>
        <p className="text-gray-700 text-sm">
          Don &apos t have an account? <button className="text-blue-500" onClick={() => {
            updateLogin(false);
            updateSignUp(true)
          }} >Sign Up</button>
        </p>
      </div>
    </div>
  );
}

export default LoginCard;

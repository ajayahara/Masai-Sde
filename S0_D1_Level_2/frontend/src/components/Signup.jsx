import { useContext, useState } from "react";
import { context } from "../context-api/Context";

const initialData = {
  email: '',
  pass: '',
  cpass: ''
}
function SignupCard() {
  const { updateSignUp, updateLogin } = useContext(context);
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, pass, cpass } = formData;
    if (pass !== cpass) {
      alert("Password and confirm password didn't match");
    } else {
      const res = await fetch('https://openai-int.onrender.com/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password: pass }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (data?.message) {
        alert(data.message)
      } else {
        alert(data?.error)
      }
  }
  setFormData({ ...initialData })
  setLoading(false);
}
return (
  <div className="min-h-screen bg-gradient-to-b from-green-500 to-yellow-500 flex items-center justify-center">
    <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
      <h1 className="text-3xl font-bold text-green-500 mb-4">Sign Up</h1>
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            placeholder="youremail@example.com"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            placeholder="Your password"
            onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
            value={formData.pass}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            placeholder="Confirm your password"
            onChange={(e) => setFormData({ ...formData, cpass: e.target.value })}
            value={formData.cpass}
          />
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading>>>' : 'Sign Up'}
        </button>
      </form>
      <p className="text-gray-700 text-sm">
        Already have an account? <button className="text-green-500" onClick={() => {
          updateSignUp(false);
          updateLogin(true);
        }}>Log In</button>
      </p>
    </div>
  </div>
);
}

export default SignupCard;

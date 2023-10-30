import { useContext } from 'react'
import './App.css'
import ShayariGenerator from './components/GenJsx'
import LoginCard from './components/Login'
import Navbar from './components/Navbar'
import SignupCard from './components/Signup'
import { context } from './context-api/Context'
function App() {
  const {user,isLogin,isSignUp}=useContext(context);
  return (
    <>
    <Navbar/>
    <div className='h-[50px]'></div>
    {user?<ShayariGenerator/>:null}
    {isLogin&&!user?<LoginCard/>:null}
    {isSignUp&&!user?<SignupCard/>:null}
    </>
  )
}

export default App

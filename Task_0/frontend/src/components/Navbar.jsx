import { useContext } from "react";
import { context } from "../context-api/Context";

const Navbar = () => {
  const { user, updateLogin, updateSignUp, logOutUser } = useContext(context)
  return (
    <>
      <nav className="bg-blue-500 p-4 flex items-center justify-between fixed z-[100] w-full border border-solid border-gray-400">
        <div className="flex items-center">
          <span className="text-white text-2xl font-bold">GeneAI</span>
        </div>
        <div>
          {!user ? <button className="bg-green-500 text-white px-4 py-2 rounded-lg mr-4" onClick={() => {
            updateLogin(false);
            updateSignUp(true);
          }}>Signup</button> : <button className="bg-green-500 text-white px-4 py-2 rounded-lg mr-4">{user?.name}</button>}
          {!user ? <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg" onClick={() =>{
            updateSignUp(false)
            updateLogin(true);
          }}>Login</button> : <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg" onClick={() => logOutUser()}>LogOut</button>}
        </div>
      </nav>
    </>
  );
};
export default Navbar;

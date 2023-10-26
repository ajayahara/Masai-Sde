import { createContext, useState } from "react";

export const context=createContext();
export const ContextProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [isSignUp,setSignUp]=useState(true);
    const [isLogin,setIsLogin]=useState(false);
    const updateSignUp=(bool)=>{
        setSignUp(bool);
    }
    const updateLogin=(bool)=>{
        setIsLogin(bool);
    }
    const updateUser=(data)=>{
        setUser(data);
    }
    const logOutUser=()=>{
        setUser(null)
    }
    return <context.Provider value={{user,updateLogin,updateSignUp,updateUser,logOutUser,isLogin,isSignUp}}>
        {children}
    </context.Provider>
}

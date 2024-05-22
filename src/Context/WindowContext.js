import { createContext, useEffect, useState } from "react";

export const WindowSize = createContext(null);

export default function WindowContext({ children }) {
  const [windowSize, setWidowSize] = useState(window.innerWidth);

  useEffect(()=>{
    function setWindowWidth(){
        setWidowSize(window.innerWidth);
    }
    window.addEventListener("resize",setWindowWidth);

    // CleanUp Function
    return () => {
    window.removeEventListener("resize",setWindowWidth);
    };
  },[])

  return (
    <WindowSize.Provider value={{ windowSize, setWidowSize }}>
      {children}
    </WindowSize.Provider>
  );
}

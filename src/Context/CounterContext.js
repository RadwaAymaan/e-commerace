import { createContext, useState } from "react";

export let CounterContext = createContext();

export function CounterContextProvider(props){
    const [userName, setuserName] = useState('');
    const [Counter, setCounter] = useState(0)
    function increaseCounter(){
        setCounter(Counter+1);
    }
    function decreaseCounter(){
        setCounter(Counter-1);
    }
 return  <CounterContext.Provider value={{userName,Counter,increaseCounter,decreaseCounter}}>
    {props.children}
  </CounterContext.Provider>
}
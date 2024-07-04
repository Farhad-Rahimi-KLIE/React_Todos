import React,{useState} from 'react'
import Todos from './Components/Todos';

function App() {
  const [mode,setMode] = useState("#060822");
  const toggleMode = ()=>{
    if (mode === "#060822") {
      setMode("white");
    }else{
      setMode("#060822");
    }
  }
  return (
    <>
    <Todos toggleMode={toggleMode} mode={mode}/>
    </>
  );
}

export default App;

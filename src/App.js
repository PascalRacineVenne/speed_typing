import React, { useState, useEffect } from 'react'

const App = () => {
  // const [wordCount, setWordCount] = useState(0)
  const [text, setText] = useState("")
  const [countdown, setCountdown] = useState(5)
  const [running, setRunning] = useState(false)
  const [count, setCount] =useState(0)
   

  function handleChange(e) {
    const {value} = e.target
    setText(value)
  }

  function calculateWords(text) {
    const wordArray = text.trim().split(" ")
    return wordArray.filter(word => word !== "").length
  }

  useEffect(() => {
    let time = ""
    if (running && countdown > 0) {
      setCount(0)
      time = setTimeout(() => {
      setCountdown(time => time - 1)
    }, 1000);
    } else if (countdown === 0) {
      setRunning(false)
      setCount(calculateWords(text));
      setCountdown(5);
      setText("")
    }
    return () => clearTimeout(time)
  }, [countdown, running])

  console.log(running);

  return(
    <div>
      <h1>Speed Typing Game</h1>
      <textarea
        value={text} 
        onChange={handleChange}  
      />
      <h4>time remaining: {countdown} sec</h4>
      <button onClick={() => setRunning(true)}>START</button>
      <h1>Word count: {count}</h1>
    </div>
  )
}

export default App;

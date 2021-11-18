import React, { useState, useEffect, useRef } from 'react'

const App = () => {
  const STARTING_TIME = 15

  const [text, setText] = useState("")
  const [countdown, setCountdown] = useState(STARTING_TIME)
  const [running, setRunning] = useState(false)
  const [count, setCount] = useState(0)
  const textBoxRef = useRef(null)

  function handleChange(e) {
    const {value} = e.target
    setText(value)
  }

  function calculateWords(text) {
    const wordArray = text.trim().split(" ")
    return wordArray.filter(word => word !== "").length
  }

  function startGame() {
    setRunning(true)
    setText("")
    setCountdown(STARTING_TIME)
    textBoxRef.current.disabled = false
    textBoxRef.current.focus()
  }

  function endGame(){
    setRunning(false)
    setCount(calculateWords(text))
  }

  useEffect(() => {
    if (running && countdown > 0) {
      setTimeout(() => {
      setCountdown(time => time - 1)
    }, 1000);
    } else if (countdown === 0) {
      endGame()
    }
  }, [countdown, running])

  return(
    <div>
      <h1>Speed Typing Game</h1>
      <textarea
        ref={textBoxRef}
        value={text} 
        onChange={handleChange} 
        disabled={!running}
      />
      <h4>time remaining: {countdown} sec</h4>
      <button onClick={startGame} disabled={running}>START</button>
      <h1>Word count: {count}</h1>
    </div>
  )
}

export default App;

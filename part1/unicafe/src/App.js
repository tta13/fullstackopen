import { useState } from 'react'

const Button = ({ text, action }) => (
  <button onClick={action}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text='good' action={() => setGood(good + 1)}/>
        <Button text='neutral' action={() => setNeutral(neutral + 1)}/>
        <Button text='bad' action={() => setBad(bad + 1)}/>
      </div>
      <h1>statistics</h1>
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
      </div>
    </div>
  )
}

export default App

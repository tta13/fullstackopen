import { useState } from 'react'

const Button = ({ text, action }) => (
  <button onClick={action}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const avg = (good*1 + neutral*0 + bad*-1) / all
  const positive = 100 * (good / all)

  if (all === 0) 
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  return (
    <div>
      <h1>statistics</h1>
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {avg}</p>
        <p>positive {positive}%</p>
      </div>
    </div>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad}/>      
    </div>
  )
}

export default App

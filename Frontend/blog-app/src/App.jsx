import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main>
        <header>
          <a href="" className='logo'>My Blog</a>
          <nav>
            <a href="">Login</a>
            <a href="">Register</a>
          </nav>
        </header>
        <div className='posts'>
          <div className="post">
            
            <a href=''>India approves $15B in semiconductor plant investments</a>
            <p>India has approved allocating up to $15.2 billion (1.26 trillion Indian rupees) to build three new semiconductor plants, including its first semiconductor fab facility — part of the country’s big bid to take on China, Taiwan and other countries in the chip race. </p>
            <img src="https://techcrunch.com/wp-content/uploads/2024/02/india-semiconductor-manufacturing-getty.jpg?w=430&h=230&crop=1" alt="" />
          </div>
          <div className="post">
            
            <a href=''>India approves $15B in semiconductor plant investments</a>
            <p>India has approved allocating up to $15.2 billion (1.26 trillion Indian rupees) to build three new semiconductor plants, including its first semiconductor fab facility — part of the country’s big bid to take on China, Taiwan and other countries in the chip race. </p>
            <img src="https://techcrunch.com/wp-content/uploads/2024/02/india-semiconductor-manufacturing-getty.jpg?w=430&h=230&crop=1" alt="" />
          </div>
          <div className="post">
            
            <a href=''>India approves $15B in semiconductor plant investments</a>
            <p>India has approved allocating up to $15.2 billion (1.26 trillion Indian rupees) to build three new semiconductor plants, including its first semiconductor fab facility — part of the country’s big bid to take on China, Taiwan and other countries in the chip race. </p>
            <img src="https://techcrunch.com/wp-content/uploads/2024/02/india-semiconductor-manufacturing-getty.jpg?w=430&h=230&crop=1" alt="" />
          </div>
        </div>
      </main>
    </>
  )
}

export default App

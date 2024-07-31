import React from 'react'
import Weather from './components/Weather'

const App = () => {
  return (
    <div className='min-h-[100vh]  bg-[#737CA1]'>
      <div className='grid grid-cols-1 min-h-[100vh] gap-4 place-items-center h-56 '>
      <Weather />
      </div>
    </div>
  )
}

export default App

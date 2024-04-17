import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import Home from './Pages/Home';
import Game from './Pages/Game';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Game' element={<Game/>}/>
      </Routes>
    </Router>
  )
}

export default App
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import Monitoring from "./views/Monitoring";
import Graphic from "./views/Graphic";

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={ <Monitoring /> } />
        <Route path="/graphic" element= { <Graphic /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App

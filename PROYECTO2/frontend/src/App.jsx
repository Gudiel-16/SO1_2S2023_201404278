import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import StaticPage from "./pages/StaticPage";
import DinamicPage from "./pages/DinamicPage";

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={ <StaticPage /> } />
        <Route path="/dinamic" element= { <DinamicPage /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App

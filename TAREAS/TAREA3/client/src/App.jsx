import { Route, Routes } from "react-router-dom"
import BibliotecaPage from "./pages/BibliotecaPage"
import NotFoundPage from "./pages/NotFoundPage"
import NavBarComponent from "./components/NavBarComponent"
import BIbliotecaFormPage from "./pages/BibliotecaFormPage"

function App() {

  return (
    <div className="bg-zinc-900 h-screen">

      <NavBarComponent />
      <div className="container mx-auto py-4">
        <Routes>
          <Route path="/" element={<BibliotecaPage/>} />
          <Route path="/new" element={<BIbliotecaFormPage/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App

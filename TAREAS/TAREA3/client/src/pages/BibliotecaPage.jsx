import { useEffect, useState } from "react"
import { getRequest } from '../api/biblioteca.api'
import BiblioCardComponent from "../components/BiblioCardComponent"

function BibliotecaPage() {

    const [biblios, setBiblios] = useState([]);

    useEffect(() => {
        async function loadBiblioteca() {
            const response = await getRequest()
            setBiblios(response.data)
        }
        loadBiblioteca()
    }, [])

    function renderMain() {
        if (biblios.length === 0) return <h1>No hay datos</h1>
        return biblios.map(biblio => <BiblioCardComponent biblio={biblio} key={biblio.ID} />);
    }

    return (
        <div>
            <h1 className="text-5xl text-white font-bold text-center mb-2">Datos Biblioteca</h1>
            <div className="grid grid-cols-3 gap-2">
                { renderMain() }
            </div>
        </div>
    )
}

export default BibliotecaPage

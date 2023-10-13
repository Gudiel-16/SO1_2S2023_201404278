import { useState, useEffect } from 'react';
import socket from './socket/Socket';

function App() {
  const [album, setAlbum] = useState([]);

  useEffect(() => {
    socket.on("dataredis", (data) => {
        //console.log(data);
        setAlbum(data);
    });
  }, []);

  return (
    <div className='container-fluid'>

    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <a className='navbar-brand'>SO1-GUDIEL</a>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target="#nav" aria-controls='navbarSupportedContent'>
          <span className='navbar-toggler-icon'></span>
        </button>
      </div>
      <div className='collapse navbar-collapse' id='nav'>
        <ul className='navbar-nav mx-auto mb-2'>
          <li className='nav-item px-lg-5 h4'>
            <a className='navbar-brand'>TAREA 6</a>
          </li>
        </ul>
      </div>
    </nav>

      <div className='row mt-5'>
        <div className='col-6 offset-3'>
          <table className="table">
            <thead>
                <tr>
                    <th scope="col">ALBUM</th>
                    <th scope="col">ARTIST</th>
                    <th scope="col">YEAR</th>
                </tr>
            </thead>
            <tbody>
                { 
                  album.map( (myalbum, j) => (
                      <tr key={"prosc"+j}>
                          <th scope="row">{myalbum.Album}</th>
                          <td>{myalbum.Artist}</td>
                          <td>{myalbum.Year}</td>
                      </tr>
                    ))                                         
                }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App

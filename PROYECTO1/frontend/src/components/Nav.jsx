import { Link } from 'react-router-dom';

const Nav = () => {
  
  return (
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
            <Link to='/' className='nav-link'>MONITOREO</Link>
          </li>
          <li className='nav-item px-lg-5 h4'>
          <Link to='/graphic' className='nav-link'>GRAFICAS</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
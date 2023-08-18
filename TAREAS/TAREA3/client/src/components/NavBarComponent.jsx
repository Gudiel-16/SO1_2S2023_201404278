import { Link } from 'react-router-dom'

function NavBarComponent() {
  return (
    <div className='bg-zinc-700 flex justify-between px-20 py-4'>

        <Link to="/" className='text-white font-bold'>
          <h1>Biblioteca Musical</h1>
        </Link>

        <ul className='flex gap-x-1'>
            <li>
                <Link to="/" className='bg-slate-200 px-2 py-1'>Home</Link>
            </li>
            <li>
                <Link to="/new" className='bg-slate-200 px-2 py-1'>Create</Link>
            </li>
        </ul>
    </div>
  )
}

export default NavBarComponent
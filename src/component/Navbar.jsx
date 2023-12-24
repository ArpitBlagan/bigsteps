import React from 'react'
import { Link } from 'react-router-dom'
import pokemon from '../pokemon.svg'
const Navbar = () => {
  return (
    <div className='flex justify-center sticky top-0 z-40 font-heading'>
        <div className='flex justify-start font-thin pl-2 bg-violet-400 w-full 0 md:w-[60%] text-[40px] rounded-md'>
          <img src={pokemon} width="40px" height="40px" />
          <Link to="/">Pokemons</Link>
        </div>
    </div>
  )
}

export default Navbar
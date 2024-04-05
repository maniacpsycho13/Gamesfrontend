import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
      {/* Club Name centered */}
      <div className="flex-grow text-center text-xl font-semibold">
        ISDF CLUB
      </div>

      {/* Home Link with improved styling */}
      <div>
        <Link to="/" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Home
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
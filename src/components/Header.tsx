import React from 'react'
import { Link } from 'react-router-dom'
import { HomeIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'

const Header: React.FC = () => {
  const { isAuthenticated, client, logout, isLoading } = useAuth();

  console.log('Header render - isAuthenticated:', isAuthenticated, 'client:', client, 'isLoading:', isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={isAuthenticated ? `/dashboard/${client?.tenantId}` : "/"} className="flex items-center">
          <HomeIcon className="h-6 w-6 mr-2" />
          <span className="text-xl font-bold">Almanac Labs</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {isAuthenticated && client ? (
              <>
                <li><span className="text-blue-200">Welcome, {client.companyName}</span></li>
                <li>
                  <button onClick={logout} className="hover:text-blue-200 flex items-center">
                    <UserCircleIcon className="h-5 w-5 mr-1" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
                <li><Link to="/about" className="hover:text-blue-200">About</Link></li>
                <li><Link to="/pricing" className="hover:text-blue-200">Pricing</Link></li>
                <li><Link to="/register" className="hover:text-blue-200">Register</Link></li>
                <li><Link to="/login" className="hover:text-blue-200">Login</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
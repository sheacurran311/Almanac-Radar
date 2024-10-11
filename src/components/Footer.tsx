import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p>&copy; 2024 Almanac Labs. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">Terms of Service</a>
            <a href="#" className="hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
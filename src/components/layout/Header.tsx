'use client'

import { Bell, Search, PlusCircle } from 'lucide-react'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6" automation-id="header">
      <div className="flex items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search flags..."
            automation-id="header-search-input"
            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          className="flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          automation-id="create-flag-button"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Create Flag
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100" automation-id="notifications-button">
          <Bell className="h-6 w-6 text-gray-500" />
        </button>
        <div automation-id="user-avatar">
          <Image
            src="https://ui-avatars.com/api/?name=Jane+Doe&background=random"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>
    </header>
  )
}

export default Header

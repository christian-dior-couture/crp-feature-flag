'use client'

import { Flag, Settings, Book, LifeBuoy, LogOut } from 'lucide-react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Sidebar = () => {
  const router = useRouter()
  const pathname = router.pathname

  const navItems = [
    { href: '/dashboard', icon: Flag, label: 'Feature Flags' },
    { href: '/settings', icon: Settings, label: 'Settings' },
    { href: '/docs', icon: Book, label: 'Documentation' },
  ]

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col" automation-id="sidebar">
      <div className="p-6">
        <h1 className="text-2xl font-bold">FlagManager</h1>
      </div>
      <nav className="flex-1 px-4 py-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            passHref
          >
            <a
              automation-id={`sidebar-nav-${item.label.toLowerCase().replace(' ', '-')}`}
              className={`flex items-center px-4 py-2 my-1 rounded-md text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <Link href="/support" passHref>
          <a
            automation-id="sidebar-nav-support"
            className="flex items-center px-4 py-2 my-1 rounded-md text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <LifeBuoy className="w-5 h-5 mr-3" />
            Support
          </a>
        </Link>
        <button
          automation-id="sidebar-logout-button"
          className="w-full flex items-center px-4 py-2 my-1 rounded-md text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar

import {
  FileText,
  Flag,
  Home,
  LifeBuoy,
  Settings,
  Users,
} from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="border-r border-zinc-200 bg-white w-64 flex flex-col">
      <div className="p-6 flex items-center gap-2 border-b border-zinc-200">
        <div className="p-2 bg-violet-600 rounded-lg">
          <Flag className="text-white" />
        </div>
        <h1 className="text-xl font-bold text-zinc-800">FlagShip</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 text-zinc-600 hover:bg-violet-50 hover:text-violet-600 rounded-md transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 bg-violet-50 text-violet-700 font-semibold rounded-md"
        >
          <Flag className="h-5 w-5" />
          <span>Feature Flags</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 text-zinc-600 hover:bg-violet-50 hover:text-violet-600 rounded-md transition-colors"
        >
          <Users className="h-5 w-5" />
          <span>Segments</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 text-zinc-600 hover:bg-violet-50 hover:text-violet-600 rounded-md transition-colors"
        >
          <FileText className="h-5 w-5" />
          <span>Audit Log</span>
        </a>
      </nav>
      <div className="p-4 border-t border-zinc-200">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 text-zinc-600 hover:bg-violet-50 hover:text-violet-600 rounded-md transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 text-zinc-600 hover:bg-violet-50 hover:text-violet-600 rounded-md transition-colors"
        >
          <LifeBuoy className="h-5 w-5" />
          <span>Support</span>
        </a>
      </div>
       <div className="border-t border-zinc-200 p-4">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fDE?q=80&w=2080&auto=format&fit=crop"
            alt="User avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-zinc-800">Alex Johnson</p>
            <p className="text-sm text-zinc-500">alex.j@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

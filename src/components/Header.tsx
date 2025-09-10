import { PlusCircle, Search } from 'lucide-react'

interface HeaderProps {
  onAddFlag: () => void
}

export function Header({ onAddFlag }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-6 border-b border-zinc-200 bg-white">
      <div>
        <h2 className="text-2xl font-bold text-zinc-800">Feature Flags</h2>
        <p className="text-zinc-500">Manage and toggle features for your application.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search flags..."
            className="w-64 pl-10 pr-4 py-2 border border-zinc-300 rounded-lg bg-zinc-50 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
          />
        </div>
        <button
          onClick={onAddFlag}
          className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-violet-700 transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          <span>New Flag</span>
        </button>
      </div>
    </header>
  )
}

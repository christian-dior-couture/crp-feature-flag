import { useContext } from 'react'
import { MoreHorizontal, Trash2 } from 'lucide-react'
import { FeatureFlag } from '../types'
import { FeatureFlagsContext } from '../context/FeatureFlagsContext'

interface FeatureFlagItemProps {
  flag: FeatureFlag
}

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";

  return Math.floor(seconds) + " seconds ago";
}

export function FeatureFlagItem({ flag }: FeatureFlagItemProps) {
  const context = useContext(FeatureFlagsContext)
  if (!context) {
    throw new Error('FeatureFlagItem must be used within a FeatureFlagsProvider')
  }
  const { toggleFlag, deleteFlag } = context

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-zinc-900">{flag.name}</div>
        <div className="text-sm text-zinc-500">{flag.description}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <label htmlFor={`toggle-${flag.id}`} className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              id={`toggle-${flag.id}`}
              type="checkbox"
              className="sr-only"
              checked={flag.enabled}
              onChange={() => toggleFlag(flag.id)}
            />
            <div className={`block w-14 h-8 rounded-full transition ${flag.enabled ? 'bg-violet-600' : 'bg-zinc-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${flag.enabled ? 'translate-x-6' : ''}`}></div>
          </div>
          <span className={`ml-3 font-medium ${flag.enabled ? 'text-violet-700' : 'text-zinc-600'}`}>
            {flag.enabled ? 'On' : 'Off'}
          </span>
        </label>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">{timeAgo(flag.updatedAt)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="relative inline-block text-left group">
          <button className="p-2 rounded-full hover:bg-zinc-100">
            <MoreHorizontal className="h-5 w-5 text-zinc-500" />
          </button>
           <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block z-10">
            <div className="py-1">
              <button
                onClick={() => deleteFlag(flag.id)}
                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Flag</span>
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

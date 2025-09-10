import { useContext } from 'react'
import { FeatureFlagsContext } from '../context/FeatureFlagsContext'
import { FeatureFlagItem } from './FeatureFlagItem'
import { Server } from 'lucide-react'

export function FeatureFlagList() {
  const context = useContext(FeatureFlagsContext)

  if (!context) {
    throw new Error('FeatureFlagList must be used within a FeatureFlagsProvider')
  }

  const { flags } = context

  if (flags.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed border-zinc-200">
        <Server className="mx-auto h-12 w-12 text-zinc-400" />
        <h3 className="mt-4 text-lg font-semibold text-zinc-800">No Feature Flags Yet</h3>
        <p className="mt-1 text-zinc-500">Click "New Flag" to create your first feature flag.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-zinc-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Feature
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Last Modified
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-zinc-200">
            {flags.map((flag) => (
              <FeatureFlagItem key={flag.id} flag={flag} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

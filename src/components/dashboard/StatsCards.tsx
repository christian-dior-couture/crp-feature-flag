import { BarChart, CheckCircle, AlertTriangle, Archive } from 'lucide-react'

const stats = [
  { name: 'Total Flags', stat: '73', icon: BarChart, automationId: 'total-flags' },
  { name: 'Active Flags', stat: '62', icon: CheckCircle, automationId: 'active-flags' },
  { name: 'Inactive Flags', stat: '11', icon: AlertTriangle, automationId: 'inactive-flags' },
  { name: 'Archived', stat: '5', icon: Archive, automationId: 'archived-flags' },
]

const StatsCards = () => {
  return (
    <div automation-id="stats-cards-container">
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            data-reference={item.automationId}
            automation-id={`stat-card-${item.automationId}`}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    {' '}
                    View all<span className="sr-only"> {item.name} stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default StatsCards

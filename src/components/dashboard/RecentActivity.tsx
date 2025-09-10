import { CheckCircle, AlertCircle, Archive } from 'lucide-react'

const activities = [
  { id: 1, user: 'Jane Doe', action: 'enabled', flag: 'new-checkout-flow', time: '10m ago', icon: CheckCircle, iconColor: 'text-green-500' },
  { id: 2, user: 'John Smith', action: 'disabled', flag: 'beta-user-dashboard', time: '1h ago', icon: AlertCircle, iconColor: 'text-yellow-500' },
  { id: 3, user: 'Admin', action: 'archived', flag: 'old-pricing-page', time: '3h ago', icon: Archive, iconColor: 'text-gray-500' },
  { id: 4, user: 'Jane Doe', action: 'created', flag: 'dark-mode-toggle', time: '1d ago', icon: CheckCircle, iconColor: 'text-green-500' },
]

const RecentActivity = () => {
  return (
    <div className="bg-white shadow rounded-lg" automation-id="recent-activity">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <li key={activity.id} className="p-4" data-reference={`activity-${activity.id}`}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <activity.icon className={`h-5 w-5 ${activity.iconColor}`} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-900">{activity.user}</span>
                    {' '}{activity.action} the <span className="font-medium text-gray-900">{activity.flag}</span> flag.
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-50 px-6 py-4">
        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          View all activity
        </a>
      </div>
    </div>
  )
}

export default RecentActivity

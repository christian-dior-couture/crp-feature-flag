const flags = [
  { id: 'new-checkout-flow', description: 'Enables the redesigned checkout experience.', status: true, lastUpdated: '2h ago' },
  { id: 'beta-user-dashboard', description: 'Rolls out the new dashboard to beta users.', status: false, lastUpdated: '1d ago' },
  { id: 'dark-mode-toggle', description: 'Adds a dark mode toggle to the UI.', status: true, lastUpdated: '3d ago' },
]

const FlagList = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md" automation-id="flag-list-container">
      <ul role="list" className="divide-y divide-gray-200">
        {flags.map((flag) => (
          <li key={flag.id} data-reference={flag.id}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">{flag.id}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        flag.status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {flag.status ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">{flag.description}</p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Last updated <time dateTime={flag.lastUpdated}>{flag.lastUpdated}</time>
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FlagList

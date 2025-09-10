'use client';

import { Flag, Plus, Settings } from 'lucide-react';

const DashboardPage = () => {

  const Header = () => (
    <div className="md:flex md:items-center md:justify-between" automation-id="dashboard-header">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Feature Flags
        </h2>
      </div>
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          automation-id="settings-button"
        >
          <Settings className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          Settings
        </button>
        <button
          type="button"
          className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          automation-id="create-flag-button"
        >
          <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Create Flag
        </button>
      </div>
    </div>
  );
  
  const EmptyState = () => (
    <div className="text-center py-12" automation-id="empty-state">
        <Flag className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No feature flags</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new feature flag.</p>
        <div className="mt-6">
            <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                automation-id="empty-state-create-button"
            >
                <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                Create Flag
            </button>
        </div>
    </div>
);


  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="mt-8">
        <div className="bg-white p-6 rounded-lg shadow">
            <EmptyState />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;

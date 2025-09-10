'use client';

import Sidebar from '../../components/layout/Sidebar';
import { Flag, ChevronDown, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

// Mock data for feature flags
const mockFeatureFlags = [
  { id: 1, name: 'New User Dashboard', key: 'new_user_dashboard', enabled: true, description: 'New UI for the user dashboard', environment: 'production' },
  { id: 2, name: 'Beta Features', key: 'beta_features', enabled: false, description: 'Enable all beta features', environment: 'staging' },
  { id: 3, name: 'Analytics Tracking', key: 'analytics_tracking', enabled: true, description: 'Track user analytics', environment: 'production' },
  { id: 4, name: 'New Checkout Flow', key: 'new_checkout', enabled: false, description: 'New streamlined checkout process', environment: 'development' },
  { id: 5, name: 'API Rate Limiting', key: 'api_rate_limit', enabled: true, description: 'Enable API rate limiting', environment: 'production' },
];

const FlagsPage = () => {
  const [featureFlags, setFeatureFlags] = useState(mockFeatureFlags);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFlags = featureFlags.filter(flag => 
    flag.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    flag.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFlag = (id: number) => {
    setFeatureFlags(featureFlags.map(flag => 
      flag.id === id ? { ...flag, enabled: !flag.enabled } : flag
    ));
  };

  return (
    <div className="flex h-screen overflow-hidden" automation-id="flags-page">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <header className="mb-8" automation-id="flags-header">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold flex items-center">
                <Flag className="h-6 w-6 mr-2" />
                Feature Flags
              </h1>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search flags"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    automation-id="search-flags-input"
                  />
                </div>
                
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  automation-id="create-flag-button"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Flag
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button className="px-3 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none">
                  All Environments <ChevronDown className="h-4 w-4 inline-block ml-1" />
                </button>
                <button className="px-3 py-2 bg-white rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none">
                  Sort by <ChevronDown className="h-4 w-4 inline-block ml-1" />
                </button>
              </div>
              
              <span className="text-sm text-gray-500">
                Showing {filteredFlags.length} flags
              </span>
            </div>
          </header>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-md" automation-id="flags-list">
            <ul className="divide-y divide-gray-200">
              {filteredFlags.map((flag) => (
                <li key={flag.id} data-reference={`flag-${flag.id}`}>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <label className="inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer"
                              checked={flag.enabled}
                              onChange={() => toggleFlag(flag.id)}
                              automation-id={`flag-toggle-${flag.id}`}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{flag.name}</h3>
                          <p className="text-sm text-gray-500">Key: {flag.key}</p>
                        </div>
                        
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          flag.environment === 'production' ? 'bg-green-100 text-green-800' :
                          flag.environment === 'staging' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {flag.environment}
                        </span>
                      </div>
                      
                      <div className="flex space-x-4">
                        <button className="p-2 text-gray-400 hover:text-gray-500">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="mt-2 text-sm text-gray-500">{flag.description}</p>
                  </div>
                </li>
              ))}
              
              {filteredFlags.length === 0 && (
                <li className="px-4 py-12 text-center">
                  <Flag className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No flags found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm ? `No flags matching "${searchTerm}"` : 'Get started by creating a new feature flag'}
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlagsPage;

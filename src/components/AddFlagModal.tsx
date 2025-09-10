import { FormEvent, useContext, useState } from 'react'
import { X } from 'lucide-react'
import { FeatureFlagsContext } from '../context/FeatureFlagsContext'

interface AddFlagModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddFlagModal({ isOpen, onClose }: AddFlagModalProps) {
  const context = useContext(FeatureFlagsContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  if (!context) {
    throw new Error('AddFlagModal must be used within a FeatureFlagsProvider')
  }

  const { addFlag } = context

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (name.trim() && description.trim()) {
      addFlag(name, description)
      setName('')
      setDescription('')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-800"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-zinc-800 mb-2">Create New Feature Flag</h2>
        <p className="text-zinc-500 mb-6">Define a new flag to control a feature in your application.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1">
              Flag Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., new-dashboard-design"
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-zinc-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short description of what this flag controls."
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none"
              rows={3}
              required
            ></textarea>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-100 text-zinc-700 font-semibold rounded-lg hover:bg-zinc-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700"
            >
              Create Flag
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

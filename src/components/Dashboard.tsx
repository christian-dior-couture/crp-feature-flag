import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { FeatureFlagList } from './FeatureFlagList'
import { AddFlagModal } from './AddFlagModal'
import { useState } from 'react'

export function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header onAddFlag={() => setIsModalOpen(true)} />
        <main className="p-8">
          <FeatureFlagList />
        </main>
      </div>
      <AddFlagModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

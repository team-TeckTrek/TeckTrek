'use client'

import OpenModalButton from '@/components/top/shared/OpenModalButton'
import FriendsCreateModal from './FriendsCreateModal'

export default function FriendsMatchButton() {
  return (
    <OpenModalButton
      label="友達とマッチ"
      renderContent={(close) => <FriendsCreateModal onClose={close} />}
    />
  )
}

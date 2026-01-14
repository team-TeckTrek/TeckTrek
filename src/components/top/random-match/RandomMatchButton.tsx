'use client'

import OpenModalButton from '@/components/top/shared/OpenModalButton'
import RandomCreateModal from './RandomCreateModal'

export default function RandomMatchButton() {
  return (
    <OpenModalButton
      label="ランダムマッチ"
      renderContent={(close) => <RandomCreateModal onClose={close} />}
    />
  )
}

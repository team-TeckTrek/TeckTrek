'use client'
import OpenModalButton from '@/components/common/OpenModalButton'

export default function Page() {
  return (
    <main className="p-6">
      <OpenModalButton
        label="モーダル"
        renderContent={(close: () => void) => (
          <div>
            <p>中身</p>
            <button onClick={close}>閉じる</button>
          </div>
        )}
      />
    </main>
  )
}

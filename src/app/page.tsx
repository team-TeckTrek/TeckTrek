// src/app/page.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button' // 相対にするなら: "../components/ui/button"
import { UserCreateDialog } from '@/components/user/user-create-dialog' // 相対: "../components/user/user-create-dialog"

type MatchType = 'random' | 'friends'

export default function Home() {
  const [open, setOpen] = useState(false)
  const [matchType, setMatchType] = useState<MatchType>('random')

  const openDialog = (type: MatchType) => {
    setMatchType(type)
    setOpen(true)
  }

  return (
    <main className="min-h-dvh p-6 flex flex-col gap-6 items-start">
      <h1 className="text-xl font-semibold">トップ</h1>

      <div className="flex gap-4">
        <Button onClick={() => openDialog('random')}>ランダムマッチ</Button>
        <Button variant="secondary" onClick={() => openDialog('friends')}>
          友達とマッチ
        </Button>
      </div>

      <UserCreateDialog
        open={open}
        onOpenChange={setOpen}
        matchType={matchType}
      />
    </main>
  )
}

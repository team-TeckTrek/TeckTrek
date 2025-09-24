'use client'

import { useState } from 'react'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Props = {
  mode: 'random' | 'friends'
  onClose: () => void
  onConfirm?: (data: {
    name: string
    iconIndex: number
    mode: 'random' | 'friends'
  }) => void
}

export default function UserCreateModalContent({
  mode,
  onClose,
  onConfirm,
}: Props) {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState<number | null>(null)
  const [loading, setLoading] = useState(false) // ← 処理中フラグ（ボタン無効化だけに使う）

  const icons = ['🐱', '🐶', '🐰', '🦊', '🐼', '🐻', '🐨', '🐯']
  const validName = name.trim().length >= 1 && name.trim().length <= 12
  const valid = validName && icon !== null

  const handleConfirm = async () => {
    if (!valid) return
    setLoading(true)
    try {
      onConfirm?.({ name: name.trim(), iconIndex: icon!, mode })
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>ユーザー作成</DialogTitle>
      </DialogHeader>

      {/* アイコン選択 */}
      <div className="mt-2 grid grid-cols-4 gap-4">
        {icons.map((emj, i) => {
          const checked = icon === i
          return (
            <button
              key={i}
              type="button"
              onClick={() => setIcon(i)}
              className={`h-16 w-16 rounded-full border-2 text-2xl
                ${checked ? 'border-green-600 ring-2 ring-green-400' : 'border-transparent'}
                focus:outline-none focus:ring-2`}
              aria-pressed={checked}
            >
              <span aria-hidden>{emj}</span>
            </button>
          )
        })}
      </div>

      {/* 名前入力 */}
      <div className="mt-4 space-y-1.5">
        <Label htmlFor="username">ユーザーネーム（1〜12文字）</Label>
        <Input
          id="username"
          maxLength={12}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="テキスト"
          autoFocus
        />
        {!validName && name.length > 0 && (
          <p className="text-sm text-red-600">1〜12文字で入力してください</p>
        )}
      </div>

      {/* 操作 */}
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          キャンセル
        </Button>
        <Button onClick={handleConfirm} disabled={!valid || loading}>
          決定（{mode === 'random' ? 'ランダム' : '友達'}）
        </Button>
      </div>
    </>
  )
}

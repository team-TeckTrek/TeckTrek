'use client'

import { useState } from 'react'
import {
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const FORBIDDEN_RE = /[`｀@＠&＆'’‘]/

interface Props {
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
  const [loading, setLoading] = useState(false)
  const [banError, setBanError] = useState<string | null>(null)

  const icons = ['🐱', '🐶', '🐰', '🦊', '🐼', '🐻', '🐨', '🐯']

  const trimmed = name.trim()
  const hasForbidden = /[`@&'’]/.test(trimmed)
  const lenOk = trimmed.length >= 1 && trimmed.length <= 14
  const validName = lenOk && !hasForbidden
  const valid = validName && icon !== null

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (FORBIDDEN_RE.test(raw)) {
      setBanError('使用できない文字が含まれています')
      return
    }
    setName(raw)
    if (banError) setBanError(null)
  }

  const handleConfirm = async () => {
    if (!valid) return
    setLoading(true)
    try {
      onConfirm?.({ name: trimmed, iconIndex: icon!, mode })
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mx-auto my-10">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[20px] font-thin">
            アイコンを選択してください
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="mt-4 grid grid-cols-4 gap-y-4 gap-x-17">
          {icons.map((emj, i) => {
            const checked = icon === i
            return (
              <Button
                key={i}
                type="button"
                onClick={() => setIcon(i)}
                className={`grid place-items-center h-20 w-20 rounded-full text-[50px] transition bg-[#D0FFFD]
                  ${checked ? 'ring-4 ring-[#4CC314] ring-offset-2 ring-offset-background' : 'ring-2 ring-[#9BE27A]'}
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-[#4CC314]/40`}
                aria-pressed={checked}
              >
                <span aria-hidden>{emj}</span>
              </Button>
            )
          })}
        </div>

        <div className="mt-9 space-y-1.5">
          <Label className="mt-5 text-[20px] font-thin" htmlFor="username">
            ユーザーネームを入力してください
          </Label>

          <Input
            id="username"
            maxLength={14}
            value={name}
            onChange={handleNameChange}
            placeholder="テキスト"
            autoFocus
            aria-invalid={!validName && name.length > 0 ? true : undefined}
            className="!h-14 !px-4 border-2 border-black !text-[40px] placeholder:!text-[40px] !leading-[40px] [padding-block:6px] appearance-none"
          />

          {!lenOk && name.length > 0 && (
            <p className="text-sm text-red-600">1〜14文字で入力してください</p>
          )}
          {banError && <p className="text-sm text-red-600">{banError}</p>}
        </div>

        <div className="mt-10 flex justify-end gap-5">
          <Button
            variant="outline"
            className="text-[24px] font-bold ring-3 ring-[#4F7EDF] text-[#4F7EDF] rounded-full w-40 h-15"
            onClick={onClose}
            disabled={loading}
          >
            キャンセル
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!valid || loading}
            className="bg-[#4F7EDF] ring-3 ring-[#4F7EDF] rounded-full w-40 h-15 text-[24px] font-bold"
          >
            決定
          </Button>
        </div>
      </div>
    </>
  )
}

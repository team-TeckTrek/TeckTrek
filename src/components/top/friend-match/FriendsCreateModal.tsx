'use client'

import { useEffect, useRef, useState } from 'react'
import type React from 'react'
import {
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import MatchStatusView from '@/components/top/shared/MatchStatusView'

const FORBIDDEN_RE = /[`｀@＠&＆'’‘]/
const TIMEOUT_MS = 8000

type Props = {
  onClose: () => void
  onConfirm?: (data: {
    name: string
    iconIndex: number
    roomCode: string
  }) => void
}

type Step = 'form' | 'loading' | 'error'

export default function FriendsCreateModal({ onClose, onConfirm }: Props) {
  const [step, setStep] = useState<Step>('form')
  const [name, setName] = useState('')
  const [roomCode, setRoomCode] = useState('')
  const [icon, setIcon] = useState<number | null>(null)
  const [banError, setBanError] = useState<string | null>(null)

  const timerRef = useRef<number | null>(null)

  const icons = ['🐱', '🐶', '🐰', '🦊', '🐼', '🐻', '🐨', '🐯']

  const trimmedName = name.trim()
  const trimmedCode = roomCode.trim()

  const hasForbiddenName = /[`@&'’]/.test(trimmedName)
  const lenOk = trimmedName.length >= 1 && trimmedName.length <= 14
  const validName = lenOk && !hasForbiddenName

  const validCode = trimmedCode.length > 0
  const valid = validName && validCode && icon !== null

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  useEffect(() => clearTimer, [])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (FORBIDDEN_RE.test(raw)) {
      setBanError('使用できない文字が含まれています')
      return
    }
    setName(raw)
    if (banError) setBanError(null)
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value)
  }

  const startMatching = () => {
    if (!valid) return

    clearTimer()
    setStep('loading')

    timerRef.current = window.setTimeout(() => {
      setStep('error')
    }, TIMEOUT_MS)

    onConfirm?.({
      name: trimmedName,
      iconIndex: icon!,
      roomCode: trimmedCode,
    })
  }

  if (step === 'loading') {
    return (
      <MatchStatusView
        variant="loading"
        onBack={() => {
          clearTimer()
          setStep('form')
        }}
      />
    )
  }

  if (step === 'error') {
    return (
      <MatchStatusView
        variant="error"
        onRetry={() => {
          clearTimer()
          startMatching()
        }}
        onBack={() => {
          clearTimer()
          setStep('form')
        }}
      />
    )
  }

  return (
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
                ${
                  checked
                    ? 'ring-4 ring-[#4CC314] ring-offset-2 ring-offset-background'
                    : 'ring-2 ring-[#9BE27A]'
                }`}
              aria-pressed={checked}
            >
              <span aria-hidden>{emj}</span>
            </Button>
          )
        })}
      </div>

      <div className="mt-9 space-y-4">
        {/* ユーザー名 */}
        <div className="space-y-1.5">
          <Label className="text-[20px] font-thin" htmlFor="username">
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

        {/* 合言葉 */}
        <div className="space-y-1.5">
          <Label className="text-[20px] font-thin" htmlFor="roomCode">
            合言葉を入力してください
          </Label>

          <Input
            id="roomCode"
            value={roomCode}
            onChange={handleCodeChange}
            placeholder="合言葉"
            aria-invalid={!validCode && roomCode.length > 0 ? true : undefined}
            className="!h-14 !px-4 border-2 border-black !text-[40px] placeholder:!text-[40px] !leading-[40px] [padding-block:6px] appearance-none"
          />

          {!validCode && roomCode.length > 0 && (
            <p className="text-sm text-red-600">合言葉を入力してください</p>
          )}
        </div>
      </div>

      {/* ボタン */}
      <div className="mt-10 flex justify-end gap-5">
        <Button
          type="button"
          variant="outline"
          className="w-40 h-14 rounded-full text-[24px] font-bold ring-2 ring-[#4F7EDF] text-[#4F7EDF]"
          onClick={() => {
            clearTimer()
            onClose()
          }}
        >
          キャンセル
        </Button>

        <Button
          type="button"
          onClick={startMatching}
          disabled={!valid}
          className="w-40 h-14 rounded-full text-[24px] font-bold bg-[#4F7EDF] ring-2 ring-[#4F7EDF] text-white"
        >
          決定
        </Button>
      </div>
    </div>
  )
}

import { isError, SerializedError } from '@/feature/fetcher/errors'
import { NOT_FOUND_ERROR_URL, SYSTEM_ERROR_URL } from './consts'
import { redirect } from 'next/navigation'

export function handleFetchErrors(
  type: 'system' | 'notFound',
  maybeError: (unknown | SerializedError)[],
): void {
  const errors = maybeError.filter(isError)
  const errorMessage = errors
    .map((err) => `${err.name}: ${err.message}`)
    .join(', ')
  console.error(
    `REDIRECT_INTENDED: Would redirect to "${
      type === 'system' ? SYSTEM_ERROR_URL : NOT_FOUND_ERROR_URL
    }" (${errorMessage})`,
  )
  redirect(type === 'system' ? SYSTEM_ERROR_URL : NOT_FOUND_ERROR_URL)
}

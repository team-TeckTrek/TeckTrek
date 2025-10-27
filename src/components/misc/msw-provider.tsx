'use client'

import { Suspense, use } from 'react'

const mockingEnabledPromise =
  process.env.NEXT_PUBLIC_MOCK_ENABLED === 'true' &&
  typeof window !== 'undefined'
    ? import('../../../mocks/browser').then(async ({ worker }) => {
        const { handlers } = await import('../../../mocks/handler')
        await worker.start({
          onUnhandledRequest(request, print) {
            console.log(request)
            if (
              request.url.includes('_next') ||
              request.url.includes('.next') ||
              request.url.includes('favicon') ||
              request.url.includes('sentry')
            ) {
              return
            }
            print.warning()
          },
        })
        worker.use(...handlers)

        console.log(worker.listHandlers())
      })
    : Promise.resolve()

export function MSWProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  )
}

function MSWProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  use(mockingEnabledPromise)
  return children
}

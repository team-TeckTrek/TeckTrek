// pages/index.tsx

import NoticeList from '@/components/notification/NoticeList'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-md mt-8">
        <NoticeList />
      </div>
    </main>
  )
}

import NoticeList from '@/components/notification/NoticeList'
import { fetchNotices } from '@/feature/notice/request'
import { isError } from '@/feature/fetcher/errors'

export default async function Page() {
  const response = await fetchNotices()
  const notices = isError(response) ? [] : response.notices

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50">
      <div className="mt-8 w-[600px]">
        <NoticeList notices={notices} />
      </div>
      {/* 他のコンテンツ */}
    </main>
  )
}

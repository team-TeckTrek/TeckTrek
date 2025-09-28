//import NoticeList from '@/components/notification/NoticeList';
import NoticeList from '../components/notification/NoticeList'

async function getNotices() {
  try {
    const res = await fetch('https://your-api-endpoint/notices', {
      cache: 'no-store',
    })
    if (!res.ok) return []
    return (await res.json()) as any[]
  } catch (e) {
    return []
  }
}

export default async function Page() {
  const notices = await getNotices()

  return (
    <main>
      <NoticeList notices={notices} />
    </main>
  )
}

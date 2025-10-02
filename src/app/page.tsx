import NoticeList from '@/components/notification/NoticeList';
import { DEFAULT_NOTICES } from '@/constants/notices';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50">
      <div className="mt-8 w-full max-w-[560px]">
        <NoticeList notices={DEFAULT_NOTICES} />
      </div>
      {/* 他のコンテンツ */}
    </main>
  );
}

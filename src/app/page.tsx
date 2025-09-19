import NoticeList from '@/components/notification/NoticeList';
import CurrentDate from '../components/notification/CurrentDate';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-md mt-8">
        <NoticeList />
      </div>
      <CurrentDate />
      {/* 他のコンテンツ */}
    </main>
  );
}

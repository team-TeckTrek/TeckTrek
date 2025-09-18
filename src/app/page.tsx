import NoticeList from '@/components/NoticeList';
import CurrentDate from '../components/ui/CurrentDate';

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
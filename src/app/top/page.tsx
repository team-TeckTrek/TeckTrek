import MusicToggleButton from '@/components/music-button/MusicToggleButton'
import Image from 'next/image'
import NoticeList from '@/components/notification/NoticeList'
import { DEFAULT_NOTICES } from '@/constants/notices'

export default function TopPage() {
  return (
    <main className="h-screen flex flex-col relative">
      <Image
        src="/image/back-image.png"
        alt="背景のストライプ"
        fill
        priority
        sizes="1920px"
        className="object-cover -z-10"
      />

      <div className="flex-1 flex items-start justify-center">
        <div className="flex flex-col items-center gap-2 mt-[80px] pb-[50px]">
          <h1 className="text-[90px] font-medium text-[#352107] text-center leading-relaxed">
            <span className="block">Teck Trek</span>
            <span className="block">絵しりとり</span>
          </h1>
        </div>
      </div>

      <div className="pb-8 translate-y-[-120px] w-full">
        <div className="grid grid-cols-[1fr_1000px_1fr] items-end">
          <div className="col-start-2 flex justify-center">
            <NoticeList notices={DEFAULT_NOTICES} />
          </div>
          <div className="col-start-3 justify-self-start pl-6 z-50 translate-x-48 translate-y-16">
            <MusicToggleButton />
          </div>
        </div>
      </div>
    </main>
  )
}

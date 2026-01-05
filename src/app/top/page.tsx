import MusicToggleButton from '@/components/music-button/MusicToggleButton'
import Image from 'next/image'
import NoticeList from '@/components/notification/NoticeList'
import { DEFAULT_NOTICES } from '@/constants/notices'

export default function TopPage() {
  return (
    <main className="h-screen flex flex-col relative">
      {/* todo: dummy画像のため素材到着後差し替え */}
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

      {/* ▼ ここから追加（既存は変更なし） */}
      <div className="flex justify-center pb-8 translate-y-[-120px]">
        <div className="w-[1000px] py-8">
          <div className="scale-125 origin-top">
            <NoticeList notices={DEFAULT_NOTICES} />
          </div>
        </div>
      </div>
      {/* ▲ 追加ここまで */}

      <MusicToggleButton />
    </main>
  )
}

import MusicToggleButton from '@/components/music-button/MusicToggleButton'
import Image from 'next/image'

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

      <MusicToggleButton />
    </main>
  )
}

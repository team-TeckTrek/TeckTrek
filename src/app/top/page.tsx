import Image from 'next/image'

export default function TopPage() {
  return (
    <main className="h-screen relative flex flex-col items-center justify-center">
      <Image
        src="/image/back-image.png"
        alt="背景のストライプ"
        fill
        priority
        sizes="1920px"
        className="object-cover -z-10"
      />
      <div className="flex flex-col items-center gap-2 -translate-y-[20vh]">
        <h1 className="text-[72px] font-bold text-[#352107] text-center leading-relaxed">
          <span className="block">Teck Trek</span>
          <span className="block">絵しりとり</span>
        </h1>
      </div>
    </main>
  )
}

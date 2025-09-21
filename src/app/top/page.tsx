import Image from 'next/image'

export default function TopPage() {
  return (
    <main className="h-screen flex items-center justify-center relative">
      <Image
        src="/image/back-image.png"
        alt="背景のストライプ"
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10"
      />
      <h1 className="absolute top-1/7 left-1/2 -translate-x-1/2 text-[5vw] font-bold text-[#352107] text-center leading-relaxed">
        <span className="block">Teck Trek</span>
        <span className="block">絵しりとり</span>
      </h1>
    </main>
  )
}

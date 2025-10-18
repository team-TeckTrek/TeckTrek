import DrawingBoard from '@/components/play/DrawingBoard'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        className="flex items-center justify-center"
        style={{
          width: 1024,
          height: 720,
        }}
      >
        <DrawingBoard />
      </div>
    </div>
  )
}

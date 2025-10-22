import EraserIcon from '@/components/icons/EraserIcon'
import { Button } from '@/components/ui/button'

export default function UsageExample() {
  return (
    <div className="flex items-center gap-6 bg-white/80 p-6">
      <Button
        variant="ghost"
        className="h-14 w-14 rounded-2xl border-[3px] border-[#4B2E0F] bg-[rgba(255,255,255,0.7)] text-[#462C05]"
      >
        <EraserIcon className="h-[30px] w-[30px]" title="消しゴム" />
      </Button>

      <EraserIcon
        className="h-[48px] w-[48px] text-slate-500"
        aria-hidden="true"
      />
    </div>
  )
}

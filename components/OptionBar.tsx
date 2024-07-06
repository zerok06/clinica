import Link from 'next/link'

interface OptionBarProps {
  href: string
  icon: React.ReactNode
  label: string
}
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const OptionBar: React.FC<OptionBarProps> = ({ href, icon, label }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className="size-[44px] hover:bg-white/10 transition-colors duration-300 rounded-xl items-center flex justify-center"
          >
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={10} className="px-2 py-1">
          <p className="text-xs text-black/70 font-medium">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default OptionBar

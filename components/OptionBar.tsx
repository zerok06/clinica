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
import { cn } from '@/lib/utils'

const OptionBar: React.FC<OptionBarProps> = ({ href, icon, label }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn("h-[36px] w-[36px] hover:bg-white/10 transition-colors duration-300 rounded-xl items-center flex justify-center px-2 gap-2", {
              "w-[124px] justify-start": true
            })}
          >
            {icon}
            <p className='text-xs font-medium'>{label}</p>
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

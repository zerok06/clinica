import React from 'react'
import type { Diente } from '@/hook/useOdontograma'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const Tooth: React.FC<Diente> = ({ code, diagnostico, id, image, name }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div
          className="w-[40px] flex items-center flex-col"
          title={code.toString()}
          key={id}
        >
          <p className="text-xs text-primary/60">{code}</p>
          <img src={image} className="w-[40px] h-[61px]" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Tooth

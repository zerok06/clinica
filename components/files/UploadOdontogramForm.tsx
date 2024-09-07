'use client'

import { uploadFileOdontograma } from '@/lib/actions/files'
import { toast } from '../ui/use-toast'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

interface UploadOdontogramFormProps {
  id: string
  close: () => void
}

const UploadOdontogramForm: React.FC<UploadOdontogramFormProps> = ({
  id,
  close,
}) => {
  return (
    <form
      action={data => {
        uploadFileOdontograma(data).then(res =>
          toast({
            title: 'Uh oh! Something went wrong.',
            description: JSON.stringify(res),
          })
        )
        close()
      }}
      className="flex flex-col gap-4"
    >
      <label>
        <span>Subir un archivo</span>
        <div className="flex flex-col gap-2">
          <Input name="file" type="file" accept="image/*,.pdf" required />
          <input type="hidden" name="id" value={id} />
        </div>
      </label>
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default UploadOdontogramForm

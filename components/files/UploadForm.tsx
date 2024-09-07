'use client'

import { uploadFile } from '@/lib/actions/files'
import { toast } from '../ui/use-toast'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '../ui/button'

interface UploadFormProps {
  id: string
  close: () => void
}

const UploadForm: React.FC<UploadFormProps> = ({ id, close }) => {
  return (
    <form
      action={data => {
        uploadFile(data).then(res =>
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
          <Input name="file" type="file" accept="image/*,.pdf" />
          <Select defaultValue="Otros" name="category">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo de archivo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Odontograma">Odontograma</SelectItem>
              <SelectItem value="Radiografia">Radiografia</SelectItem>
              <SelectItem value="Consentimiento">Consentimiento</SelectItem>
              <SelectItem value="Otros">Otros</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" name="id" value={id} />
        </div>
      </label>
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default UploadForm

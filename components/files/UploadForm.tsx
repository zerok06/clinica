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

interface UploadFormProps {
  id: string
}

const UploadForm: React.FC<UploadFormProps> = ({ id }) => {
  return (
    <form
      action={data =>
        uploadFile(data).then(res =>
          toast({
            title: 'Uh oh! Something went wrong.',
            description: JSON.stringify(res),
          })
        )
      }
      className="flex flex-col gap-4 w-[300px]"
    >
      <label>
        <span>Subir un archivo</span>
        <div className="flex flex-col gap-2">
          <Input name="file" type="file" accept="image/*,.pdf" />
          <Select defaultValue="Otros">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo de archivo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Radiografia">Radiografia</SelectItem>
              <SelectItem value="Consentimiento">Consentimiento</SelectItem>
              <SelectItem value="Otros">Otros</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" name="id" value={id} />
        </div>
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}

export default UploadForm

import UploadForm from '@/components/files/UploadForm'
import { fetchFilesPatient } from '@/lib/actions/files'
import { Image } from 'lucide-react'
import React from 'react'

interface PagePatientProps {
  params: { id: string }
}

const Page: React.FC<PagePatientProps> = async ({ params: { id } }) => {
  const { files } = await fetchFilesPatient(id)

  return (
    <section className="w-full  bg-white rounded-2xl p-4 relative">
      <div className="flex flex-row gap-4">
        <div className="flex-1 flex flex-col gap-2">
          {files?.map(item => (
            <div className="border p-3 rounded-xl flex gap-3 items-center">
              <div className="bg-primary/5 h-8 w-8 flex justify-center items-center rounded-lg">
                <Image className="text-primary/40" size={18} />
              </div>
              <div className="flex-1">
                <a href={item.path} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              </div>
              <div className="text-black/70">{item.size}</div>
            </div>
          ))}
        </div>
        <UploadForm id={id} />
      </div>
    </section>
  )
}

export default Page

import React, { useState } from 'react'

const useOpen = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(state => !state)
  return { open, handleOpen }
}

export default useOpen

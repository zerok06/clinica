import React, { useState } from 'react'

const useText = (texto: string) => {
  const [text, setText] = useState(texto)
  const handleText = (value: string) => setText(value)
  return { text, handleText }
}

export default useText

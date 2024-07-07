'use client'
import React, { useState } from 'react'

const useControlAlert = () => {
  const [active, setActive] = useState(false)
  const close = () => setActive(state => !state)
  return { active, close }
}

export default useControlAlert

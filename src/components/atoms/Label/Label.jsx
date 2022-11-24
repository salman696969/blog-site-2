import React from 'react'

export default function Label({children,HTMLfor,className}) {
  return (
    <label className={className} htmlFor={HTMLfor}>{children}</label>
  )
}

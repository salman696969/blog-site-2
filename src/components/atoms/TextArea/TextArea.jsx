import React from 'react'

export default function TextArea({type,  onChangeHandler,ariaLable,id,name,required,className,onInput}) {
  return (
    <textarea onInput={onInput} type={type} id={id} name={name} className={className} required={required} onChange={onChangeHandler} aria-labelledby={ariaLable} />
  )
}

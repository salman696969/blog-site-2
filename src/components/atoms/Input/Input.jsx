import React from 'react'

export default function Input({type,placeholder, onChangeHandler,ariaLable,id,name,required,className,onInput,value,disabled}) {
  return (
    <input onInput={onInput} disabled={disabled} placeholder={placeholder} value={value} type={type} id={id} name={name} className={className} required={required} onChange={onChangeHandler} aria-labelledby={ariaLable} />
  )
}

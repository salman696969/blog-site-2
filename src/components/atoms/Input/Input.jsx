import React from 'react'

export default function Input({type,placeholder, onChangeHandler,ariaLable,id,name,required,className,onInput,value,disabled,onBlur}) {
  return (
    <input onInput={onInput} onBlur={onBlur}  disabled={disabled} placeholder={placeholder} value={value} type={type} id={id} name={name} className={className} required={required} onChange={onChangeHandler} aria-labelledby={ariaLable} />
  )
}

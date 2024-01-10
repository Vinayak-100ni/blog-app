import React, { useId } from 'react'

const InputTag = React.forwardRef(function InputTag({
 label,
 type = "text",
 className = "",
 ...props

}, ref) {

 const id = useId()
 return (
  <div className='w-full'>
   {
    label &&
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400"
     htmlFor={id}>
     {label}
    </label>
   }
   {
    <input type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-200 w-full ${className}`}
     ref={ref} {...props} id={id} />
   }
  </div>
 )
})

export default InputTag

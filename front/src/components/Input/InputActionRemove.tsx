import { X } from '@phosphor-icons/react'
import { useContext } from 'react'
import { InputContext } from './InputRoot'

const InputActionRemove = () => {
  const { value, changeValue } = useContext(InputContext)

  return (
    <button type="reset" className="h-5 w-5">
      {value.length > 0 ? (
        <X
          size={20}
          className="text-primary_color"
          onClick={(event) => {
            changeValue('')
            event?.stopPropagation()
          }}
        />
      ) : null}
    </button>
  )
}

export default InputActionRemove

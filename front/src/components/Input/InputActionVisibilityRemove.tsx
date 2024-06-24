import { Eye, EyeClosed, X } from '@phosphor-icons/react'
import { useContext } from 'react'
import { InputContext } from './InputRoot'

const InputActionVisibilityRemove = () => {
  const { visibility, changeVisibility, changeValue, value } =
    useContext(InputContext)

  function handleChangeVisibility() {
    changeVisibility(!visibility)
  }

  return (
    <div className="flex">
      <button
        type="button"
        className="h-5 w-5 mr-4"
        onClick={handleChangeVisibility}
      >
        {value.length === 0 ? null : visibility ? (
          <EyeClosed
            size={20}
            className="text-primary_color"
            onClick={(event) => {
              changeVisibility(false)
              event?.stopPropagation()
            }}
          />
        ) : (
          <Eye
            size={20}
            className="text-primary_color"
            onClick={(event) => {
              changeVisibility(true)
              event?.stopPropagation()
            }}
          />
        )}
      </button>
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
    </div>
  )
}

export default InputActionVisibilityRemove

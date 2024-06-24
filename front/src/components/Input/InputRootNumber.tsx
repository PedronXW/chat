import { ReactNode, createContext, useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputRootInterface {
  patternColor: string
  id: string
  type?: string
  initialVisibility?: boolean
  children: ReactNode
}

interface InputNumberContextInterface {
  id: string
  value: number
  changeValue: (value: number) => void
  patternColor: string
}

export const InputNumberContext = createContext(
  {} as InputNumberContextInterface,
)

const InputRootNumber = ({
  patternColor,
  id,
  children,
}: InputRootInterface) => {
  const [value, setValue] = useState<number>(0)
  const { setFocus } = useFormContext()

  return (
    <InputNumberContext.Provider
      value={{
        value,
        patternColor,
        changeValue: setValue,
        id,
      }}
    >
      <div
        className={`w-full cursor-pointer ${
          patternColor === 'background_color'
            ? 'drop-shadow-none'
            : 'drop-shadow-md'
        } p-3 flex items-center bg-${patternColor} border-${patternColor} rounded-md`}
        onClick={() => {
          setFocus(id)
        }}
      >
        {children}
      </div>
    </InputNumberContext.Provider>
  )
}

export default InputRootNumber

import InputActionRemove from './InputActionRemove'
import InputActionVisibilityRemove from './InputActionVisibilityRemove'
import InputIcon from './InputIcon'
import InputNumber from './InputNumber'
import InputRoot from './InputRoot'
import InputRootNumber from './InputRootNumber'
import InputText from './InputText'

export const Input = {
  Root: InputRoot,
  RootNumber: InputRootNumber,
  Icon: InputIcon,
  Text: InputText,
  Number: InputNumber,
  ActionPassword: InputActionVisibilityRemove,
  Action: InputActionRemove,
}

import { zodResolver } from '@hookform/resolvers/zod'
import { ChatCircleText, PaperPlaneRight } from '@phosphor-icons/react'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { SocketContext } from '../../contexts/SocketContext'
import { Input } from '../Input'
import { MessageList } from '../Lists/MessageList'

export const Chat = () => {
  const { socket } = useContext(SocketContext)
  const handleSendMessage = (event: any) => {
    if (getValues().message === '') return

    socket.emit('message', {
      text: event.message,
    })
  }

  const createPersonFormSchema = z.object({
    message: z.string(),
  })

  const messageForm = useForm({
    resolver: zodResolver(createPersonFormSchema),
    defaultValues: { message: '' },
  })

  const { handleSubmit, getValues } = messageForm

  return (
    <form
      className="flex-1 gap-2 overflow-hidden h-full w-full flex flex-col p-2"
      onSubmit={handleSubmit(handleSendMessage)}
    >
      <FormProvider {...messageForm}>
        <MessageList />
        <div className="flex gap-4">
          <Input.Root
            id="message"
            initialVisibility={false}
            patternColor="background_color"
          >
            <Input.Icon icon={<ChatCircleText color="gray" size={20} />} />
            <Input.Text placeholder="Digite sua mensagem" />
          </Input.Root>
          <button
            type="submit"
            className="bg-white flex items-center justify-center gap-2 p-2 px-6 rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enviar
            <PaperPlaneRight />
          </button>
        </div>
      </FormProvider>
    </form>
  )
}

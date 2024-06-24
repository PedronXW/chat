import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { jwtDecode } from 'jwt-decode'
import { Message } from '../../../contexts/MessagesContext'
import { usePersistanceStore } from '../../../hooks/usePersistanceStore'

interface MessageCellProps {
  message: Message
}

export const MessageCell = ({ message }: MessageCellProps) => {
  const tokenJwt = usePersistanceStore().value.token_ixsoft_test_authentication

  const { sub } = jwtDecode(tokenJwt) as any

  return (
    <div
      className={`bg-white w-3/5 flex rounded-md h-min shadow-md p-3 flex-col ${sub === message.creatorId ? 'self-end' : 'self-start'} `}
    >
      <textarea
        disabled
        readOnly
        value={message.text}
        className="text-xl font-medium resize-none h-fit overflow-hidden"
      ></textarea>
      <h2 className="text-sm text-gray-400">
        {message.creatorName}
        {' - '}
        {formatDistanceToNow(new Date(message.createdAt), {
          addSuffix: true,
          locale: ptBR,
        })}
      </h2>
    </div>
  )
}

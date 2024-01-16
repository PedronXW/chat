import { useContext, useEffect, useRef, useState } from 'react'
import { MessagesContext } from '../../../contexts/MessagesContext'
import { MessageCell } from './MessageCell'

export const MessageList = () => {
  const { fetchMessages, messages, count } = useContext(MessagesContext)

  const [page, setPage] = useState<number>(0)

  const ref = useRef(null)

  const listRef = useRef<any>(null)

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      const ratio = entry.intersectionRatio

      if (ratio > 0) {
        getNextPage()
      }
    })

    if (ref.current) {
      intersectionObserver.observe(ref.current)
    }

    listRef.current.scrollTop = listRef.current.scrollHeight

    return () => {
      intersectionObserver.disconnect()
    }
  }, [count, messages, page])

  const getNextPage = async () => {
    if (messages?.length === count) return
    fetchMessages({ page, limit: 10 })
    setPage(page + 1)
  }

  return (
    <div
      ref={listRef}
      className="w-full flex flex-col flex-1 overflow-y-scroll gap-4 align-bottom p-4"
    >
      {messages?.length === count ? (
        <div></div>
      ) : (
        <div ref={ref}>Loading...</div>
      )}
      {messages ? (
        messages.map((message) => (
          <MessageCell message={message} key={message.id} />
        ))
      ) : (
        <div>Erro ao carregar dados</div>
      )}
    </div>
  )
}

import { useConversationStore } from '@/stores/conversation'
import { useEffect, useRef } from 'react'

export const Prompt = () => {
  const { generateComponent } = useConversationStore((state) => state)
  const textAreaRef = useRef()

  async function handleSubmit (event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const prompt = formData.get('prompt')
    generateComponent({ prompt })
  }

  useEffect(() => {
    textAreaRef.current.focus()
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name='prompt'
        ref={textAreaRef}
        autoFocus
        rows={1}
        type='text'
        className='block w-full text-xl px-4 p-4 border border-gray-600 rounded-lg bg-zinc-900/50 sm:text-md backdrop-blur-3xl text-white shadow-lg h-[48px] outline-none'
      />
      <button>Enviar  consulta</button>
    </form>
  )
}

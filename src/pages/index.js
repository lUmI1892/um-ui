import { Prompt } from '@/components/Prompt'
import { useConversationStore } from '@/stores/conversation'

export default function Home () {
  const response = useConversationStore((state) => state.response)
  return (
    <main className='px-10 py-24 relative min-h-screen w-screen'>
      <h1 className=' bg-gradient-to-r from-indigo-300 mb-10 to-purple-400 text-5xl font-bold text-transparent bg-clip-text'>Genera componentes con IA</h1>
      <div className='flex items-center h-full w-full'>
        <div className='w-full'>
          <Prompt />
        </div>
        <br />
        {response}
      </div>
    </main>
  )
}

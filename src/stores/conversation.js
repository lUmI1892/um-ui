const { APIS } = require('@/config/consts')
const { create } = require('zustand')

export const useConversationStore = create(set => ({
  response: null,
  isReplying: false,
  generateComponent: async ({ prompt, language = 'Javascript', framework = 'React' }) => {
    set({
      isReplying: true
    })
    const response = await fetch(`${APIS.GENERATE}?prompt=${prompt}&languaje=${language}&framework=${framework}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const { content } = await response.json()
    set({
      isReplying: false,
      response: content
    })
  }
}))

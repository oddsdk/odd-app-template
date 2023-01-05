import type * as webnative from 'webnative'
import { get as getStore } from 'svelte/store'

import { sessionStore } from '$src/stores'


export const createAccountLinkingConsumer = async (
  username: string
): Promise<webnative.AccountLinkingConsumer> => {
  const session = getStore(sessionStore)
  if (session.authStrategy) return session.authStrategy.accountConsumer(username)

  // Wait for program to be initialised
  return new Promise((resolve) => {
    sessionStore.subscribe(updatedState => {
      if (!updatedState.authStrategy) return
      const consumer = updatedState.authStrategy.accountConsumer(username)
      resolve(consumer)
    })
  })
}

export const createAccountLinkingProducer = async (
  username: string
): Promise<webnative.AccountLinkingProducer> => {
  const session = getStore(sessionStore)
  return session.authStrategy.accountProducer(username)
}

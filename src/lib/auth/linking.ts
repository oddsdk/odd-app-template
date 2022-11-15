import * as webnative from 'webnative'
import { get as getStore } from 'svelte/store'

import { programStore } from '$src/stores'


export const createAccountLinkingConsumer = async (
  username: string
): Promise<webnative.AccountLinkingConsumer> => {
  const program = getStore(programStore)
  if (program) return program.auth[ webnative.strategyTypes.default ].accountConsumer(username)

  // Wait for program to be initialised
  return new Promise((resolve) => {
    programStore.subscribe(program => {
      if (!program) return
      const consumer = program.auth[ webnative.strategyTypes.default ].accountConsumer(username)
      resolve(consumer)
    })
  })
}

export const createAccountLinkingProducer = async (
  username: string
): Promise<webnative.AccountLinkingProducer> => {
  const program = getStore(programStore)
  return program.auth[ webnative.strategyTypes.default ].accountProducer(username)
}
import * as webnative from 'webnative'
import type { account } from 'webnative'

export const createAccountLinkingConsumer = async (
  username: string
): Promise<account.AccountLinkingConsumer> => {
  return await webnative.account.createConsumer({ username })
}

export const createAccountLinkingProducer = async (
  username: string
): Promise<account.AccountLinkingProducer> => {
  return await webnative.account.createProducer({ username })
}
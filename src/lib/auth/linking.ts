import * as webnative from 'webnative'
import type { account } from 'webnative'

export type ConsumerState = account.AccountLinkingConsumer
export type ProducerState = {
  accountLinkingProducer: account.AccountLinkingProducer
  pin: number[]
  confirmPin: () => void
  rejectPin: () => void
 }

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
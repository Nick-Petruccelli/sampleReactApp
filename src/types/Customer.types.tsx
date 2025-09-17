import type { Account } from './Account.types'

export type Customer = {
  name: string,
  customerId: number
  address: string,
  accounts: Account[]
}

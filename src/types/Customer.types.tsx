import type { Account } from './Account.types'
import type { Address } from './Address.types.tsx'

export type Customer = {
  name: string,
  customerId: number
  address: Address,
  accounts: Account[]
}

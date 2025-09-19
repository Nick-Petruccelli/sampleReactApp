import type { Customer } from "./Customer.types";

export type Account = {
  accountId: number,
  balance: number,
  customer: Customer,
  interestRate: number,
  nextCheckNumber: number,
}

import { AccountBase, BaseAccountParams } from "./utilities/AccountBase";
import { AccountTypes } from "./utilities/AccountTypes";
import { TransactionStore } from "models/transactions/TransactionStore";

export class SavingsAccount extends AccountBase {
	interestRate: number; // Annual interest rate in percentage

	constructor(params: BaseAccountParams & { interestRate: number }) {
		super({ ...params, accountType: AccountTypes.Savings });
		this.interestRate = params.interestRate;
	}

	/**
	 * Calculates the interest accrued based on the current balance.
	 * @param txStore Transaction store to calculate balance from transaction IDs
	 * @returns Interest amount in currency units
	 */
	calculateInterest(txStore: TransactionStore): number {
		const balance = this.calculateBalance(this.getTransactionIds(), txStore);
		return (balance * this.interestRate) / 100;
	}
}
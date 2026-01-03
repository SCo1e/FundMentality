import { AccountBase, BaseAccountParams } from "./utilities/AccountBase";
import { AccountTypes } from "./utilities/AccountTypes";

/**
 * Checking Account subclass 
 * 
 * - No interest rate 
 * - No limit to transactions
 * - Can overdraft 
 */
export class CheckingAcccount extends AccountBase {
	overdraftLimit?: number; /** Limit on amount of money you can overdraft from account*/

	constructor(params: BaseAccountParams & { overdraftLimit?: number }) {
		super({ ...params, accountType: AccountTypes.Checking });
		this.overdraftLimit = params.overdraftLimit;
	}
}
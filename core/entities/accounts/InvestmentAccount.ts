import { AccountBase, BaseAccountParams } from "./utilities/AccountBase";
import { AccountTypes } from "./utilities/AccountTypes";
import { TransactionStore } from "models/transactions/TransactionStore";

//TODO: where to move the interface 
export interface Holding {
	symbol: string;
	quantity: number;
	marketPrice: number;
}

export class InvestmentAccount extends AccountBase {
	holdings?: Holding[] = [];
	constructor(params: BaseAccountParams & { holdings?: Holding[] }) {
		super({ ...params, accountType: AccountTypes.Investment });
		this.holdings = params.holdings;
	}


	//TODO: add calcInvestmentWorth
}
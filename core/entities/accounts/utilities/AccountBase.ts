/** Skeleton for all Account classes */

import { randomUUID } from "node:crypto";
import { AccountTypes } from "./AccountTypes";

/**
 * Parameters required to create a base account.
 * Used internally by the abstract Account class and its subclasses.
 */
export type BaseAccountParams = {
    id: string;
    name: string;
    accountNumber: string;
    institution: string;
    notes?: string;
};

/**
 * Abstract parent class for all types of financial accounts.
 *
 * Description: 
 * Encapsulates shared identity, transaction tracking, balance calculation,
 * and recurring event linkage. Concrete account types (e.g., Checking,
 * Savings, Credit Card) should extend this class and implement any
 * subclass-specific behavior or fields.
 * 
 * --- Internally used properties
 * @property id: Unique id associated with account. [INTERNAL]
 * @property isActive: Indicates if the account should be acknowledged. [INTERNAL]
 * 
 * --- Information about the account
 * @property institution: Financial establishment where account resides.  
 * @property name: Name assigned to an account by user.
 * @property type: Type of account [Checking,Savings,Credit Card, etc ...]
 * @property currency: ISO code of the currency held within account 
 * @property accountNumber: Last x4 digits of an account number.  
 * @property notes: [OPTIONAL] User provided notes about account.
 * 
 * --- Info for the account 
 * @property transactionIds: List of ids referencing transactions associated with account.
 * @property recurringEventIds: List of ids referencing recurring events associated with account: income, expenses, transfers. 
 * 
 * -- Info derevied from account
 * @property balance: Balance of the account from transactions.
 * @property balanceAsOf: Date at which the balance was updated. 
 */
export abstract class AccountBase {
    id: string;
    isActive: boolean = true;

    institution: string;
    name: string;
    type: AccountTypes;
    accountNumber: string;
    notes?: string;

    transactionIds: string[] = [];
    recurringEventIds: string[] = [];

    balance: number = 0;
    balanceAsOf: Date = new Date();




}
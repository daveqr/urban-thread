import Money from "dinero.js";
import { CartItem } from "../models/CartItem";

import Dinero from "dinero.js";

export class MoneyFormatter {
    convertToCents: boolean;
    currency: Dinero.Currency;

    private constructor(currency: Dinero.Currency, convertToCents: boolean) {
        this.currency = currency;
        Money.defaultCurrency = currency;
        this.convertToCents = convertToCents;
    }

    static create(currency: Dinero.Currency = "USD", convertToCents = true) {
        return new MoneyFormatter(currency, convertToCents);
    }

    format(amount: number) {
        const amountInCents = this.convertToCents ? amount * 100 : amount;
        return Dinero({ amount: amountInCents }).toFormat();
    }
}

export const moneyFormatter = MoneyFormatter.create('USD');

export const calculateTotalCostForItem = (item: CartItem) => {
    const totalPriceInCents = item.price * item.quantity;
    return totalPriceInCents;
};

export const calculateCartSubtotal = (cartItems: CartItem[]) => {
    const totalInCents = cartItems.reduce(
        (total, item) =>
            total + calculateTotalCostForItem(item),
        0
    );

    return totalInCents;
};

// TODO add tax and shipping
export const calculateCartTotal = (cartItems: CartItem[]) => {

    const totalInCents = cartItems.reduce(
        (total, item) =>
            total + calculateTotalCostForItem(item),
        0
    );

    return totalInCents;
};


import Money from "dinero.js";

class MoneyFormatter {
    convertToCents: boolean;
    currency: Money.Currency;

    private constructor(currency: Money.Currency, convertToCents: boolean) {
        this.currency = currency;
        Money.defaultCurrency = currency;
        this.convertToCents = convertToCents;
    }

    static create(currency: Money.Currency = 'USD', convertToCents = true) {
        return new MoneyFormatter(currency, convertToCents);
    }

    format(amount: number) {
        const amountInCents = this.convertToCents ? amount * 100 : amount;
        return Money({ amount: amountInCents }).toFormat();
    }
}

export const moneyFormatter = MoneyFormatter.create('USD');
export class CartItem {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public quantity: number = 1
  ) { }

  getTotalCost() {
    return this.price * this.quantity;
  }

  static copy(item: CartItem): CartItem {
    return new CartItem(item.id, item.name, item.price, item.quantity);
  }

  static of(itemObject: {
    id: string;
    name: string;
    price: number;
    quantity?: number;
  }): CartItem {
    const { id, name, price, quantity = 1 } = itemObject;
    return new CartItem(id, name, price, quantity);
  }
}
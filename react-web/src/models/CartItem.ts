export class CartItem {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public quantity: number = 1
  ) { }

  getTotalCost() {
    const totalCost = this.price * this.quantity;
    return parseFloat(totalCost.toFixed(2));
  }

  static copy(item: CartItem): CartItem {
    return new CartItem(item.id, item.name, item.price, item.quantity);
  }
}
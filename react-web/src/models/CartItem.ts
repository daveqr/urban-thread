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

  copy(item: CartItem): CartItem {
    return new CartItem(item.id, item.name, item.price, item.quantity);
  }
}
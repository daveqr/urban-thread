export class CartItem {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public quantity: number = 1
  ) { }
}

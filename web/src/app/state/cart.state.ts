export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

export const initialCartState: CartState = {
    items: [],
};

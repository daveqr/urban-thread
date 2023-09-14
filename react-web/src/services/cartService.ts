import { List } from 'immutable';
import { CartItem } from '../models/CartItem';

const sampleCartData = [
    new CartItem('64f37a6038d4bb6edd24a07c', 'Soap', 789, 2),
    new CartItem('64f37a6038d4bb6edd24a07d', 'Shampoo', 599, 1),
];

export async function fetchCartData(userId: string) {
    try {
        return List(sampleCartData);
    } catch (error) {
        console.error('Error fetching cart data:', error);
        throw error;
    }
}

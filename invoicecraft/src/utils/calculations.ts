import { Item } from '../types/invoice';

export const calculateSubtotal = (items: Item[]): number => {
  return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
};

export const calculateTax = (subtotal: number, taxRate: number): number => {
  return subtotal * (taxRate / 100);
};

export const calculateTotal = (subtotal: number, tax: number): number => {
  return subtotal + tax;
};

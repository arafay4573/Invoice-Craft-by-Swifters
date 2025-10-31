export interface Item {
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  companyName: string;
  clientName: string;
  items: Item[];
  notes: string;
}

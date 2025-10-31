"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Invoice, Item } from '../types/invoice';
import { calculateSubtotal, calculateTax, calculateTotal } from '../utils/calculations';
import InvoiceActions from '../components/InvoiceActions';

export default function Home() {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [invoice, setInvoice] = useState<Invoice>({
    companyName: '',
    clientName: '',
    items: [{ description: '', quantity: 1, price: 0 }],
    notes: '',
  });
  const [taxRate, setTaxRate] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newSubtotal = calculateSubtotal(invoice.items);
    const newTax = calculateTax(newSubtotal, taxRate);
    const newTotal = calculateTotal(newSubtotal, newTax);
    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [invoice.items, taxRate]);

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setInvoice({ ...invoice, [id]: value });
  };

  const handleItemChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const items = [...invoice.items];
    const item = items[index];
    if (name === 'quantity' || name === 'price') {
      item[name] = parseFloat(value) || 0;
    } else {
      item[name] = value;
    }
    setInvoice({ ...invoice, items });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: '', quantity: 1, price: 0 }],
    });
  };

  const removeItem = (index: number) => {
    const items = [...invoice.items];
    items.splice(index, 1);
    setInvoice({ ...invoice, items });
  };

  return (
    <div className="container mx-auto p-8">
      <div ref={invoiceRef} className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Invoice Generator</h1>

        {/* Company and Client Information */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Company</h2>
            <div className="flex items-center mb-4">
              <label htmlFor="logo" className="w-32">Logo:</label>
              <input type="file" id="logo" className="border p-2 rounded w-full" />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="companyName" className="w-32">Company Name:</label>
              <input
                type="text"
                id="companyName"
                className="border p-2 rounded w-full"
                value={invoice.companyName}
                onChange={handleInvoiceChange}
              />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Client Information</h2>
            <div className="flex items-center mb-4">
              <label htmlFor="clientName" className="w-32">Client Name:</label>
              <input
                type="text"
                id="clientName"
                className="border p-2 rounded w-full"
                value={invoice.clientName}
                onChange={handleInvoiceChange}
              />
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Invoice Items</h2>
          <div className="border-b-2 pb-2 mb-4">
            <div className="grid grid-cols-5 gap-4 font-bold">
              <div>Description</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Total</div>
              <div></div>
            </div>
          </div>
          {invoice.items.map((item, index) => (
            <div key={index} className="grid grid-cols-5 gap-4 mb-4">
              <input
                type="text"
                name="description"
                placeholder="Description"
                className="border p-2 rounded"
                value={item.description}
                onChange={(e) => handleItemChange(index, e)}
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="border p-2 rounded"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="border p-2 rounded"
                value={item.price}
                onChange={(e) => handleItemChange(index, e)}
              />
              <div>${(item.quantity * item.price).toFixed(2)}</div>
              <button className="text-red-500" onClick={() => removeItem(index)}>
                Remove
              </button>
            </div>
          ))}
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addItem}>
            Add Item
          </button>
        </div>

        {/* Totals and Notes */}
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Notes</h2>
            <textarea
              id="notes"
              className="border p-2 rounded w-full"
              rows={4}
              value={invoice.notes}
              onChange={handleInvoiceChange}
            ></textarea>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Totals</h2>
            <div className="flex justify-between mb-2">
              <div>Subtotal:</div>
              <div>${subtotal.toFixed(2)}</div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                Tax (%):
                <input
                  type="number"
                  className="border p-1 rounded w-20 ml-2"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>${tax.toFixed(2)}</div>
            </div>
            <div className="flex justify-between font-bold text-xl">
              <div>Total:</div>
              <div>${total.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Signature</h2>
          <div className="border p-4 rounded">
            {/* Signature Pad will go here */}
          </div>
        </div>

        <InvoiceActions invoiceRef={invoiceRef} />
      </div>
    </div>
  );
}

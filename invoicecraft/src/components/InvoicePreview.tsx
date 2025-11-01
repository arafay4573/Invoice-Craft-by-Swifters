import React from 'react';
import { Invoice } from '../types/invoice';

interface InvoicePreviewProps {
  invoice: Invoice;
  subtotal: number;
  tax: number;
  total: number;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoice, subtotal, tax, total }) => {
  return (
    <div className="p-8 border rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Invoice</h1>
        <div>
          <p className="font-semibold">{invoice.companyName}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <p className="font-semibold">Billed To:</p>
          <p>{invoice.clientName}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4">Description</th>
              <th className="text-right py-2 px-4">Quantity</th>
              <th className="text-right py-2 px-4">Price</th>
              <th className="text-right py-2 px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{item.description}</td>
                <td className="text-right py-2 px-4">{item.quantity}</td>
                <td className="text-right py-2 px-4">${item.price.toFixed(2)}</td>
                <td className="text-right py-2 px-4">${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between mb-2">
            <p>Subtotal:</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Tax:</p>
            <p>${tax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between font-bold text-xl">
            <p>Total:</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div>
        <p className="font-semibold">Notes:</p>
        <p>{invoice.notes}</p>
      </div>
    </div>
  );
};

export default InvoicePreview;

"use client";

import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Invoice, Item } from '../types/invoice';
import { calculateSubtotal, calculateTax, calculateTotal } from '../utils/calculations';
import InvoicePreview from '../components/InvoicePreview';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    const updatedItem = { ...items[index] };

    if (name === 'quantity' || name === 'price') {
      updatedItem[name] = parseFloat(value) || 0;
    } else if (name === 'description') {
      updatedItem[name] = value;
    }

    items[index] = updatedItem;
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

  const handleDownloadPDF = () => {
    if (invoiceRef.current) {
      html2canvas(invoiceRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('invoice.pdf');
      });
    }
  };

  return (
    <>
      <Navbar onDownloadPDF={handleDownloadPDF} />
      <main className="bg-background min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Left Column: Invoice Form */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
            {/* Company and Client Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-text dark:text-white">Your Company</h2>
                <div className="mb-4">
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Logo</label>
                  <input type="file" id="logo" className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={invoice.companyName}
                    onChange={handleInvoiceChange}
                  />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4 text-text dark:text-white">Client Information</h2>
                <div>
                  <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Name</label>
                  <input
                    type="text"
                    id="clientName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={invoice.clientName}
                    onChange={handleInvoiceChange}
                  />
                </div>
              </div>
            </div>

            {/* Invoice Items */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-text dark:text-white">Invoice Items</h2>
              <div className="border-b-2 border-gray-200 dark:border-gray-700 pb-2 mb-4">
                <div className="grid grid-cols-5 gap-4 font-bold text-gray-600 dark:text-gray-300">
                  <div className="col-span-2">Description</div>
                  <div>Quantity</div>
                  <div>Price</div>
                  <div></div>
                </div>
              </div>
              {invoice.items.map((item, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 mb-4 items-center">
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    className="col-span-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                  <input
                    type="number"
                    name="quantity"
                    placeholder="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="$0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                  <button className="text-red-500 hover:text-red-700" onClick={() => removeItem(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity" onClick={addItem}>
                Add Item
              </button>
            </div>

            {/* Totals and Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-text dark:text-white">Notes</h2>
                <textarea
                  id="notes"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={4}
                  value={invoice.notes}
                  onChange={handleInvoiceChange}
                ></textarea>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4 text-text dark:text-white">Totals</h2>
                <div className="flex justify-between mb-2 text-gray-700 dark:text-gray-300">
                  <div>Subtotal:</div>
                  <div>${subtotal.toFixed(2)}</div>
                </div>
                <div className="flex items-center justify-between mb-2 text-gray-700 dark:text-gray-300">
                  <div className="flex items-center">
                    Tax (%):
                    <input
                      type="number"
                      className="w-20 ml-2 px-3 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={taxRate}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>${tax.toFixed(2)}</div>
                </div>
                <div className="flex justify-between font-bold text-xl text-text dark:text-white">
                  <div>Total:</div>
                  <div>${total.toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Signature */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-text dark:text-white">Signature</h2>
              <div className="border border-gray-300 rounded-lg p-4">
                {/* Signature Pad will go here */}
              </div>
            </div>
          </div>

          {/* Right Column: Invoice Preview */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-text dark:text-white">Invoice Preview</h2>
            <div ref={invoiceRef}>
              <InvoicePreview invoice={invoice} subtotal={subtotal} tax={tax} total={total} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

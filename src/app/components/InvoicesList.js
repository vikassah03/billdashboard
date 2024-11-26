import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const InvoicesList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const invoicesSnapshot = await getDocs(collection(db, 'invoices'));
      const invoicesList = invoicesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInvoices(invoicesList);
    };

    fetchInvoices();
  }, []);

  const calculateTotal = (unitPrice, quantity, taxRate, discount) => {
    const subtotal = unitPrice * quantity;
    const tax = (subtotal * taxRate) / 100;
    const total = subtotal + tax - discount;
    return total;
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>
      {invoices.map((invoice) => (
        <div key={invoice.id} className="border p-4 mb-4 rounded">
          <p><strong>Client:</strong> {invoice.client}</p>
          <p><strong>Billing Address:</strong> {invoice.billingAddress}</p>
          <p><strong>Shipping Address:</strong> {invoice.shippingAddress}</p>
          <p><strong>Contact Details:</strong> {invoice.contactDetails}</p>
          <p><strong>Product Name:</strong> {invoice.productName}</p>
          <p><strong>Description:</strong> {invoice.description}</p>
          <p><strong>Quantity:</strong> {invoice.quantity}</p>
          <p><strong>Unit Price:</strong> ${invoice.unitPrice}</p>
          <p><strong>Amount:</strong> ${invoice.amount}</p>
          <p><strong>Tax Rate:</strong> {invoice.taxRate}%</p>
          <p><strong>Invoice Number:</strong> {invoice.invoiceNumber}</p>
          <p><strong>Invoice Date:</strong> {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
          <p><strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString()}</p>
          <p><strong>Payment Terms:</strong> {invoice.paymentTerms}</p>
          <p><strong>Discount:</strong> ${invoice.discount}</p>
          <p><strong>Notes:</strong> {invoice.notes}</p>
          <p><strong>Date Created:</strong> {new Date(invoice.createdAt.toDate()).toLocaleDateString()}</p>
          <p><strong>Total Amount:</strong> ${calculateTotal(invoice.unitPrice, invoice.quantity, invoice.taxRate, invoice.discount).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default InvoicesList;

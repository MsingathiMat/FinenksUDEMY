"use client";

import React from 'react';
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useSearchParams } from 'next/navigation';

// Define types for invoice props
interface InvoicePDFProps {
  companyName: string;
  slogan: string;
  registrationNumber: string;
  invoiceNumber: string;
  customerName: string;
  items: { description: string; quantity: number; price: number }[];
  total: number;
  paymentTerms: string;
  bankDetails: string;
}

// Define styles for the invoice PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slogan: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  companyInfo: {
    fontSize: 10,
    marginBottom: 10,
  },
  invoiceInfo: {
    fontSize: 12,
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  details: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    padding: 5,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  paymentTerms: {
    marginTop: 20,
    fontSize: 12,
  },
  bankDetails: {
    fontSize: 12,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});

const InvoicePage = () => {

    const path = useSearchParams()

  const QuotationId= path.get("QuotationId")
  const invoiceData: InvoicePDFProps = {
    companyName: 'Tech Innovations',
    slogan: 'Innovating the Future',
    registrationNumber: '1234567890',
    invoiceNumber: 'INV12345',
    customerName: 'John Doe',
    items: [
      { description: 'Product A', quantity: 2, price: 25.0 },
      { description: 'Product B', quantity: 1, price: 50.0 },
    ],
    total: 100.0,
    paymentTerms: 'Due within 30 days',
    bankDetails: 'Bank Name: ABC Bank, Account No: 123456789',
  };

  const InvoiceDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{invoiceData.companyName}</Text>
        <Text style={styles.slogan}>{invoiceData.slogan}</Text>
        <Text style={styles.companyInfo}>Reg No: {invoiceData.registrationNumber}</Text>

        <Text style={styles.invoiceInfo}>Invoice No: {invoiceData.invoiceNumber}</Text>
        <Text style={styles.invoiceInfo}>Customer Name: {invoiceData.customerName}</Text>

        <View style={[styles.table, styles.tableRow]}>
          <Text style={[styles.tableCol, styles.tableHeader]}>Description</Text>
          <Text style={[styles.tableCol, styles.tableHeader]}>Quantity</Text>
          <Text style={[styles.tableCol, styles.tableHeader]}>Price</Text>
          <Text style={[styles.tableCol, styles.tableHeader]}>Total</Text>
        </View>

        {invoiceData.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCol}>{item.description}</Text>
            <Text style={styles.tableCol}>{item.quantity}</Text>
            <Text style={styles.tableCol}>{item.price.toFixed(2)}</Text>
            <Text style={styles.tableCol}>{(item.quantity * item.price).toFixed(2)}</Text>
          </View>
        ))}

        <Text style={styles.total}>Total: ${invoiceData.total.toFixed(2)}</Text>
        <Text style={styles.paymentTerms}>Payment Terms: {invoiceData.paymentTerms}</Text>
        <Text style={styles.bankDetails}>Bank Details: {invoiceData.bankDetails}</Text>
      </Page>
    </Document>
  );

  return (
    <div className="flex flex-col items-center justify-center h-[500px] w-full p-4 ">
     
      <div className="w-full h-[500px]">
        <h2 className="text-lg font-semibold mb-2">Invoice Details</h2>

        <div className="mt-4 h-full w-full ">
          <PDFViewer width="100%" height="100%">
            {InvoiceDocument}
          </PDFViewer>
        </div>

       
      </div>
    </div>
  );
};

export default InvoicePage;

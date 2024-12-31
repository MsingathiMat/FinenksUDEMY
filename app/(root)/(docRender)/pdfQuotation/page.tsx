"use client";

import React, { useEffect, useState } from 'react';
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useSearchParams } from 'next/navigation';
import withUtilities from '@/components/mtt/HOC/withUtilities';
import { useQuery } from '@tanstack/react-query';
import { QueryModels } from '@/components/mtt/config/ReactQueryConfig';
import { useAtom } from 'jotai';
import { UserCompany } from '@/components/mtt/Atoms/AtomUserCompany';
import IsLoading from '@/components/mtt/components/Isloading';

// Define types for invoice props
interface InvoicePDFProps {
  CompanyName: string;
  Slogan: string;
  ContactPerson: string;
  Client: string;
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
    fontSize: 11,
    width: '25%',
    padding: 5,
  },
  tableHeader: {
    fontSize: 13,
    backgroundColor: '#f0f7f6',
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

const OriginalComponent = ({ Utilities }: { Utilities: UtilitiesProp }) => {
  const { Read } = Utilities;
  const path = useSearchParams();
  const QuotationId = path.get('QuoteId');
  const [CompanyData] = useAtom(UserCompany);
  const [QuotationData, setQuotationData] = useState<InvoicePDFProps | null>(null);

  const FormQuery = (QuotationId: string | null) => {
    return useQuery({
      queryKey: [QueryModels.QuotationById],
      queryFn: async () => {
        return Read('/api/root/dashboard/listOf/quotations/byId/', { QuotationId });
      },
      refetchInterval: 5000,
      gcTime: 0,
      staleTime: 0,
      enabled: !!QuotationId,
    });
  };

  const { data: QuoteData, isLoading } = FormQuery(QuotationId);

  useEffect(() => {
    if (QuoteData && CompanyData) {
      setQuotationData({
        CompanyName: CompanyData.CompanyName || 'No Company',
        Slogan: CompanyData.TagLine || 'No Tagline',
        ContactPerson: CompanyData.ContactPerson || 'No Contact Person',
        Client: QuoteData.clients.ClientName || 'No Client',
        total: 100.0,
        paymentTerms: 'Due within 30 days',
        bankDetails: 'Bank Name: ABC Bank, Account No: 123456789',
      });
    }
  }, [QuoteData, CompanyData]);

  const InvoiceDocument = QuotationData && (
    <Document>
      <Page size="A4" style={styles.page}>
       
<View style={{
    flexDirection: 'row', // Enables flexbox layout
    justifyContent: 'space-between', // Aligns children with space between them
    alignItems: 'center', // Vertically centers children
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderBottomStyle: 'solid',
    marginBottom:40
  }}>

<Text style={[styles.tableCol, styles.tableHeader]}>QUOTATION</Text>
<Text style={styles.invoiceInfo}>QT code: {QuotationId}</Text>
</View>
        <Text style={styles.header}>{QuotationData.CompanyName}</Text>
        <Text style={styles.slogan}>{QuotationData.Slogan}</Text>
        <Text style={styles.companyInfo}>Reg No: {QuotationData.total}</Text>
        <Text style={styles.invoiceInfo}>Customer Name: {QuotationData.Client}</Text>

        <View style={[styles.table, styles.tableRow]}>
          <Text style={[styles.tableCol, styles.tableHeader]}>Item</Text>
          <Text style={[styles.tableCol, styles.tableHeader, { width: 400 }]}>Description</Text>
          <Text style={[styles.tableCol, styles.tableHeader]}>Quantity</Text>
          <Text style={[styles.tableCol, styles.tableHeader]}>Price</Text>
          <Text style={[styles.tableCol, styles.tableHeader]}>Total</Text>
        </View>

        {QuoteData?.QuotationDetails.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCol}>{item.Items.ItemName}</Text>
            <Text style={[styles.tableCol, { width: 400 }]}>{item.Items.Description}</Text>
            <Text style={styles.tableCol}>{item.Quantity}</Text>
            <Text style={styles.tableCol}>{item.Amount}</Text>
            <Text style={styles.tableCol}>{parseInt(item.Amount) * parseInt(item.Quantity)}</Text>
          </View>
        ))}

        <Text style={styles.total}>Total: ${QuotationData.total.toFixed(2)}</Text>
        <Text style={styles.paymentTerms}>Payment Terms: {QuotationData.paymentTerms}</Text>
        <Text style={styles.bankDetails}>Bank Details: {QuotationData.bankDetails}</Text>
      </Page>
    </Document>
  );

  return (
    <div className="flex flex-col items-center justify-center h-[500px] w-full p-4">
      <IsLoading isLoading={isLoading} className="w-full h-full">
        <PDFViewer width="100%" height="100%">{InvoiceDocument}</PDFViewer>
      </IsLoading>
    </div>
  );
};

const InvoicePage = withUtilities(OriginalComponent);
export default InvoicePage;
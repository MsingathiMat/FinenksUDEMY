"use client";

import React from 'react';
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useSearchParams } from 'next/navigation';
import withUtilities from '@/components/mtt/HOC/withUtilities';
import { useQuery } from '@tanstack/react-query';
import { QueryModels } from '@/components/mtt/config/ReactQueryConfig';
import { useAtom } from 'jotai';
import { UserCompany } from '@/components/mtt/Atoms/AtomUserCompany';

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
    fontSize:11,
    width: '25%',
    padding: 5,
  },
  tableHeader: {
    fontSize:13,
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

const OriginalComponent = ({
  Utilities,

}: {
  Utilities: UtilitiesProp;

}) => {
  const {
    UserId,
    Create,
    toast,
    QClient,
  

 
    Read,
  } = Utilities;

    const path = useSearchParams()

  const QuotationId= path.get("QuoteId")


const [CompanyName, ] = useAtom(UserCompany);

  const FormQuery = (QuotationId: string | null) => {
    return useQuery({
      queryKey: [QueryModels.QuotationById],
      queryFn: async () => {
        return Read("/api/root/dashboard/listOf/quotations/byId/", {
          QuotationId,
        });
      },
      refetchInterval:5000,
      gcTime:0,
      staleTime:0,
      enabled: !!QuotationId,
    });
  };

  const { data: QuoteData, refetch, isPending } = FormQuery(QuotationId);

console.log(QuoteData)


  const invoiceData: InvoicePDFProps = {
    companyName: CompanyName,
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

        <Text style={styles.invoiceInfo}>Invoice No: {QuotationId}</Text>
        <Text style={styles.invoiceInfo}>Customer Name: {invoiceData.customerName}</Text>

        <View style={[styles.table, styles.tableRow]}>
        <Text style={[styles.tableCol, styles.tableHeader]}>Item</Text>
          <Text style={[styles.tableCol, styles.tableHeader,{width:400}]}>Description</Text>
          <Text style={[styles.tableCol, styles.tableHeader]}>Quantity</Text>
          <Text style={[styles.tableCol, styles.tableHeader]}>Price</Text>
          <Text style={[styles.tableCol, styles.tableHeader]}>Total</Text>
        </View>

{

QuoteData?<>{QuoteData.QuotationDetails.map((item, index) => (
  <View key={index} style={styles.tableRow}>
      <Text style={styles.tableCol}>{item.Items.ItemName }</Text>
    <Text style={[styles.tableCol,{width:400}]}>{item.Items.Description }</Text>
    <Text style={styles.tableCol}>{ item.Quantity}</Text>
    <Text style={styles.tableCol}>{item.Amount}</Text>
    <Text style={styles.tableCol}>{parseInt(item.Amount)* parseInt(item.Quantity)}</Text>
  </View>
))}</> :""
}
       

        <Text style={styles.total}>Total: ${invoiceData.total.toFixed(2)}</Text>
        <Text style={styles.paymentTerms}>Payment Terms: {invoiceData.paymentTerms}</Text>
        <Text style={styles.bankDetails}>Bank Details: {invoiceData.bankDetails}</Text>
      </Page>
    </Document>
  );

  return (
    <div className="flex flex-col items-center justify-center h-[500px] w-full p-4 ">
     
      <div className="w-full h-[500px]">
       
       <div className=' mtt-center !items-start !flex-col'>

<h6 className=' !text-[18px] font-bold'>QUOTATION</h6>
<div className=' mtt-center !items-start gap-6'>

<div className=' mtt-center gap-4 h-[30px]'>
<h6 className=' !text-[15px]'>Client: </h6>

{

QuoteData?<h2 className="text-lg  !text-[13px] text-Pri"> {QuoteData.clients.ClientName}</h2>:""
}

</div>

<div className=' mtt-center gap-4 h-[30px]'>
<h6 className=' !text-[15px]'>Quote No: </h6>
<h2 className="text-lg  !text-[13px] text-Pri"> {QuotationId}</h2>
</div>
</div>

       </div>
       

        <div className="mt-4 h-full w-full ">
          <PDFViewer width="100%" height="100%">
            {InvoiceDocument}
          </PDFViewer>
        </div>

       
      </div>
    </div>
  );
};

const InvoicePage = withUtilities(OriginalComponent)
export default InvoicePage;

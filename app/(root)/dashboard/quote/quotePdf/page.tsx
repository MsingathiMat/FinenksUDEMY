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
  CompanyName: string,
  Slogan:string,
  ContactPerson: string,
  Client: string,
  Email:string ,
  paymentTerms: string,
  bankDetails: string,
  ContactNumber:string,
  SecondaryCompanyName: string,
  SecondaryCompanyAddress: string
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
    color:'gray',
    marginBottom: 10,
  },
  companyInfo: {
    fontSize: 10,
   color:'#444444'
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
    marginTop:20
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    fontSize: 11,
    width: '25%',
    padding: 5,
    color:'#212121'
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
    marginTop: 20,
    fontSize: 12,
    fontWeight:'extrabold',
    color:'#07c6bb'
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
  
  const [CompanyData] = useAtom(UserCompany);
  const [QuotationData, setQuotationData] = useState<InvoicePDFProps | null>(null);

  const [QuotationId,SetQuotationId] = useState<string | null>(null)
  const [Subtotal, SetSubtotal] = useState<number>(0)
  const FormQuery = (QuotationId: string | null) => {
    return useQuery({
      queryKey: [QueryModels.QuotationById],
      queryFn: async () => {
        return Read('/api/root/dashboard/listOf/quotations/byId/', { QuotationId });
      },
     
      enabled: !!QuotationId,
    });
  };

  const { data: QuoteData, isLoading } = FormQuery(QuotationId);

  useEffect(() => {

    

    if(!path){
      alert("No Quotation ID")
      return
    }

    const QuotationId = path.get('QuoteId');

    SetQuotationId(QuotationId);
    if (QuoteData && CompanyData) {
      setQuotationData({
        CompanyName: CompanyData.CompanyName || 'No Company',
        Slogan: CompanyData.TagLine || 'No Tagline',
        ContactPerson: CompanyData.ContactPerson || 'No Contact Person',
        Client: QuoteData.clients.ClientName || 'No Client',
        Email:CompanyData.Email ,
        ContactNumber:CompanyData.ContactNo,
        paymentTerms: CompanyData.PaymentTerms,
        bankDetails: `BANK: ${CompanyData.BankName} | ACC NO: ${CompanyData.BankAccount} | ACC TYPE: ${CompanyData.BankType} `,
        SecondaryCompanyName: 'Secondary Company Name',
        SecondaryCompanyAddress: '123 Secondary Street, City, Country'
      });
    }
  }, [QuoteData, CompanyData]);

  const InvoiceDocument = QuotationData && (
    <Document>
      <Page size="A4" style={styles.page}>
       
<View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderBottomStyle: 'solid',
    marginBottom:40
  }}>

<Text style={[styles.tableCol, styles.tableHeader]}>QUOTATION</Text>
<Text style={styles.invoiceInfo}>QT code: {QuotationId}</Text>
</View>
<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <View>
    <Text style={{}}>{QuotationData.CompanyName}</Text>
    <Text style={styles.slogan}>{QuotationData.Slogan}</Text>
    <Text style={styles.companyInfo}>Email : {QuotationData.Email}</Text>
    <Text style={styles.companyInfo}>Contact Person: {QuotationData.ContactPerson}</Text>
    <Text style={styles.companyInfo}>Contact Number: {QuotationData.ContactNumber}</Text>
  </View>

  <View>
    <Text style={{}}>{QuoteData.clients.ClientName}</Text>
    <Text style={styles.slogan}>{QuoteData.clients.client}</Text>
    <Text style={styles.companyInfo}>Email : {QuoteData.clients.CompanyEmail}</Text>
    <Text style={styles.companyInfo}>Contact Person: {QuoteData.clients.CompanyEmail}</Text>
    <Text style={styles.companyInfo}>Contact Number: {QuotationData.ContactNumber}</Text>
  </View>

</View>

<View style={[styles.table, styles.tableRow]}>
  <Text style={[styles.tableCol, styles.tableHeader]}>Item</Text>
  <Text style={[styles.tableCol, styles.tableHeader, { width: 400 }]}>Description</Text>
  <Text style={[styles.tableCol, styles.tableHeader]}>Quantity</Text>
  <Text style={[styles.tableCol, styles.tableHeader]}>Price</Text>
  <Text style={[styles.tableCol, styles.tableHeader]}>Total</Text>
</View>



{QuoteData?.QuotationDetails.map((item, index) => {
  return (
    <View key={index} style={styles.tableRow}>
      <Text style={styles.tableCol}>{item.Items.ItemName}</Text>
      <Text style={[styles.tableCol, { width: 400 }]}>{item.Items.Description}</Text>
      <Text style={styles.tableCol}>{item.Quantity}</Text>
      <Text style={styles.tableCol}>{item.Amount}</Text>
      <Text style={styles.tableCol}>{parseInt(item.Amount) * parseInt(item.Quantity)}</Text>
    </View>
  )
})}

<View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderBottomStyle: 'solid',
    
  }}></View>
<Text style={{marginLeft:'auto', fontSize:14, marginTop:10,marginRight:50}}>{`${CompanyData?.Currency} ${QuoteData.total}`}</Text>

<View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderBottomStyle: 'solid',
    marginBottom:40
  }}></View>


<View>
    <Text style={{fontSize:13}}>Payment Terms:</Text>
    <Text style={styles.slogan}>{QuotationData.paymentTerms}</Text>
    </View>

    <View>
    <Text  style={{fontSize:13}}>Bank Details:</Text>
    <Text style={styles.slogan}>{QuotationData.bankDetails}</Text>
    </View>
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

"use client";

import React, { useEffect, useState } from "react";
import {  PDFViewer, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { useSearchParams } from "next/navigation";
import withUtilities from "@/components/mtt/HOC/withUtilities";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { UserCompany } from "@/components/mtt/Atoms/AtomUserCompany";

// Define types for invoice props
interface InvoicePDFProps {
  CompanyName: string;
  Slogan: string;
  ContactPerson: string;
  Client: string;
  Email: string;
  paymentTerms: string;
  bankDetails: string;
  ContactNumber: string;
}

// PDF Styles
const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  text: { fontSize: 14, marginBottom: 5 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  companyInfo: { fontSize: 10, color: "#444444" },
  table: { width: "100%", marginTop: 20 },
  tableRow: { flexDirection: "row" },
  tableCol: { fontSize: 11, width: "25%", padding: 5, color: "#212121" },
});

const OriginalComponent = ({ Utilities }: { Utilities: any }) => {
  const { Read } = Utilities;
  const path = useSearchParams();
  const [CompanyData] = useAtom(UserCompany);

  const [QuotationId, SetQuotationId] = useState<string | null>(null);

  const FormQuery = (QuotationId: string | null) => {
    return useQuery({
      queryKey: ["QuotationById"],
      queryFn: async () => Read("/api/root/dashboard/listOf/quotations/byId/", { QuotationId }),
      enabled: !!QuotationId,
    });
  };

  const { data: QuoteData, isLoading } = FormQuery(QuotationId);

  useEffect(() => {
    const QuotationId = path.get("QuoteId");
    if (!QuotationId) return alert("No Quotation ID");
    SetQuotationId(QuotationId);

  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }



  // ✅ Invoice PDF Document
  const InvoiceDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 10 }}>
          <Image src={CompanyData?.Logo} style={{ width: 50, height: 50, objectFit: "contain" }} />
          <Text style={styles.header}>QUOTATION</Text>
          <Text style={styles.text}>QT CODE: {QuotationId}</Text>
        </View>

        {/* Company & Client Details */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text>{QuoteData.CompanyName}</Text>
            <Text style={styles.companyInfo}>Email: {QuoteData.Email}</Text>
            <Text style={styles.companyInfo}>Contact: {QuoteData.ContactPerson}</Text>
          </View>
          <View>
            <Text>{QuoteData.clients.ClientName}</Text>
            <Text style={styles.companyInfo}>Email: {QuoteData.clients.CompanyEmail}</Text>
            <Text style={styles.companyInfo}>Contact: {QuoteData.clients.ContactPerson}</Text>
          </View>
        </View>

        {/* Table Header */}
        <View style={[styles.table, styles.tableRow]}>
          <Text style={[styles.tableCol, { fontWeight: "bold" }]}>Item</Text>
          <Text style={[styles.tableCol, { width: 400, fontWeight: "bold" }]}>Description</Text>
          <Text style={[styles.tableCol, { fontWeight: "bold" }]}>Quantity</Text>
          <Text style={[styles.tableCol, { fontWeight: "bold" }]}>Price</Text>
          <Text style={[styles.tableCol, { fontWeight: "bold" }]}>Total</Text>
        </View>

        {/* Table Data */}
        {QuoteData?.QuotationDetails.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCol}>{item.Items.ItemName}</Text>
            <Text style={[styles.tableCol, { width: 400 }]}>{item.Items.Description}</Text>
            <Text style={styles.tableCol}>{item.Quantity}</Text>
            <Text style={styles.tableCol}>{item.Amount}</Text>
            <Text style={styles.tableCol}>{parseInt(item.Amount) * parseInt(item.Quantity)}</Text>
          </View>
        ))}

        {/* Payment Info */}
        <Text style={{ marginTop: 20, fontWeight: "bold" }}>Total: {QuoteData.total}</Text>
        {/* <Text style={{ marginTop: 20 }}>Payment Terms: {QuotationData.paymentTerms}</Text>
        <Text style={{ marginTop: 20 }}>Bank Details: {QuotationData.bankDetails}</Text> */}
      </Page>
    </Document>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">PDF Preview & Download</h1>

      {/* ✅ FIXED PDF VIEWER */}
      <PDFViewer width={500} height={600} className="border">
        {InvoiceDocument}
      </PDFViewer>

    </div>
  );
};

const InvoicePage = withUtilities(OriginalComponent);
export default InvoicePage;

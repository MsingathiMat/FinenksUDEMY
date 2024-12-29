// import React from 'react';
// import { Svg, Path } from '@react-pdf/renderer';

// // Define the SVG as a React component
// const BackgroundSvg = () => (
//   <Svg
//     viewBox="0 0 500 500"
//     style={{
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       opacity: 0.1,  // Set transparency
//       zIndex: -1,
//     }}
//   >
//     <Path
//       d="M0 0 L500 0 L500 500 L0 500 Z"
//       fill="lightblue" // Use the desired fill color or gradient
//     />
//     {/* You can add more complex paths here */}
//   </Svg>
// );

// export default BackgroundSvg;


import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


// QuoteDetail Model Example (replace this with actual data from props or state)
const quoteDetail = {
  id: 'Q-001',
  clientName: 'John Doe',
  clientAddress: '123 Main St, Springfield, USA',
  date: '2024-12-29',
  items: [
    { description: 'Design Consultation', quantity: 1, price: 200 },
    { description: 'Website Development', quantity: 1, price: 1500 },
    { description: 'Hosting Service', quantity: 12, price: 10 },
  ],
  total: 1720,
};

// Styles for PDF rendering
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontSize: 12,
  },
  header: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  tableHeader: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  total: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

// Quote PDF Component
const QuotePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Background SVG */}
    
      
      {/* Header */}
      <Text style={styles.header}>Quotation</Text>

      {/* Client Information */}
      <View style={styles.section}>
        <Text>Quote ID: {quoteDetail.id}</Text>
        <Text>Date: {quoteDetail.date}</Text>
        <Text>Client: {quoteDetail.clientName}</Text>
        <Text>Address: {quoteDetail.clientAddress}</Text>
      </View>

      {/* Item Details */}
      <View style={styles.section}>
        <Text style={styles.tableHeader}>Description</Text>
        {quoteDetail.items.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text>{item.description}</Text>
            <Text>Qty: {item.quantity}</Text>
            <Text>${item.price}</Text>
          </View>
        ))}
      </View>

      {/* Total */}
      <Text style={styles.total}>Total: ${quoteDetail.total}</Text>
    </Page>
  </Document>
);

export default QuotePDF;

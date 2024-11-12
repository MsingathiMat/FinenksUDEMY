import { NextResponse } from 'next/server';
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define the GET handler for the API route
export async function GET(req) {
  try {
    // Define PDF styles
    const styles = StyleSheet.create({
      page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 20,
      },
      section: {
        marginBottom: 10,
      },
      text: {
        fontSize: 14,
      },
    });

    // Create the PDF document
    const MyDocument = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.text}>Hello, this is a PDF generated with @react-pdf/renderer!</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>This is another section in the PDF.</Text>
          </View>
        </Page>
      </Document>
    );

    // Generate the PDF as a buffer
    const pdfBuffer = await pdf(<MyDocument />).toBuffer();

    // Return the PDF as a response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="generated.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse('Failed to generate PDF', { status: 500 });
  }
}

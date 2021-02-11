import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    maxWidth:'50px',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = (props) => {
    const res = props.dados;

    return(
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>TEXTE 1
               
              </Text>
            </View>
            <View style={styles.section}>
              <Text>Section #2</Text>
            </View>
          </Page>
        </Document>
    );
  
};
export default MyDocument;
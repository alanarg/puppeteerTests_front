import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './GedPubReport';






const ReportView = (props) => (
  <PDFViewer>
    {console.log(props.dat)}
    <MyDocument dados={props.dat} />
  </PDFViewer>
);

export default ReportView;
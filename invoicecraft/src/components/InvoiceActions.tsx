import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface InvoiceActionsProps {
  invoiceRef: React.RefObject<HTMLDivElement>;
}

const InvoiceActions: React.FC<InvoiceActionsProps> = ({ invoiceRef }) => {
  const handleDownloadPDF = () => {
    if (invoiceRef.current) {
      html2canvas(invoiceRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('invoice.pdf');
      });
    }
  };

  return (
    <div className="mt-8 flex justify-end">
      <button
        className="bg-green-500 text-white px-6 py-3 rounded-lg"
        onClick={handleDownloadPDF}
      >
        Download PDF
      </button>
    </div>
  );
};

export default InvoiceActions;

import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { FaFilePdf, FaFileExcel, FaPrint } from "react-icons/fa";

type Props = {
  ExportFunction: boolean;
  data?: any;
};

const Pagination: React.FC<Props> = ({ data, ExportFunction }) => {
  // Export data as PDF
  const handleExportPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape' }); // Landscape orientation
  
    const tableColumn = Object.keys(data[0]);
    const tableRows = data.map((item:any) => Object.values(item));
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: {
        halign: 'center',  // Horizontal alignment
        valign: 'middle',  // Vertical alignment
        fontSize: 10,      // Smaller font size to fit more content
        cellPadding: 2,    // Reduced cell padding
      },
      columnStyles: {
        0: { cellWidth: 'auto' }, // Auto-size first column
        1: { cellWidth: 'auto' }, // Auto-size second column
        // You can repeat this for each column or set custom widths
      },
      headStyles: {
        fillColor: [22, 160, 133], // Header background color
        textColor: 255,            // Header text color
        fontStyle: 'bold',         // Header font style
        halign: 'center',          // Header alignment
      },
      bodyStyles: {
        halign: 'center', // Body alignment
      },
      margin: { top: 10, right: 10, bottom: 10, left: 10 }, // Margins
      pageBreak: 'auto', // Automatically add page breaks if content overflows
    });
  
    doc.save("data.pdf");
  };
  

  // Export data as Excel
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  // Print data
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const tableColumn = Object.keys(data[0]).join("</th><th>");
    const tableRows = data
      .map(
        (item: ArrayLike<unknown> | { [s: string]: unknown }) =>
          `<tr><td>${Object.values(item).join("</td><td>")}</td></tr>`
      )
      .join("");

    printWindow?.document.write(`
      <html>
        <head><title>Print Data</title></head>
        <body>
          <table border="1">
            <thead>
              <tr><th>${tableColumn}</th></tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
        </body>
      </html>
    `);
    printWindow?.document.close();
    printWindow?.print();
  };

  return (
    <div className="flex items-center justify-between scrollbar scrollbar overflow-x-auto p-4 bg-gray-50">
      <div className="flex items-start space-x-2">
        <span className="text-gray-700 hidden md:inline">Items per page:</span>
        <select className="border border-gray-300 rounded-md py-1 px-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      {ExportFunction ? (
        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportPDF}
            className="flex items-center px-3 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-red-50  focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <FaFilePdf className="mr-1 text-red-600" />
            PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center px-3 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <FaFileExcel className="mr-1 text-green-600" />
            Excel
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center px-3 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <FaPrint className="mr-1 text-blue-500" />
            Print
          </button>
        </div>
      ) : null}
      <div className="flex justify-center items-center space-x-2">
        <span className="text-gray-700 hidden md:inline">1-20 of </span>
        <button className="px-3 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
          &lt;&lt;
        </button>
        <button className="px-3 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
          &lt;
        </button>
        <button className="px-3 py-1 text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary">
          1
        </button>
        <button className="px-3 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
          2
        </button>
        <button className="px-3 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
          3
        </button>
        <button className="px-3 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
          &gt;
        </button>
        <button className="px-3 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-primary">
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;

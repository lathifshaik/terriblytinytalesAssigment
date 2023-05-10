import React from "react";

const ExportButton = ({ topWords }) => {
  const downloadCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      topWords.map((word) => word.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "word_frequency.csv");
    document.body.appendChild(link);
    link.click();
  };

  return <div id='export' style={{ margin: '0 auto', display: 'block' }} > <button onClick={downloadCsv} >Export</button> </div>;
};

export default ExportButton;

const PDFDocument = require("pdfkit");

function buildPDF(firstTime, req, data, dataCallback, endCallback) {
  const doc = new PDFDocument({ bufferPages: true, font: "Courier" });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  doc.fontSize(20).text(`Invoice details for ${req.user.fName}: `);
  //   data.forEach((element) => {
  //     console.log(element);
  //   });
  if (!firstTime) {
    doc.fontSize(12).text(
      `Unit ID: ${data.unitId}
Unit original Price: ${data.unitPrice}
How much you paid untill now: ${data.howMuchPaid}
How much remain to pay: ${data.howMuchRemain}
number Of Remaining Installments: ${data.numberOfRemainingInstallments}
premium amount: ${data.amountToPay}
    `
    );
    doc.end();
  } else {
    doc.fontSize(12).text(
      `Unit ID: ${data.unitId}
unit Name: ${data.unitName}
unit Price: ${data.unitPrice}
    `
    );
    doc.end();
  }
}

module.exports = { buildPDF };

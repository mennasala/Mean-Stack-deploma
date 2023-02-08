const pdfService = require("../../service/pdf-service");

class PDF {
  static generatePdf = (firstTime, req, res, data) => {
    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment;filename=invoice.pdf`,
    });
    pdfService.buildPDF(
      firstTime,
      req,
      data,
      (chunk) => stream.write(chunk),
      () => stream.end()
    );
  };
}

module.exports = PDF;

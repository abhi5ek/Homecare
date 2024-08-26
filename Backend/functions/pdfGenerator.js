const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const clientServiceAgreement = require('../models/ClientServiceAgreementModel');

exports.createPDF = async (id) => {
    try {
        console.log("id", id);
        const client = await clientServiceAgreement.findOne({ clientId: id });
        console.log("client", client);
        
        if(!client){
            throw new Error('Client not found');
        }
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Define the HTML content including the page break and frequency table
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Client Details PDF</title>
    <style>
        body {
            font-family: 'Helvetica', Arial, sans-serif;
            margin: 40px;
            color: #333;
            font-size: 14px;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            color: #4CAF50;
        }
        .section {
            margin-bottom: 30px;
        }
        .section h2 {
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 10px;
            color: #4CAF50;
            font-size: 20px;
            margin-bottom: 20px;
        }
        .details-table {
            width: 100%;
            border-collapse: collapse;
        }
        .details-table th,
        .details-table td {
            text-align: left;
            padding: 8px 12px;
            border: 1px solid #ddd;
        }
        .details-table th {
            background-color: #f2f2f2;
        }
        .signature-section {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
        }
        .signature-block {
            width: 30%;
            text-align: center;
        }
        .signature-block p {
            margin: 0;
            padding-top: 40px;
            border-top: 1px solid #000;
            font-weight: bold;
        }
        .date {
            margin-top: 5px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Client Information Summary</h1>
    </div>
    <div class="section">
        <h2>Client Details</h2>
        <table class="details-table">
            <tr>
                <th>Client ID:</th>
                <td>${client.clientId}</td>
            </tr>
            <tr>
                <th>Client Name:</th>
                <td>${client.initials} ${client.clientName}</td>
            </tr>
            <tr>
                <th>Address:</th>
                <td>${client.clientAddress}</td>
            </tr>
            <tr>
                <th>Insurance Provider:</th>
                <td>${client.insuranceProvider}</td>
            </tr>
        </table>
    </div>
    <div class="section">
        <h2>Signatures</h2>
        <div class="signature-section">
            <div class="signature-block">
                <p>Client Signature: ${client.clientSignature}</p>
                <p class="date">Date: ${new Date(client.clientDate).toLocaleDateString()}</p>
            </div>
            <div class="signature-block">
                <p>Financial Representative: ${client.financialSignature}</p>
                <p class="date">Date: ${new Date(client.financialDate).toLocaleDateString()}</p>
            </div>
            <div class="signature-block">
                <p>Authorized Representative: ${client.representativeSignature}</p>
                <p class="date">Date: ${new Date(client.representativeDate).toLocaleDateString()}</p>
            </div>
        </div>
    </div>
</body>
</html>
`;

        

        await page.setContent(htmlContent);

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '50px',
                bottom: '50px',
                left: '50px',
                right: '50px'
            }
        });

        await browser.close();

        const filePath = path.join(__dirname, `invoice-${client.clientId}.pdf`);
        fs.writeFileSync(filePath, pdfBuffer);

        return {pdfBuffer};
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw new Error('PDF generation failed');
    }
};

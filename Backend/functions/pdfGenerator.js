const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const clientServiceAgreement = require('../models/ClientServiceAgreementModel');
const Service = require('../models/servicePlan1Model');
const Cna1 = require('../models/cna1Model'); // Assuming you have a model for CNA1

exports.createPDF = async (id) => {
    try {
        console.log("clientId", id);
        
        // Fetch client, service, and CNA1 data
        const client = await clientServiceAgreement.findOne({ clientId: id });
        const service = await Service.findOne({ clientId: id });
        const cna1 = await Cna1.findOne({ clientId: id });
        
        if (!client) {
            throw new Error('Client not found');
        }
        if (!service) {
            throw new Error('Service not found');
        }
        if (!cna1) {
            throw new Error('CNA1 not found');
        }

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Define the HTML content with adjusted column widths
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
        .details-table, .service-table, .cna1-table {
            width: 100%;
            border-collapse: collapse;
        }
        .details-table th,
        .details-table td,
        .service-table th,
        .service-table td,
        .cna1-table th,
        .cna1-table td {
            text-align: left;
            padding: 8px 12px;
            border: 1px solid #ddd;
        }
        .details-table th,
        .service-table th,
        .cna1-table th {
            background-color: #f2f2f2;
        }
        .details-table th {
            width: 30%; /* Adjust as needed */
        }
        .details-table td {
            width: 70%; /* Adjust as needed */
        }
        .service-table th {
            width: 25%; /* Adjust as needed */
        }
        .service-table td {
            width: 75%; /* Adjust as needed */
        }
        .cna1-table th {
            width: 30%; /* Adjust as needed */
        }
        .cna1-table td {
            width: 70%; /* Adjust as needed */
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
            padding-top: 10px;
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
    <div class="section service-section">
        <h2>Service Details</h2>
        <table class="service-table">
            <tr>
                <th>Date of Birth:</th>
                <td>${new Date(service.dob).toLocaleDateString()}</td>
            </tr>
            <tr>
                <th>Address:</th>
                <td>${service.address}</td>
            </tr>
            <tr>
                <th>City:</th>
                <td>${service.city}</td>
            </tr>
            <tr>
                <th>FL:</th>
                <td>${service.fl}</td>
            </tr>
            <tr>
                <th>Telephone:</th>
                <td>${service.tel}</td>
            </tr>
            <tr>
                <th>Emergency Contact:</th>
                <td>${service.emergencyContact}</td>
            </tr>
            <tr>
                <th>Emergency Telephone:</th>
                <td>${service.emergencyTel}</td>
            </tr>
            <tr>
                <th>Health Problems:</th>
                <td>${service.healthProblems}</td>
            </tr>
            <tr>
                <th>Service Time:</th>
                <td>${service.serviceTime}</td>
            </tr>
            <tr>
                <th>Frequency DNRO:</th>
                <td>${service.frequency.dnro}</td>
            </tr>
        </table>
    </div>
    <div class="section cna1-section">
        <h2>CNA1</h2>
        <table class="cna1-table">
            <tr>
                <th>Patient Name:</th>
                <td>${cna1.patientName}</td>
            </tr>
            <tr>
                <th>Gender:</th>
                <td>${cna1.gender}</td>
            </tr>
            <tr>
                <th>MR Number:</th>
                <td>${cna1.mrNumber}</td>
            </tr>
            <tr>
                <th>Date:</th>
                <td>${new Date(cna1.date).toLocaleDateString()}</td>
            </tr>
            <tr>
                <th>Primary Diagnosis:</th>
                <td>${cna1.primaryDiagnosis}</td>
            </tr>
            <tr>
                <th>Secondary Diagnosis:</th>
                <td>${cna1.secondaryDiagnosis}</td>
            </tr>
            <tr>
                <th>PCP Name:</th>
                <td>${cna1.pcpName}</td>
            </tr>
            <tr>
                <th>Other Physician Name:</th>
                <td>${cna1.otherPhysicianName}</td>
            </tr>
        </table>
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

        return { pdfBuffer };
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw new Error('PDF generation failed');
    }
};

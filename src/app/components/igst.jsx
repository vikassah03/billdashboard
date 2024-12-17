import { useState } from 'react';
import '../../app/design.css';

export default function Invoice() {
 
  
  const [isOpen, setIsOpen] = useState(false);

  const closePopup = () => setIsOpen(false);

  const [formData, setFormData] = useState({
    date: '',
    invoiceNo: '',
    clientName: '',
    clientAddress: '',
    gst: '',
    gstNO: '',
    candidates: [{ name: '', designation: '', doj: '', fee: '' }],
    sgst: 0,
    cgst: 0,
    netAmount: 0,
    grandTotal: 0,
    bankDetails: {
      companyName: '',
      bankName: '',
      accountNo: '',
      bankAddress: '',
      ifscCode: '',
    },
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBankDetailChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        [name]: value,
      },
    }));
  };

  const handleCandidateChange = (index, field, value) => {
    const updatedCandidates = formData.candidates.map((candidate, i) =>
      i === index ? { ...candidate, [field]: value } : candidate
    );
    setFormData({ ...formData, candidates: updatedCandidates });
  };

  const handleAddCandidate = () => {
    setFormData({
      ...formData,
      candidates: [...formData.candidates, { name: '', designation: '', doj: '', fee: '' }],
    });
  };

  const calculateTotals = () => {
    setShowPreview(false);
  
    // Step 1: Candidate Fees का टोटल निकालें
    const candidateFees = formData.candidates.reduce((sum, candidate) => {
      const fee = parseFloat(candidate.fee || 0); // fee को validate करें
      return sum + fee;
    }, 0);
  
    // Step 2: SGST और CGST दर को 9% पर सेट करें
    const sgstRate = 9 / 100; // SGST दर (9%)
    const cgstRate = 9 / 100; // CGST दर (9%)
  
    // Step 3: SGST और CGST की गणना करें
    const sgst = candidateFees * sgstRate; // SGST = Net Amount × SGST Rate
    const cgst = candidateFees * cgstRate; // CGST = Net Amount × CGST Rate
  
    // Step 4: ग्रैंड टोटल की गणना करें
    const grandTotal = candidateFees + sgst + cgst;
  
    // Step 5: फॉर्म डेटा अपडेट करें
    setFormData((prev) => ({
      ...prev,
      netAmount: candidateFees.toFixed(0), // दशमलव के बाद का भाग हटाएं
      sgst: sgst.toFixed(0),              // SGST को फिक्स करें
      cgst: cgst.toFixed(0),              // CGST को फिक्स करें
      grandTotal: grandTotal.toFixed(0),  // Grand Total को फिक्स करें
    }));
  
    setShowPreview(true);
};

  
const printInvoice = () => {
  document.getElementById("closebtn").style.color = "white";

  const style = document.createElement('style');
  style.type = 'text/css';
  style.media = 'print';
  style.innerHTML = `
    @page {
      margin: 0;
    }
    body {
      -webkit-print-color-adjust: exact;
      margin-left: 200px;
    }
    .invoice-content {
      width: auto; /* Set a fixed width for the content */
      margin: auto; /* Center the content horizontally */
      padding: 20px;
      box-sizing: border-box;
    }
    header, footer {
      display: none;
    }
  `;
  document.head.appendChild(style);

  calculateTotals();
  setTimeout(() => {
    window.print();
    document.head.removeChild(style); // Clean up the style element after printing

    // Set another timeout to refresh the page after 5 seconds
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }, 100);
};




  return (
    <div className={`p-8 bg-gradient-to-br  min-h-screen ${isOpen ? 'blurred' : ''}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="date" name="date" placeholder="Date" onChange={handleChange} className="border p-2" />
        <input type="text" name="invoiceNo" placeholder="Invoice No." onChange={handleChange} className="border p-2" />
        <input type="text" name="clientName" placeholder="Client Name" onChange={handleChange} className="border p-2" />
        <textarea name="clientAddress" placeholder="Client Address." onChange={handleChange} className="border p-2"></textarea>
        <input type="text" name="gst" placeholder="GST (%)" onChange={handleChange} className="border p-2" />
        <input type="text" name="gstNO" placeholder="GST No." onChange={handleChange} className="border p-2" />

        {formData.candidates.map((candidate, index) => (
          <div key={index} className="border p-4 my-2 bg-white">
            <input
              type="text"
              placeholder="Candidate Name"
              onChange={(e) => handleCandidateChange(index, 'name', e.target.value)}
              className="border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Designation"
              onChange={(e) => handleCandidateChange(index, 'designation', e.target.value)}
              className="border p-2 mb-2"
            />
            <input
              type="text"
              placeholder="DOJ"
              onChange={(e) => handleCandidateChange(index, 'doj', e.target.value)}
              className="border p-2 mb-2"
            />
            <input
              type="number"
              placeholder="Fee"
              onChange={(e) => handleCandidateChange(index, 'fee', e.target.value)}
              className="border p-2"
            />
          </div>
        ))}

        <button onClick={handleAddCandidate} className="bg-orange-500 text-white p-2 my-4">
          Add Candidate
        </button>
      </div>

      <h2 className="text-xl font-bold mb-3 text-white">Details for Electronic Transfer</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          onChange={handleBankDetailChange}
          className="border p-2"
        />
        <input
          type="text"
          name="bankName"
          placeholder="Bank Name"
          onChange={handleBankDetailChange}
          className="border p-2"
        />
        <input
          type="text"
          name="accountNo"
          placeholder="Account No"
          onChange={handleBankDetailChange}
          className="border p-2"
        />
        <textarea
          name="bankAddress"
          placeholder="Bank Address"
          onChange={handleBankDetailChange}
          className="border p-2"
        ></textarea>
        <input
          type="text"
          name="ifscCode"
          placeholder="IFSC/NEFT Code"
          onChange={handleBankDetailChange}
          className="border p-2"
        />
      </div>

      <button onClick={calculateTotals} className="bg-green-500 text-white p-2 mt-4">
        Generate Invoice Preview
      </button>
      <button onClick={printInvoice} className="bg-orange-500 text-white p-2 ml-4">
        Print Invoice
      </button>

      {showPreview && (
        <div id="invoice-preview" className='bg-black '>
       <div  className="absolute  inset-0 flex items-center justify-center bg-opacity-50 bg-gray-500  ">
       <div className="relative mt-8 p-6 border top-44 rounded-lg max-w-3xl mx-auto printable bg-white border-hidden ">
         {/* Close Button */}
         <button onClick={() => setShowPreview(false)} id='closebtn' className="absolute top-0 right-0 p-2 text-red-600">
           &times;
         </button>
        <h2 className="text-xl font-bold text-center mb-2">INVOICE</h2>
      
        {/* Date and Invoice Number */}
        <div className="flex justify-between text-sm mb-4">
          <p><strong>Date:</strong> {formData.date || "07th Oct, 2024"}</p>
          <p><strong>Invoice No.:</strong> {formData.invoiceNo || "002/PRO/24-25"}</p>
        </div>
      
        {/* Client Information */}
        <div className="text-sm mb-4">
          <p><strong>Client Name :</strong> {formData.clientName || "Q-Line Biotech Private Limited"}</p>
          {/* <p><strong>Client Address:</strong> {formData.clientAddress || "298-281,"}</p> */}
          <p><strong>Client address : {formData.clientAddress || ""}</strong></p> 
          {/* <p><strong>GST :</strong> {formData.gst || ""}%</p> */}
          <p><strong>GST :</strong> {formData.gstNO || "09AAFCP6782B1Z6"}</p>
        </div>
      
        {/* R.O. No Section */}
          <h3 className="font-bold mb-2">R.O. No: AGREEMENT</h3>
        <div className="border border-gray-300 p-4  text-sm">
          <p className='text-xs'><strong>Towards the following Recruitment Fee:</strong></p>
          {formData.candidates.map((candidate, index) => (
            <div key={index} className="flex justify-between ">
              <div>
                <p className='text-xs'>Candidate Name: <strong>{candidate.name || "Suryakant Mani"}</strong></p>
                <p className='text-xs'>Designation: <strong>{candidate.designation || "Service Eng."}</strong>, DOJ: <strong>{candidate.doj || "26-08-2024"}</strong></p>
              </div>
              <p className="text-right font-bold">{candidate.fee || "000/-"}</p>
            </div>
          ))}
        </div>
      
        {/* Tax Section */}
        <div className="border border-gray-300 p-4 mb-4 text-sm">
          <h3 className="font-bold mb-2">NET AMOUNT</h3>
          <div className="flex justify-between">
            <p>SGST @ <span>{formData.gst || ""} %</span>:</p>
            <p className="text-right">{formData.sgst || "000/-"}</p>
          </div>
          <div className="flex justify-between">
            <p>CGST @ <span>{formData.gst || ""} %</span> :</p>
            <p className="text-right">{formData.cgst || "000/-"}</p>
          </div>
        </div>
      
        {/* Grand Total */}
        <div className="border border-gray-300 p-2 text-sm flex justify-between">
          <p className="font-bold ">GRAND TOTAL</p>
          <p className="text-right font-bold">{formData.grandTotal || "000/-"}</p>
        </div>
      
        {/* Stamp Image */}
        <div className="flex justify-end mt-4">
          <img src="https://i.ibb.co/8rf08Wz/Screenshot-2024-11-09-123404-removebg-preview.png" alt="Stamp" className="h-20 w-30"/>
        </div>
      
        {/* Note Section */}
        <div className="border border-gray-300 p-4 mt-4 text-sm">
         <p><strong>PAN: AQEPJ3137H, GSTIN: 09AQEPJ3137H1ZX, SAC Code -99851 </strong></p>
          <p className='text-xs'><strong>Note:</strong> Cheques or demand drafts against this invoice should be drawn in favor of PROSTAFFING SOLUTIONS and should be crossed Account Payee only.</p>
          <p className='text-xs'>Acknowledgement of the invoice will be deemed as acceptance of this bill in full unless we receive a written communication to the contrary within 7 days of the invoice date.</p>
          <p>Payment Terms: Immediate</p>
        </div>
      
        {/* Bank Details */}
        <div className="border border-gray-300 p-4 mt-4 text-sm">
          <h3 className="font-bold mb-2">Details for Electronic Transfer</h3>
          <p><strong>Company Name:</strong> {formData.bankDetails.companyName || "PROSTAFFING SOLUTIONS"}</p>
          <p><strong>Bank Name:</strong> {formData.bankDetails.bankName || "Punjab & Sind Bank"}</p>
          <p><strong>Account No:</strong> {formData.bankDetails.accountNo || "1511110008985"}</p>
          <p><strong>Bank Address:</strong> {formData.bankDetails.bankAddress || "Sector 63, Noida Branch, Uttar Pradesh - 201307 (India)"}</p>
          <p><strong>IFSC/NEFT Code:</strong> {formData.bankDetails.ifscCode || "PSIB0001511"}</p>
        </div>
      </div>
      </div>
      </div>
      )}
    </div>
  );
}

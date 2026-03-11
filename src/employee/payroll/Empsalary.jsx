import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import "./Empsalary.css";

const Empsalary = () => {
  const payslipRef = useRef();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = ["2024", "2025", "2026"];

  const [month, setMonth] = useState("June");
  const [year, setYear] = useState("2025");

  const selectedMonth = `${month} ${year}`;

  const downloadPDF = () => {
    const element = payslipRef.current;

    const options = {
      margin: 5,
      filename: `Employee_Payslip_${selectedMonth}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="salary-page">
      {/* TOP BAR */}

      <div className="salary-topbar">
        <h2 className="page-titlee">Employee Payslip</h2>

        <div className="month-select-box">
          <label>Select Payslip Month</label>

          <div className="month-selectors">
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              {months.map((m, i) => (
                <option key={i}>{m}</option>
              ))}
            </select>

            <select value={year} onChange={(e) => setYear(e.target.value)}>
              {years.map((y, i) => (
                <option key={i}>{y}</option>
              ))}
            </select>
          </div>

          <div className="download-wrapper">
            <button
              className="download-btnn"
              onClick={downloadPDF}
              data-html2canvas-ignore="true"
            >
              Download Payslip
            </button>
          </div>
        </div>
      </div>

      {/* PAYSLIP */}

      <div className="payslip-wrapper">
        <div className="payslip" ref={payslipRef}>
          {/* COMPANY HEADER */}

          <div className="company-header">
            <div className="company-info">
              <img
                src="/crestclimber-logo.jpeg"
                alt="logo"
                className="company-logo"
              />

              <div className="company-title">
                <h2>CRESTCLIMBER SOFTWARE SOLUTIONS PRIVATE LIMITED</h2>

                <p className="payslip-month">
                  Pay Slip for the Month {selectedMonth}
                </p>
              </div>
            </div>
          </div>

          {/* EMPLOYEE DETAILS */}

          <table className="employee-details-table">
            <tbody>
              <tr>
                <td>Name</td>
                <td>Subash Selvaraj</td>
                <td>Account Number</td>
                <td>921010009834346</td>
              </tr>

              <tr>
                <td>Employee Number</td>
                <td>INE001</td>
                <td>Bank Name</td>
                <td>AXIS BANK LTD</td>
              </tr>

              <tr>
                <td>Designation</td>
                <td>Software Engineer</td>
                <td>PAN</td>
                <td>JCLPS3533J</td>
              </tr>

              <tr>
                <td>Department</td>
                <td>Development</td>
                <td>LOP Days</td>
                <td>0</td>
              </tr>

              <tr>
                <td>Date of Joining</td>
                <td>06/08/2024</td>
                <td>Generated On</td>
                <td>01/07/2025</td>
              </tr>
            </tbody>
          </table>

          {/* SALARY TABLE */}

          <div className="salary-table-wrapper">
            <table className="salary-table">
              <thead>
                <tr>
                  <th>EARNINGS</th>
                  <th>AMOUNT</th>
                  <th>YTD</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>BASIC</td>
                  <td>6,400</td>
                  <td>70,400</td>
                </tr>

                <tr>
                  <td>HRA</td>
                  <td>3,200</td>
                  <td>35,200</td>
                </tr>

                <tr>
                  <td>TRAVEL ALLOWANCE</td>
                  <td>1,600</td>
                  <td>17,600</td>
                </tr>

                <tr>
                  <td>OTHER ALLOWANCE</td>
                  <td>3,467</td>
                  <td>38,137</td>
                </tr>

                <tr className="total-row">
                  <td>GROSS EARNINGS</td>
                  <td>16,000</td>
                  <td>1,76,000</td>
                </tr>
              </tbody>
            </table>

            <table className="salary-table">
              <thead>
                <tr>
                  <th>DEDUCTIONS</th>
                  <th>AMOUNT</th>
                  <th>YTD</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Provident Fund</td>
                  <td>768</td>
                  <td>8,448</td>
                </tr>

                <tr>
                  <td>Professional Tax</td>
                  <td>200</td>
                  <td>2,200</td>
                </tr>

                <tr className="total-row">
                  <td>Total Deduction</td>
                  <td>968</td>
                  <td>10,648</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* NET PAY */}

          <table className="netpay-table">
            <tbody>
              <tr>
                <td>
                  <b>NET PAY</b>
                </td>
                <td>₹15,032</td>
              </tr>

              <tr>
                <td>
                  <b>NET TRANSFER</b>
                </td>
                <td>₹15,032</td>
              </tr>

              <tr>
                <td>
                  <b>IN WORDS</b>
                </td>
                <td>Rupees Fifteen Thousand Thirty Two Only</td>
              </tr>
            </tbody>
          </table>

          <p className="note">
            This is a computer generated payslip. No signature required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Empsalary;

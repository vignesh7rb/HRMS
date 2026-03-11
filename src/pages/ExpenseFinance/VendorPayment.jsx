import React, { useState } from "react";
import "./expenseFinance.css";

const VendorPayment = () => {

const [activeTab,setActiveTab]=useState("payments");
const [showRecordModal,setShowRecordModal]=useState(false);
const [viewPayment,setViewPayment]=useState(null);
const [showBulkModal,setShowBulkModal]=useState(false);

const [payments,setPayments]=useState([
{
vendor:"Office Supplies Co.",
code:"VS001",
invoice:"INV-2025-001",
invoiceDate:"2025-06-01",
dueDate:"2025-06-30",
amount:25000,
balance:25000,
priority:"Medium",
status:"Pending"
},
{
vendor:"Tech Solutions Ltd.",
code:"TS002",
invoice:"INV-2025-002",
invoiceDate:"2025-06-05",
dueDate:"2025-07-05",
amount:150000,
balance:0,
priority:"High",
status:"Paid"
}
]);

const vendors=[
{name:"Office Supplies Co.",code:"VS001"},
{name:"Tech Solutions Ltd.",code:"TS002"}
];

const [paymentForm,setPaymentForm]=useState({
invoice:"",
amount:"",
mode:"Cash"
});

const totalOutstanding=payments.reduce((s,p)=>s+p.balance,0);
const overdueCount=payments.filter(p=>p.status==="Overdue").length;
const pendingApproval=payments.filter(p=>p.status==="Pending").length;

const payNow=index=>{
setPayments(prev=>prev.map((p,i)=>
i===index?{...p,balance:0,status:"Paid"}:p
));
};

const savePayment=()=>{

const payAmount=Number(paymentForm.amount);

if(!paymentForm.invoice||!payAmount){
alert("Enter Invoice & Amount");
return;
}

setPayments(prev=>prev.map(p=>{

if(p.invoice===paymentForm.invoice){

const newBalance=p.balance-payAmount;

return{
...p,
balance:newBalance<0?0:newBalance,
status:newBalance<=0?"Paid":"Processing"
};

}

return p;

}));

setPaymentForm({invoice:"",amount:"",mode:"Cash"});
setShowRecordModal(false);

};

/* ================= VIEW PAGE ================= */

if(viewPayment){

return(

<div className="vendor-view-container">

<div className="vendor-view-header">

<h2>Crestclimber Software Solutions Private Limited</h2>

<p>
No 5, Station View Road<br/>
Kodambakkam, Tamil Nadu<br/>
Chennai – 600024
</p>

<p>
CIN: U58200TN2024PTC173280 |
GST: 33AAMCC1109R1ZG
</p>

</div>

<div className="vendor-view-meta">

<div>
<b>Invoice :</b> {viewPayment.invoice}
</div>

<div>
<b>Date :</b> {viewPayment.invoiceDate}
</div>

</div>

<div className="vendor-view-section">

<h3>Payment Details</h3>

<p><b>Vendor :</b> {viewPayment.vendor}</p>
<p><b>Invoice :</b> {viewPayment.invoice}</p>
<p><b>Amount :</b> ₹{viewPayment.amount}</p>
<p><b>Balance :</b> ₹{viewPayment.balance}</p>
<p><b>Status :</b> {viewPayment.status}</p>
<p><b>Due Date :</b> {viewPayment.dueDate}</p>

</div>

<div className="vendor-total-box">
<h2>Total Payment : ₹{viewPayment.amount}</h2>
</div>

<br/>

<button
className="vendor-btn-primary"
onClick={()=>setViewPayment(null)}
>
Back
</button>

</div>

);

}

/* ================= MAIN PAGE ================= */

return(

<div className="vendor-page">

<div className="vendor-header">

<div>
<h1>Vendor Payment</h1>
<p>Manage vendor payments and outstanding invoices</p>
</div>

<div className="vendor-header-actions">

<button className="vendor-btn-light">Export</button>

<button className="vendor-btn-light" onClick={()=>setShowBulkModal(true)}>
Bulk Payment
</button>

<button
className="vendor-btn-primary"
onClick={()=>setShowRecordModal(true)}
>
Record Payment
</button>

</div>

</div>

{/* SUMMARY */}

<div className="vendor-summary-cards">

<div className="vendor-summary-card">
<span>Total Outstanding</span>
<strong>₹ {totalOutstanding}</strong>
</div>

<div className="vendor-summary-card">
<span>Overdue</span>
<strong>{overdueCount}</strong>
</div>

<div className="vendor-summary-card">
<span>Pending Approval</span>
<strong>{pendingApproval}</strong>
</div>

</div>

{/* TABS */}

<div className="vendor-tabs">

<button
className={activeTab==="payments"?"vendor-tab active":"vendor-tab"}
onClick={()=>setActiveTab("payments")}
>
Payments
</button>

<button
className={activeTab==="vendors"?"vendor-tab active":"vendor-tab"}
onClick={()=>setActiveTab("vendors")}
>
Vendors
</button>

<button
className={activeTab==="reports"?"vendor-tab active":"vendor-tab"}
onClick={()=>setActiveTab("reports")}
>
Reports
</button>

</div>

{/* PAYMENTS TAB */}

{activeTab==="payments"&&(

<div className="vendor-table-card">

<h3>Vendor Payments</h3>

<table>

<thead>
<tr>
<th>Vendor</th>
<th>Invoice</th>
<th>Due Date</th>
<th>Amount</th>
<th>Balance</th>
<th>Priority</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{payments.map((p,i)=>(

<tr key={i}>

<td>{p.vendor}<br/><small>{p.code}</small></td>

<td>{p.invoice}<br/><small>{p.invoiceDate}</small></td>

<td>{p.dueDate}</td>

<td>₹{p.amount}</td>

<td>₹{p.balance}</td>

<td>{p.priority}</td>

<td>
<span className={`vendor-badge ${
p.status==="Paid"?"success":
p.status==="Overdue"?"danger":"warning"
}`}>
{p.status}
</span>
</td>

<td className="vendor-action-buttons">

{p.balance>0&&(
<button
className="vendor-btn-primary"
onClick={()=>payNow(i)}
>
Pay
</button>
)}

<button
className="vendor-btn-light"
onClick={()=>setViewPayment(p)}
>
View
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>
)}

{/* VENDORS TAB */}

{activeTab==="vendors"&&(

<div className="vendor-table-card">

<h3>Vendor List</h3>

<table>

<thead>
<tr>
<th>Vendor Name</th>
<th>Vendor Code</th>
</tr>
</thead>

<tbody>

{vendors.map((v,i)=>(

<tr key={i}>
<td>{v.name}</td>
<td>{v.code}</td>
</tr>

))}

</tbody>

</table>

</div>

)}

{/* REPORTS TAB */}

{activeTab==="reports"&&(

<div className="vendor-table-card">

<h3>Payment Reports</h3>

<p>Total Outstanding : ₹{totalOutstanding}</p>
<p>Pending Payments : {pendingApproval}</p>
<p>Overdue Payments : {overdueCount}</p>

</div>

)}

{/* RECORD PAYMENT MODAL */}

{showRecordModal&&(

<div className="vendor-modal-overlay">

<div className="vendor-modal">

<h3>Record Payment</h3>

<input
placeholder="Invoice No"
value={paymentForm.invoice}
onChange={e=>setPaymentForm({...paymentForm,invoice:e.target.value})}
/>

<input
placeholder="Amount"
value={paymentForm.amount}
onChange={e=>setPaymentForm({...paymentForm,amount:e.target.value})}
/>

<select
value={paymentForm.mode}
onChange={e=>setPaymentForm({...paymentForm,mode:e.target.value})}
>

<option>Cash</option>
<option>Bank</option>
<option>UPI</option>

</select>

<div className="vendor-modal-actions">

<button
className="vendor-btn-light"
onClick={()=>setShowRecordModal(false)}
>
Cancel
</button>

<button
className="vendor-btn-primary"
onClick={savePayment}
>
Save
</button>

</div>

</div>

</div>

)}

{showBulkModal && (

<div className="vendor-modal-overlay">

<div className="vendor-modal">

<h3>Bulk Payment</h3>

<p>Bulk payment functionality coming soon.</p>

<div className="vendor-modal-actions">
<button
className="vendor-btn-light"
onClick={()=>setShowBulkModal(false)}
>
Close
</button>
</div>

</div>

</div>

)}

</div>

);

};

export default VendorPayment;
import React, { useState } from "react";
import "./expenseFinance.css";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const defaultCompany = {
name: "Crestclimber Software Solutions Private Limited",
address: `No 5, Station View Road
Kodambakkam, Tamil Nadu
Chennai – 600024`,
cin: "U58200TN2024PTC173280",
gst: "33AAMCC1109R1ZG"
};

const Quotation = () => {

const [page,setPage] = useState("list");

const [company,setCompany] = useState(defaultCompany);
const [editCompany,setEditCompany] = useState(false);

const [form,setForm] = useState({
client:"",
date:"",
requirement:"",
terms:""
});

const [items,setItems] = useState([
{desc:"",qty:1,price:0,total:0}
]);

const [includeGST,setIncludeGST] = useState(false);

const [quotations,setQuotations] = useState([]);
const [viewData,setViewData] = useState(null);

const generateNo = () =>{
return "QUO-"+(quotations.length+1).toString().padStart(4,"0");
};

const addItem=()=>{
setItems([...items,{desc:"",qty:1,price:0,total:0}]);
};

const removeItem=(i)=>{
setItems(items.filter((_,index)=>index!==i));
};

const updateItem=(i,key,val)=>{
const data=[...items];
data[i][key]=val;
data[i].total=data[i].qty*data[i].price;
setItems(data);
};

const subtotal = items.reduce((sum,i)=>sum+i.total,0);

const gst = includeGST ? subtotal*0.18 : 0;

const total = subtotal + gst;

const saveQuotation=()=>{

const q={
...form,
company,
no:generateNo(),
items,
subtotal,
gst,
total
};

setQuotations([...quotations,q]);

setForm({
client:"",
date:"",
requirement:"",
terms:""
});

setItems([{desc:"",qty:1,price:0,total:0}]);

setIncludeGST(false);

setPage("list");
};

const deleteQuotation=(i)=>{
setQuotations(quotations.filter((_,index)=>index!==i));
};

const viewQuotation=(q)=>{
setViewData(q);
setPage("view");
};

const editQuotation=(i)=>{
const q=quotations[i];

setForm({
client:q.client,
date:q.date,
requirement:q.requirement,
terms:q.terms
});

setItems(q.items);
setCompany(q.company);

setIncludeGST(q.gst>0);

setPage("create");
};
const downloadPDF = async () => {

const element = document.getElementById("quotationPDF");

const canvas = await html2canvas(element,{
scale:3,
useCORS:true,
backgroundColor:"#ffffff"
});

const imgData = canvas.toDataURL("image/png");

const pdf = new jsPDF("p","mm","a4");

const width = pdf.internal.pageSize.getWidth();
const height = (canvas.height * width) / canvas.width;

pdf.addImage(imgData,"PNG",0,0,width,height);

pdf.save("quotation.pdf");

};
/* LIST */

if(page==="list"){
return(

<div className="quotation-page">

<div className="quotation-header">
<h1>Quotation</h1>

<button
className="quotation-btn-primary"
onClick={()=>setPage("create")}
>
+ Create Quotation
</button>

</div>

<div className="quotation-table-card">

<table>

<thead>
<tr>
<th>No</th>
<th>Client</th>
<th>Date</th>
<th>Total</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{quotations.map((q,i)=>(

<tr key={i}>

<td>{q.no}</td>
<td>{q.client}</td>
<td>{q.date}</td>
<td>₹{q.total}</td>

<td className="quotation-action-buttons">

<button onClick={()=>viewQuotation(q)}>👁</button>

<button onClick={()=>editQuotation(i)}>✏</button>

<button onClick={()=>deleteQuotation(i)}>🗑</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)
}

/* CREATE */

if(page==="create"){
return(

<div className="quotation-page">

<h2>Create Quotation</h2>

<div className="quotation-form-card">

<div className="quotation-section-header">

<h3>From</h3>

<button
className="quotation-btn-light"
onClick={()=>setEditCompany(!editCompany)}
>
{editCompany ? "Save" : "Edit"}
</button>

</div>

{!editCompany ? (

<div className="quotation-company-view">

<p><b>{company.name}</b></p>

<p style={{whiteSpace:"pre-line"}}>{company.address}</p>

<p>CIN: {company.cin}</p>
<p>GST: {company.gst}</p>

</div>

) : (

<div>

<input
value={company.name}
onChange={(e)=>setCompany({...company,name:e.target.value})}
/>

<textarea
value={company.address}
onChange={(e)=>setCompany({...company,address:e.target.value})}
/>

<input
value={company.cin}
onChange={(e)=>setCompany({...company,cin:e.target.value})}
/>

<input
value={company.gst}
onChange={(e)=>setCompany({...company,gst:e.target.value})}
/>

</div>

)}

</div>

<div className="quotation-form-card">

<input
placeholder="Client Name"
value={form.client}
onChange={(e)=>setForm({...form,client:e.target.value})}
/>

<input
type="date"
value={form.date}
onChange={(e)=>setForm({...form,date:e.target.value})}
/>

<textarea
placeholder="Requirement"
value={form.requirement}
onChange={(e)=>setForm({...form,requirement:e.target.value})}
/>

</div>

<div className="quotation-form-card">

<h3>Hardware Items</h3>

<table>

<thead>
<tr>
<th>#</th>
<th>Description</th>
<th>Qty</th>
<th>Price</th>
<th>Total</th>
<th></th>
</tr>
</thead>

<tbody>

{items.map((item,i)=>(

<tr key={i}>

<td>{i+1}</td>

<td>
<input
value={item.desc}
onChange={(e)=>updateItem(i,"desc",e.target.value)}
/>
</td>

<td>
<input
type="number"
value={item.qty}
onChange={(e)=>updateItem(i,"qty",Number(e.target.value))}
/>
</td>

<td>
<input
type="number"
value={item.price}
onChange={(e)=>updateItem(i,"price",Number(e.target.value))}
/>
</td>

<td>₹{item.total}</td>

<td>

{items.length>1 && (

<button
className="quotation-delete-btn"
onClick={()=>removeItem(i)}
>
✖
</button>

)}

</td>

</tr>

))}

</tbody>

</table>

<button className="quotation-btn-light" onClick={addItem}>
+ Add Item
</button>

<div className="quotation-summary-box">

<p>Subtotal : ₹{subtotal}</p>

<button
className="quotation-btn-light"
onClick={()=>setIncludeGST(!includeGST)}
>
{includeGST ? "Remove GST" : "Add GST (18%)"}
</button>

{includeGST && (
<p>GST (18%) : ₹{gst}</p>
)}

<h3>Total : ₹{total}</h3>

</div>

</div>

<div className="quotation-form-card">

<textarea
placeholder="Terms & Conditions"
value={form.terms}
onChange={(e)=>setForm({...form,terms:e.target.value})}
/>

</div>

<button
className="quotation-btn-primary"
onClick={saveQuotation}
>
Save Quotation
</button>

</div>

)
}

/* VIEW */

if(page==="view"){

const q=viewData;

return(

<div id="quotationPDF" className="quotation-container">

<div className="quotation-view-header">

<h2>{q.company.name}</h2>

<p style={{whiteSpace:"pre-line"}}>{q.company.address}</p>

<p>CIN: {q.company.cin} | GST: {q.company.gst}</p>

</div>

<div className="quotation-meta">

<p><b>Quotation No :</b> {q.no}</p>
<p><b>Date :</b> {q.date}</p>

</div>

<div className="quotation-section">

<h3>Client</h3>
<p>{q.client}</p>

</div>

<div className="quotation-section">

<h3>Requirement</h3>
<p>{q.requirement}</p>

</div>

<div className="quotation-section">

<h3>Hardware Scope</h3>

<table>

<thead>
<tr>
<th>#</th>
<th>Description</th>
<th>Qty</th>
<th>Price</th>
<th>Total</th>
</tr>
</thead>

<tbody>

{q.items.map((it,i)=>(

<tr key={i}>
<td>{i+1}</td>
<td>{it.desc}</td>
<td>{it.qty}</td>
<td>₹{it.price}</td>
<td>₹{it.total}</td>
</tr>

))}

</tbody>

</table>

<div className="quotation-total-box">

<p>Subtotal : ₹{q.subtotal}</p>
<p>GST : ₹{q.gst}</p>

<h2>Total : ₹{q.total}</h2>

</div>

</div>

<div className="quotation-section">

<h3>Terms & Conditions</h3>
<p>{q.terms}</p>

</div>

<button
className="quotation-btn-primary no-print"
onClick={downloadPDF}
>
Download PDF
</button>

<button
className="quotation-btn-light no-print"
onClick={()=>setPage("list")}
>
Back
</button>

</div>

)
}

};

export default Quotation;
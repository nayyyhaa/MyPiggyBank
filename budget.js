 //take a num, which starts from 0
 let totalExpense=0;
 let totalIncome=0;
 let totalBalance=0;     
 //take header elem
 const headerElement=document.querySelector("#headerItem");
 const headerIncomeElement=document.querySelector("#headerIncome");
 const headerExpenseElement=document.querySelector("#headerExpense");
 document.mainForm.onclick = function(){
 var selectedOption = document.querySelector('input[name = sourceType]:checked').value;
 
 //get btn element
 const element=document.querySelector("#btnSelector");
 //Listen to click event
 element.addEventListener("click",addExpense(selectedOption),false);
 }
 //get  btn element
  const inputElement=document.querySelector("#inputAmount");
 //get desc
 const inputDesc=document.querySelector("#inputDescp");
 //assign total expense to header
 //get table item
 const tableElem=document.querySelector("#tableItem");
 headerIncomeElement.textContent=totalIncome;
 headerExpenseElement.textContent=totalExpense;
 headerElement.textContent=totalBalance;
 //create arr
 let arrTotal=[];
 //create increment function
 function addExpense(selectedOption){
     const textAmount=inputElement.value;
     const textDesc=inputDesc.value;

     //if textAmount and textDesc isnot empty
     if(textAmount != "" && textDesc !=""){
         //remove labels
         inputElement.classList.remove("is-invalid");
         inputDesc.classList.remove("is-invalid");

         //convert to int
         const expense=parseInt(textAmount,10);
         //assign to 1 obj

         //check of amount is number
         if(!isNaN(expense)){
             const obj={};
             obj.desc=textDesc;
             obj.expense=textAmount;
             obj.moment=new Date();

             //assign to array   
             arrTotal.push(obj); 
             if(selectedOption=='incomeType'){
                 totalIncome=totalIncome+expense;
             }
             else{
                 totalExpense=totalExpense+expense;
             }
             //add to total
             totalBalance=totalIncome-totalExpense;
             //set the heading element
             updateTotal();
             renderListView(arrTotal);
             inputElement.value = "";
             inputDesc
             .value = "";
             }else {
                 inputElement.classList.add("is-invalid");
             }
     }else{   
         inputElement.classList.add("is-invalid");
         inputDesc.classList.add("is-invalid");
     }
 }
     
     //console.log(showItemHTML);
     // //get items

     // const a1=arrTotal[0];
     // const a2=arrTotal[1];
     // const d1=`desc: ${a1.desc} | amount: ${a1.expense}`
     // const d2=`desc: ${a2.desc} | amount: ${a2.expense}`

     // //html
     // const showTemp=`
     // <div>${d1}</div>
     // <div>${d2}</div>
     // `


    //controllerlayer

    //get date
    function getDateString(momento){
        return momento.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
    }

    function deleteItem(dateString,expense){
         let newArrList=[];
         for(let i=0;i<arrTotal.length;i++){
             if(arrTotal[i].moment.valueOf()!==dateString){
                 newArrList.push(arrTotal[i]);
             }
         }
         renderListView(newArrList);
         totalBalance-=expense;
         updateTotal();
     }

     function updateTotal(){
         let someText = `Total: ${totalBalance}₹`;
         headerElement.textContent = someText;
         headerIncomeElement.textContent = `Total Income: ${totalIncome}₹`;
         headerExpenseElement.textContent= `Total Expense: ${totalExpense}₹`;
     }

     function renderListView(arrayOfList){
         //arr of obj to arr of string by map.
         //const showItem=arrTotal.map(item=>{return `<div> descp:${item.desc} :: amount:${item.expense}<div>`})
         const showItemHTML=arrayOfList.map(item=>viewTable(item));
         const joinedShowItemHTML=showItemHTML.join('');    
         //print
         tableElem.innerHTML=joinedShowItemHTML;
         arrTotal=arrayOfList;
     }
     //view layer
     function viewTable({ desc, expense, moment }) {
         return `
             <li class="list-group-item d-flex justify-content-between">
                     <div class="d-flex flex-column">
                         ${desc}
                         <small class="text-muted">${getDateString(moment)}</small>
                     </div>
                     <div>
                         <span class="px-5">
                             ${expense}₹
                         </span>
                         <button 
                             type="button" 
                             class="btn btn-outline-danger btn-sm"
                             onclick="deleteItem(${moment.valueOf()},${expense})"
                             >
                             <i class="fas fa-trash-alt"></i>
                         </button>
                     </div>
                 </li>
             `;
     }

    
//     //o/p in console
//     console.table(arrTotal)

    
     
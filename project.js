
function saveToLocalStorage(event){
    event.preventDefault();
    let sellingPrice=event.target.sellingPrice.value;
    let productName=event.target.productName.value;
    let category=event.target.category.value;
    let obj={
        sellingPrice : sellingPrice,
        productName : productName,
        category : category
}
    localStorage.setItem(productName,JSON.stringify(obj));
    axios.post("https://crudcrud.com/api/dfbcf638374c43f3aab9f45996ebc0a2/sellerAdmin",obj).then((res)=>{
    console.log(res); 
    }).catch((err)=>{
        console.log(err);
    })
    
    showUserOnScreen(obj);
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/dfbcf638374c43f3aab9f45996ebc0a2/sellerAdmin").then((res)=>{
     for(let i=0;i<res.data.length;i++){
        showUserOnScreen(res.data[i]);
     }   

    }).catch(err=>console.log(err))
})
function showUserOnScreen(obj){
    const parentEl=document.getElementById("Prod_div")
    const childEl=document.createElement('li')
    childEl.textContent=`${obj.category}-${obj.sellingPrice} - ${obj.productName}`;
    const button=document.createElement('input')
    button.type='button';
    button.value='delete';
    button.onclick=()=>{
        axios.delete(`https://crudcrud.com/api/dfbcf638374c43f3aab9f45996ebc0a2/sellerAdmin/${obj._id}`
        ).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
        parentEl.removeChild(childEl);

    };
    const EditButton=document.createElement("input");
    EditButton.type="Button";
    EditButton.value="Edit";
    EditButton.onclick=()=>{
        localStorage.removeItem(obj.sellingPrice);
        axios.delete(`https://crudcrud.com/api/dfbcf638374c43f3aab9f45996ebc0a2/sellerAdmin/${obj._id}`).then((response)=>{
            console.log(response);
        }).catch((err)=>{
            console.log(err);
        })
        parentEl.removeChild(childEl);
       
        document.getElementById("category").value=obj.category;
        document.getElementById("productName").value=obj.productName;
        document.getElementById("sellingPrice").value=obj.sellingPrice;
    };
    childEl.appendChild(button);
    childEl.appendChild(EditButton);
    parentEl.appendChild(childEl);

}
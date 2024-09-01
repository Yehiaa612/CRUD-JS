
var productName=document.getElementById("pn");
var productPrice=document.getElementById("pp");
var productCategory=document.getElementById("pc");
var productDescription=document.getElementById("pd");
var allProducts = [];
if (localStorage.getItem('allProducts')!=null) {
    allProducts=(JSON.parse(localStorage.getItem('allProducts')) );
    displayAllProduct();
}
var addButton=document.getElementById("addButton");
var updateButton=document.getElementById("updateButton");
var temp;
var mood = 'Add';

function addNewProudct(){
    if(nameValidation()== priceValidation()==categoryValidation()==descriptionValidation()==true) {
        Proudct={
            name: productName.value,
            price: Number(productPrice.value) ,
            category: productCategory.value,
            description: productDescription.value
        }
        if(mood==='Add'){
            allProducts.push(Proudct);
            localStorage.setItem('allProducts',JSON.stringify(allProducts));
        }
        else{
            allProducts[temp]= Proudct ;
            localStorage.setItem('allProducts',JSON.stringify(allProducts));
            mood='Add';
            addButton.innerHTML='Add';
    
        }
        console.log(allProducts);
        clearInput();
        displayAllProduct()
        nameError.style.display='none';
        priceError.style.display = 'none';
        descriptionError.style.display = 'none';
        categoryError.style.display = 'none';
    }


}



function clearInput() {
    productName.value="";
    productPrice.value=""; 
    productCategory.value="";
    productDescription.value=""; 
}
function displayAllProduct() {
    var temp="";
    for (var i = 0; i < allProducts.length; i++) {
        temp+=`
        <tr>
        <td>${allProducts[i].name}</td>
        <td>${allProducts[i].price}</td>
        <td>${allProducts[i].category}</td>
        <td>${allProducts[i].description}</td>
        <td><button onclick="ShowUpdateProduct(${i})" class="btn btn btn-warning"> update </button></td>
        <td><button onclick="deleteProudct(${i})" class="btn btn btn-danger"> delete </button></td>
        </tr>
        `; 
        
    }
    
    document.getElementById("tbody").innerHTML=temp ;
}
function deleteProudct(dindex) {
    console.log("deleted..");
    allProducts.splice(dindex,1); 
    localStorage.setItem('allProducts',JSON.stringify(allProducts));
    displayAllProduct();  
 
}
function searchElement(term) {
    var temp="";
    for (var i = 0; i < allProducts.length; i++) {
          if (allProducts[i].name.toLowerCase().includes(term.toLowerCase()) === true) {
            temp+=`        
        <tr>
        <td>${allProducts[i].name}</td>
        <td>${allProducts[i].price}</td>
        <td>${allProducts[i].category}</td>
        <td>${allProducts[i].description}</td>
        <td><button onclick="ShowUpdateProduct(${i})" class="btn btn btn-warning"> update </button></td>
        <td><button onclick="deleteProudct(${i})" class="btn btn btn-danger"> delete </button></td>
        </tr>
        `; 
          }  
          document.getElementById("tbody").innerHTML=temp ;
    }
}
function editProduct(i) {
    productName.value=i.name;
    productPrice.value=i.price; 
    productCategory.value=i.category;
    productDescription.value=i.description;
    
}
function ShowUpdateProduct(i) { 
    // addButton.classList.add('d-none');
    // updateButton.classList.remove('d-none');
    addButton.innerHTML='Update'
    editProduct(allProducts[i]);
    console.log(allProducts[i]);  
    temp=i;
    mood='update'; 
}

function updatedProduct() {
    addNewProudct()    
}


  


    function nameValidation() {
        var nameValidation=/^[A-Z][a-z]{3,}$/;
        if (nameValidation.test(productName.value)) {
            return true ; 
        }
        else{
            var nameError = document.getElementById('nameError');
            nameError.textContent = 'Name must start with an uppercase letter and have at least 4 characters.';
            nameError.style.display = 'inline';
            productName.value="";

        }

    }
    function priceValidation() {
        var priceValidation=/^(?:[1-9][0-9]{0,3}|10000)$/;
        if (priceValidation.test(productPrice.value)) {
            return true ; 
            
        }
        else{
            var priceError = document.getElementById('priceError');
            priceError.textContent ='number must be between 1:1000';
            priceError.style.display = 'inline';
            productPrice.value="";

        }
    }
    function categoryValidation() {
        var categoryValidation=/^(Drinks|Foods)/;
        if (categoryValidation.test(productCategory.value)) {
            return true ; 
        }
        else{
            var categoryError = document.getElementById('categoryError');
            categoryError.textContent =' must be Drinks or Foods ';
            categoryError.style.display = 'inline';
            productCategory.value="";
        }
    }

    function descriptionValidation() {
        var descriptionValidation=/^.{1,500}$/;
        if (descriptionValidation.test(productDescription.value)) {
            return true ; 
        }
        else{
            var descriptionError = document.getElementById('descriptionError');
            descriptionError.textContent ='minimum letter must be between 1:500 letters';
            descriptionError.style.display = 'inline';
            productDescription.value="";

        }


    }

    






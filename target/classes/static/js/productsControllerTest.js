//Hardcoded items productsController.js

//development API
//const addAPI= 'http://localhost:8080/product/add';
//const displayAPI = 'http://localhost:8080/product/all';

const addAPI = 'https://ikigai.mysql.database.azure.com/product/add';
const displayAPI = 'https://ikigai.mysql.database.azure.com/product/all';
let productsController = [];

//retrieve querystring from url products?category=**
//https://www.sitepoint.com/get-url-parameters-with-javascript/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const filterProductByCategory = urlParams.get('category') //
//filterProductByCategory will be whatever value assigned to after ?category=
//end of querystring


//function for using  database
function loadDataViaAPI() {

    fetch(displayAPI)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log("Test log for loadDataViaAPI")
            console.log(data);

            data.forEach(function (product) {
                const productObj = {
                    id: product.idProduct, //not implemented yet
                    type: product.productType,
                    name: product.productName,
                    description: product.productDescription,
                    price: product.productPrice,
                    imageURL: product.productImage
                };
                productsController.push(productObj);
            });
            //magick
            if (filterProductByCategory) {
                 filterCategory(filterProductByCategory)

            } else {
            displayProduct(productsController);
            }
          })
            .catch(function(error) {
            console.log(error);
            });
}

//Whatever string thrown into parameter will be the string we got from the end of the url of ?category=
function filterCategory(categoryType) {
    const filter = productsController.filter(c => c.type == categoryType);
    displayProduct(filter);
//query to change header text
    document.getElementById('featured').innerHTML = categoryType;
}


 //scrollTo
 function filterSearchFor(value) {
     const filter = productsController.filter(c => c.type == value);
     displayProduct(filter);
 //query to change header text
     document.getElementById('featured').innerHTML = value;
 }
function filterSearchForFeatured() {
     const filterFeatured = productsController.filter(c => c.id > 32);
     displayProduct(filterFeatured);
     document.getElementById('featured').innerHTML = "Featured";
}


function displayProduct(showProduct) {
    let display = "";

    console.log("aaa: " + showProduct);

    for (let i = 0; i < showProduct.length; i++) {
        display += `
         <div class="col-xm-12 col-sm-6 col-md-6 col-lg-6 col-xl-3">
                  <div class="wsk-cp-product">
                    <div class="wsk-cp-img">
                      <img src=${showProduct[i].imageURL}
                        alt="Product" class="img-responsive" />
                    </div>
                    <div class="wsk-cp-text">
                      <div class="category">
                        <span>${showProduct[i].name}</span>
                      </div>
                      <div class="title-product">
                        <h3>${showProduct[i].type}</h3>
                      </div>
                      <div class="description-prod">
                        <p>${showProduct[i].description}</p>
                      </div>
                      <div class="card-footer">
                        <div class="wcf-left"><span class="price">SGD ${showProduct[i].price}</span></div>
                        <div class="wcf-right"><a href="#" class="buy-btn"><i class="zmdi zmdi-shopping-basket"></i></a></div>
                      </div>
                    </div>
                  </div>
                </div>`
    }
    document.querySelector(".row").innerHTML = display;
    console.log("Item Populated");
}



//
//function displayDetails(index) {
//        document.querySelector("#productType").value;
//        document.querySelector('#productName').value;
//        document.querySelector('#productPrice').value
//}

//function for using database
//type, name, description, price, imageUrl, storeImage
function addDataViaAPI(productType, productName, productDescription,productPrice, productImage,storeImage) {
    const formData = new FormData();
    formData.append('productType', productType)
    formData.append('productName', productName)
    formData.append('productDescription', productDescription)
    formData.append('productPrice', productPrice)
    formData.append('productImage', productImage)
    formData.append('imagefile', storeImage)

     fetch(addAPI, {
            method: 'POST',
            body: formData
            })
            .then(function(response) {
                console.log(response.status); // Will show you the status
                if (response.ok) {
                    alert("Successfully Added Product!")
                }
                else {
                   alert("Something went wrong. Please try again")
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert("Error adding item to Product")
            });
    }


//function addProductForm() {
//    const productType = document.querySelector('#productType').value;
//    const productName = document.querySelector('#productName').value;
//    const productDescription = document.querySelector('#productDescription').value;
//    const color = document.querySelector('#color').value;
//    const productPrice = document.querySelector('#productPrice').value;
//    const imageURL = "test";
//
//    addProduct(productType, productName, productDescription, color, productPrice, imageURL);
//
//}
//
//
//
//
//function addProduct(t, n, d, c, p, i) {
//
//    //The parameters will be sent in from another function through the arguments
//    //1) Construct/Create the object
//    //   property: value
//    const ProductItem = {
//        type: t,
//        name: n,
//        desc: d,
//        color: c,
//        price: p,
//        imageURL: i
//    }
//
//    productArray.push(ProductItem);
//
//    console.log(productArray);
//    // displayProduct();
//}

//function displayDetails(index) {
//    //When user clicks on any "More" button, the details of the selected product will be displayed
//    document.querySelector("#modalName").innerHTML = productArray[index].name;
//    document.querySelector("#modalType").innerHTML = productArray[index].type;
//    document.querySelector("#modalPrice").innerHTML = productArray[index].price;
//    document.querySelector("#modalColor").innerHTML = productArray[index].color;
//    document.querySelector("#modalDesc").innerHTML = productArray[index].desc;
//    document.querySelector("#modalImg").src = productArray[index].imageURL;
//}
// New stuff here
//  let dropDown = document.getElementById("dropDownList");
//  dropDown.addEventListener("change", sortBagsBy);

//  function sortBagsBy(event) {
//     if (dropDown.value == "1"){
//         console.log("Works");
//     } else if (dropDown.value == "2") {
//         console.log("Option 2 works");
//     } else if (dropDown.value == "3") {
//         console.log("Option 3 works too");
//     }
//  }
// //SORTING FILTER
// let dropdown = document.getElementById("dropDownList");
// dropdown.addEventListener("change", () => {
//     let value = dropdown.value;
//     if (value == "1") {
//         console.log("It only does nothing!");
//     } else if (value == "Name") {
//         filterByName();
//         displayProduct();
//     } else if (value == "Price") {
//         filterByPrice();
//         displayProduct();
//     }
// });

// productArray.sort(function (a, b) {
//     return parseFloat(a.price) - parseFloat(b.price);
// })



function filterByName() {
    productArray.sort(function(a, b) {
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      });
}

function filterByPrice() {
    productArray.sort(function(a, b) {
        if (a.price > b.price) {
          return 1;
        } else {
          return -1;
        }
      });
}
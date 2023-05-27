//Global variable - to store the image object
let storeImage = ""


//When user clicks on 'Save Item':
//1) store all the inputs into variables
//2) do validation
//3) calls a function from the productController.js to access the API to add items to the database


//Add an 'onsubmit' event listener for productform to add a product
newItemForm.addEventListener('submit', (event) => {


  // Prevent default action of the Form submission
  event.preventDefault();


  //1) Select the inputs
  const type = document.querySelector('#productType').value;
  const name = document.querySelector('#productName').value;
  const description = document.querySelector('#productDescription').value;
    const price = document.querySelector('#productPrice').value;

  //Browser security will not be able to track/store the actual path of where you choose your image
  // C:/Users/Desktop/t-shirt_new.jpg
  //C:\fakepath\t-shirt_new.jpg
  //console.log(document.querySelector('#newItemImageFile').value + '\n' + "Hello world");


  const imageUrl = document.querySelector('#imageURL').value.replace("C:\\fakepath\\", "");



  /* 2)
      Do the Validation code here
  */


  // 3)  calls a function from the productController.js to access the API to add items to the database
  addDataViaAPI(type, name, description, price, imageUrl, storeImage);  //arguments


});




// select file input
const input = document.querySelector('#imageURL');
// add event listener
input.addEventListener('change', () => {
  storeImage = input.files[0]; //array of files for us to access
});

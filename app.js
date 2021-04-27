let names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast',
  'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon',
  'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun',
  'unicorn', 'usb', 'water-can', 'wine-glass'];

let leftImage = document.getElementById('leftImage');
let middleImage = document.getElementById('middleImage');
let rightImage = document.getElementById('rightImage');
let finalResults =document.getElementById('finalResults');
let viewResult =document.getElementById('viewResult');

console.log(leftImage);
console.log(middleImage);
console.log(rightImage);

Product.all = [];

function Product(pName) {
  this.productName = pName;
  this.imagePath = '';
  this.views = 0;
  this.clicks = 0;
  Product.all.push(this);
}
Product.prototype.getItemPath = function(){
if(this.productName==='usb'){
  this.imagePath=`assests/${this.productName}.gif`;
}else if(this.productName==='sweep'){
  this.imagePath=`assests/${this.productName}.png`;
}
else{
  this.imagePath=`assests/${this.productName}.jpg`;

}
}
for (let i = 0; i < names.length; i++) {
 let item= new Product(names[i]);
 item.getItemPath();
}

//console.log(Product.all);




function render() {

  do{ 
   leftProduct = Product.all[randomNumber(0, Product.all.length - 1)];
   middleProduct = Product.all[randomNumber(0, Product.all.length - 1)];
   rightProduct = Product.all[randomNumber(0, Product.all.length - 1)]; }
  while(leftProduct===middleProduct||leftProduct===rightProduct||middleProduct===rightProduct);
  
  // console.log(leftProduct);
  // console.log(middleProduct);
  // console.log(rightProduct);

  leftImage.setAttribute('src', leftProduct.imagePath);
  leftImage.setAttribute('alt', leftProduct.productName);
  leftImage.setAttribute('title', leftProduct.productName);

  middleImage.setAttribute('src', middleProduct.imagePath);
  middleImage.setAttribute('alt', middleProduct.productName);
  middleImage.setAttribute('title', middleProduct.productName);

  rightImage.setAttribute('src', rightProduct.imagePath);
  rightImage.setAttribute('alt', rightProduct.productName);
  rightImage.setAttribute('title', rightProduct.productName);
}
render();

let totalClicks = 0;


let imagesSection = document.getElementById('mainContent');
imagesSection.addEventListener('click', handleClickonProduct);

function handleClickonProduct(event) {
  
  console.log(event.target.id);

  if (totalClicks < 25) {
    if (event.target.id !== 'imagesSection') {
      totalClicks++;
      //console.log(totalClicks);

      leftProduct.views++;
      middleProduct.views++;
      rightProduct.views++;
    
      
    
      if (event.target.id === 'leftImage') {
        leftProduct.clicks++;
      }
      if (event.target.id === 'centerImage') {
        middleProduct.clicks++;
      }
      if (event.target.id === 'rightImage') {
        rightProduct.clicks++;
      }
    
    }
    render();
    sendToStorage();
    
  }


  //createChartSummary();
} 
let productsArrLS ;
function sendToStorage(){
  let totalNumOfClicks = JSON.stringify(totalClicks);
  localStorage.setItem('Number of clicks', totalNumOfClicks);

  productsArrLS = JSON.stringify(Product.all);
  localStorage.setItem('Products Array of objects', productsArrLS);

  localStorage.setItem('Products Array of objects', JSON.stringify(Product.all));

}

function getFromStorage(){
  let clicksTotalNumber = localStorage.getItem('Number of clicks');
  totalClicks= JSON.parse(clicksTotalNumber);
  
  if(productsArrLS){
    Product.all = JSON.parse(localStorage.getItem('Products Array of objects'));
    render();
  }
}

getFromStorage();
function viewResSummary(event){
    for (let i = 0; i < Product.all.length; i++){
        let liE = document.createElement('li');
        finalResults.appendChild(liE);
        liE.textContent=`${Product.all[i].productName} had a ${Product.all[i].clicks} vootes and was seen ${Product.all[i].views} views`

    }
    createChartSummary();
viewResult.removeEventListener('click',viewResSummary);
}
viewResult.addEventListener('click',viewResSummary);



function createChartSummary() {
  let productsArr = [];
  let clicksArr = [];
  let viewsArr = [];
  for (let i = 0; i < Product.all.length; i++) {
    productsArr.push(Product.all[i].productName);
    viewsArr.push(Product.all[i].views);
    clicksArr.push(Product.all[i].clicks);
  }
 
  let ctx = document.getElementById('barChart').getContext('2d');
  let barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productsArr,
      datasets: [{
        label: '# of clicks',
        data: clicksArr,
        backgroundColor:
          'rgba(100, 200, 150, 0.2)',
        borderColor:
          'rgba(100, 200, 150, 1)',
        borderWidth: 2
      },
      {
        label: '# of Views',
        data: viewsArr,
        backgroundColor:
          'rgba(200, 100, 150, 0.2)',
        borderColor:
          'rgba(200, 100, 150, 1)',
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}


function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
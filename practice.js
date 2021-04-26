let productName = ['bag', 'banana', 'bathroom', 'boots', 'breakfast',
  'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon',
  'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun',
  'unicorn', 'usb', 'water-can', 'wine-glass'];
  const mainContent = document.getElementById('mainContent');
  const leftImage = document.getElementById('leftImage');
  const middleImage = document.getElementById('middleImage');
  const rightImage = document.getElementById('rightImage');
  let leftImageIndex=0;
  let centerImageIndex=0;
  let rightImageIndex=0;
  let attempt=25;
  let clickNum=0;

  Product.all=[];
  function Product (pName){
      pName=this.name;
      this.path='';
      this.views=0;
      this.clicks=0;
      Product.all.push(this);
  }
  for(let i =0; i<productName.length;i++){
    new Product(i);
  }
  Product.prototype.imgPath=function(){
      if(this.name=='sweep'){
          this.path=`assets/${this.name}.png`;
      }else if(this.name=='usb'){
          this.path=`assets/${this.name}.gif`;
      }else {
        this.path=`assets/${this.name}.jpg`;
      }
  }
  
  function renderFunction(){
      let leftRandom=getRandomInt(0,productName.length-1);
      let centerRandom;
      let rightRandom;
      do{
         centerRandom=getRandomInt(0,productName.length-1);
         rightRandom=getRandomInt(0,productName.length-1);
      }
      while(leftRandom==centerRandom||leftRandom==rightRandom||centerRandom==rightRandom);

      leftImage.src=Product.all[leftRandom].path;
      middleImage.src=Product.all[centerRandom].path;
      rightImage.src=Product.all[rightRandom].path;

      leftImageIndex=leftRandom;
      centerImageIndex=centerRandom;
      rightImageIndex=rightRandom;

      Product.all[leftRandom].views;
      Product.all[centerRandom].views;
      Product.all[rightRandom].views;
  }
  console.log( Product.all);
 
  function clickEvent(event){
    if((event.target.id=='leftImage'||event.target.id=='middleImage'||event.target.id=='rightImage')&&clickNum<attempt){
      if(event.target.id=='leftImage'){
        Product.all[leftImageIndex].clicks++;
      }
      if(event.target.id=='middleImage'){
        Product.all[centerImageIndex].clicks++;
      }
      if(event.target.id=='rightImage'){
        Product.all[rightImageIndex].clicks++;
      }
      clickNum++;
      renderFunction()
    }

  }
  mainContent.addEventListener('click',clickEvent)
  renderFunction();

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  
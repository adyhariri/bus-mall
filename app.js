let productName = ['bag', 'banana', 'bathroom', 'boots', 'breakfast',
  'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon',
  'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun',
  'unicorn', 'usb', 'water-can', 'wine-glass'];
  const mainContent = document.getElementById('mainContent');
  const leftImage = document.getElementById('leftImage');
  const middleImage = document.getElementById('middleImage');
  const rightImage = document.getElementById('rightImage');
  Product.all=[];
  function Product (pName){
      this.name=pName;
      this.path='';
      this.views=0;
      this.clicks=0;
      Product.all.push(this);
  }
  Product.prototype.imgPath=function(){
      if(this.name=='sweep'){
          this.path=`./assets/${this.name}.png`;
      }else if(this.name=='usb'){
          this.path=`./assets/${this.name}.gif`;
      }else {
        this.path=`./assets/${this.name}.jpg`;
      }
  }
  Product.prototype.renderFunction=function(){
      let random=getRandomInt(0,productName.length-1)
  }


  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  
let imgs = ['1', '2', '3', '4', '5', '6'];
let i = Math.floor((Math.random() * 100) + 1)%5;
let path = '/Img/winter/bg'

document.body.style.backgroundImage = 'url("' + path + imgs[i] + '.jpg")';

setInterval(()=>{
  document.body.style.backgroundImage = 'url("' + path + imgs[i] + '.jpg")';
  ++i;
  if(i >= imgs.length)
    i = 0;
}, 8000)
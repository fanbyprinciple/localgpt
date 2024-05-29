let counter = 1;
const numberOfImages = document.getElementsByClassName("imgCheck").length
setInterval(function(){
  document.getElementById('s' + counter).checked = true;
  counter++;
  if(counter > numberOfImages){
    counter = 1;
  }
}, 4000);
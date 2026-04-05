
function result(){
let inputValue = document.getElementById('inputData').value;

let displayHeading=document.getElementById('text');

displayHeading.innerHTML=inputValue;
displayHeading.style.color="red"

//change 
document.getElementsByTagName('body')[0].style.backgroundColor="green";
}

// addEventListener method

let paraBkg=document.getElementById('para');
function(colorChange){
  paraBkg.style.backgroundColor="#"+(Math.random() * 0xFFFFFF << 0).toString(16);

}
para

const clickC = document.querySelector(".desc");

clickC.addEventListener ("click", function (){
  const r = Math.round(Math.random() * 255 + 0);
  const g = Math.round(Math.random() * 255 + 0);
  const b = Math.round(Math.random() * 255 + 0);
  
  document.body.style.backgroundColor = 'rgb('+ r +','+ g +','+ b +')';
});
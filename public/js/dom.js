const btn = document.getElementById("btn");
const result = document.getElementById("result");

btn.addEventListener("click", function(e) {
  const inputlang = document.getElementById("inputlang");
  let inputvalue = inputlang.value;

  e.preventDefault();
  if (inputlang.value.trim() == "") {
    alert("Please Enter Name");
    return;
  }

  feachApi(inputvalue, "POST", "/search", function(arr) {
    arr.items.forEach(element => {
        console.log(element.title);
        
    
    });
});
})
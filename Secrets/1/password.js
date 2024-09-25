var Sigma = document.getElementById("Sigma");
var Enter = document.getElementById("Enter");
var Pass = document.getElementById("Pass");
var Clear = document.getElementById("Clear");

Enter.addEventListener("click", function(){
    if(Sigma.value == "qwertyuiop123!"){
        Pass.textContent = "The Screen Time Code is 0814";
    } else{
        alert("Incorrect");
    }
});

Clear.addEventListener("click", function(){
    Pass.textContent = "Vault 2.0";
    Sigma.value = "";
});

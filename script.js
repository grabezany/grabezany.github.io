var Data = {
    Money: 0,
    Mps: 0,
    Clickers: {Cost: 10, Owned: 0},
    Bankers: 0,
    Banks: 0
}

var Money = document.getElementById("Money");
var Cash = document.getElementById("MoneyStored");

var ClickerUpg = document.getElementById("ClickerUpg");

Money.addEventListener("click", function(){
    Data.Money += 1;
    Cash.textContent = "$"+Data.Money;
});

ClickerUpg.addEventListener("click", function(){
    if(Data.Money >= Data.Clickers.Cost){
        Data.Money -= Data.Clickers.Cost;
    }
});
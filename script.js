var Data = {
    Money: 0,
    Mps: 0,
    Clickers: {Cost: 10, Owned: 0},
    Bankers: {Cost: 1000, Owned: 0},
}

var Money = document.getElementById("Money");
var Cash = document.getElementById("MoneyStored");
var MoneyPerSecond = document.getElementById("MoneyPerSecond");

var ClickerUpg = document.getElementById("ClickerUpg");
var ClickerDisplay = document.getElementById("ClickerDisplay");
var ClickerCost = document.getElementById("ClickerCost");

Money.addEventListener("click", function(){
    Data.Money += 1;
    Cash.textContent = "$"+Data.Money.toFixed(1);
});

ClickerUpg.addEventListener("click", function(){
    if(Data.Money >= Data.Clickers.Cost){
        Data.Money -= Data.Clickers.Cost;
        Data.Clickers.Cost = Data.Clickers.Cost * rando(10, 50);
        Data.Clickers.Owned += 1;
        ClickerDisplay.innerText = "Owned: " + Data.Clickers.Owned;
        ClickerCost.innerText = "$" + Data.Clickers.Cost;
        Cash.textContent = "$"+Data.Money.toFixed(1);
        Data.Mps += 0.1;
        MoneyPerSecond.textContent = "$"+Data.Mps.toFixed(1) + " Per Second";
    }
});


setInterval(function(){
    Data.Money += Data.Mps;
    Cash.textContent = "$"+Data.Money.toFixed(1);;
}, 1000);

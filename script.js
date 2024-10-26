var Data = {
    Money: 0,
    Mps: 0,
    Stocks: {
        Dirt: {Owned: 0, Cost: 5000}
    },
    Clickers: {Cost: 10, Owned: 0},
    Bankers: {Cost: 1000, Owned: 0},
}

var Money = document.getElementById("Money");
var Cash = document.getElementById("MoneyStored");
var MoneyPerSecond = document.getElementById("MoneyPerSecond");

var ClickerUpg = document.getElementById("ClickerUpg");
var ClickerDisplay = document.getElementById("ClickerDisplay");
var ClickerCost = document.getElementById("ClickerCost");

var BankerUpg = document.getElementById("BankerUpg");
var BankerDisplay = document.getElementById("BankerDisplay");
var BankerCost = document.getElementById("BankerCost");

var Save = document.getElementById("Save");
var Load = document.getElementById("Load");

//DIRT
DirtInvest = document.getElementById("DirtInvest");
DirtSell = document.getElementById("DirtSell");
DirtValue = document.getElementById("DirtValue");
DirtOwned = document.getElementById("DirtOwned");

DirtInvest.addEventListener("click", function(){
    if(Data.Money >= Data.Stocks.Dirt.Cost){
        Data.Money -= Data.Stocks.Dirt.Cost;
        Data.Stocks.Dirt.Owned += 1;
        DirtOwned.textContent = "Owned Stocks: "+Data.Stocks.Dirt.Owned;
        Cash.textConent = "$"+Data.Money;
    }
});

DirtSell.addEventListener("click", function(){
    if(Data.Stocks.Dirt.Owned >= 1){
    Data.Money += Data.Stocks.Dirt.Cost;
    Data.Stocks.Dirt.Owned -= 1;
    DirtOwned.textContent = "Owned Stocks: "+Data.Stocks.Dirt.Owned;
    Cash.textContent = "$"+Data.Money;
    }
});














//GAME
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

BankerUpg.addEventListener("click", function(){
    if(Data.Money >= Data.Bankers.Cost){
        Data.Money -= Data.Bankers.Cost;
        Data.Bankers.Cost = Data.Bankers.Cost * rando(30, 90);
        Data.Bankers.Owned += 1;
        BankerDisplay.innerText = "Owned: " + Data.Bankers.Owned;
        BankerCost.innerText = "$" + Data.Bankers.Cost;
        Cash.textContent = "$"+Data.Money.toFixed(1);
        Data.Mps += 1;
        MoneyPerSecond.textContent = "$"+Data.Mps.toFixed(1) + " Per Second";
    }
});


setInterval(function(){
    Data.Money += Data.Mps;
    Cash.textContent = "$"+Data.Money.toFixed(1);
}, 1000);

setInterval(function(){
    Data.Stocks.Dirt.Cost = rando(1000, 50000);
    DirtValue.textContent = "Stock Value: $"+Data.Stocks.Dirt.Cost;
}, 60000)





//SAVE DATA

Save.addEventListener("click", function(){
    localStorage.setItem("SaveData", JSON.stringify(Data));
});

Load.addEventListener("click", function(){
    var Data1 = localStorage.getItem("SaveData");
    JSON.parse(Data1);
    Data = Data1;
});




//ANTICHEAT (Broken)
//Blocks inspect console
document.onkeydown = (e) => {
    if (e.key == '123') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'I') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'C') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'J') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.key == 'U') {
        e.preventDefault();
    }
    if(e.key == "Enter"){
        e.preventDefault();
    }
};

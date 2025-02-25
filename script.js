var Data = {
    Money: 100000,
    Mps: 0,
    Stocks: {
        Dirt: {Owned: 0, Cost: 5000},
        Stone: {Owned: 0, Cost: 20000}
    },
    Clickers: {Cost: 10, Owned: 0},
    Bankers: {Cost: 1000, Owned: 0},
    Bank: {Cost: 30000, Owned: 0}
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

var BankUpg = document.getElementById("BankUpg");
var BankDisplay = document.getElementById("BankDisplay");
var BankCost = document.getElementById("BankCost");

var Save = document.getElementById("Save");
var Load = document.getElementById("Load");

//DIRT
var DirtInvest = document.getElementById("DirtInvest");
var DirtSell = document.getElementById("DirtSell");
var DirtValue = document.getElementById("DirtValue");
var DirtOwned = document.getElementById("DirtOwned");

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

//STONE

var StoneInvest = document.getElementById("StoneInvest");
var StoneSell = document.getElementById("StoneSell");
var StoneValue = document.getElementById("StoneValue");
var StoneOwned = document.getElementById("StoneOwned");

StoneInvest.addEventListener("click", function(){
    if(Data.Money >= Data.Stocks.Stone.Cost){
        Data.Money -= Data.Stocks.Stone.Cost;
        Data.Stocks.Stone.Owned += 1;
        StoneOwned.textContent = "Owned Stocks: "+Data.Stocks.Stone.Owned;
        Cash.textConent = "$"+Data.Money;
    }
});

StoneSell.addEventListener("click", function(){
    if(Data.Stocks.Stone.Owned >= 1){
    Data.Money += Data.Stocks.Stone.Cost;
    Data.Stocks.Stone.Owned -= 1;
    StoneOwned.textContent = "Owned Stocks: "+Data.Stocks.Stone.Owned;
    Cash.textContent = "$"+Data.Money;
    }
});














//GAME
Money.addEventListener("click", function(){
    Data.Money += 1;
    Cash.textContent = "$"+Data.Money;
});

ClickerUpg.addEventListener("click", function(){
    if(Data.Money >= Data.Clickers.Cost){
        Data.Money -= Data.Clickers.Cost;
        Data.Clickers.Cost = Data.Clickers.Cost * rando(10, 50);
        Data.Clickers.Owned += 1;
        ClickerDisplay.innerText = "Owned: " + Data.Clickers.Owned;
        ClickerCost.innerText = "$" + Data.Clickers.Cost;
        Cash.textContent = "$"+Data.Money;
        Data.Mps += 1;
        MoneyPerSecond.textContent = "$"+Data.Mps + " Per Second";
    }
});

BankerUpg.addEventListener("click", function(){
    if(Data.Money >= Data.Bankers.Cost){
        Data.Money -= Data.Bankers.Cost;
        Data.Bankers.Cost = Data.Bankers.Cost * rando(30, 90);
        Data.Bankers.Owned += 1;
        BankerDisplay.innerText = "Owned: " + Data.Bankers.Owned;
        BankerCost.innerText = "$" + Data.Bankers.Cost;
        Cash.textContent = "$"+Data.Money
        Data.Mps += 5;
        MoneyPerSecond.textContent = "$"+Data.Mps + " Per Second";
    }
});

BankUpg.addEventListener("click", function(){
    if(Data.Money >= Data.Bank.Cost){
        Data.Money -= Data.Bank.Cost;
        Data.Bank.Cost = Data.Bank.Cost * rando(30, 90);
        Data.Bank.Owned += 1;
        BankDisplay.innerText = "Owned: " + Data.Bank.Owned;
        BankCost.innerText = "$" + Data.Bank.Cost;
        Cash.textContent = "$"+Data.Money;
        Data.Mps += 50;
        MoneyPerSecond.textContent = "$"+Data.Mps + " Per Second";
    }
});



var x = setInterval(function(){
    Data.Money += Data.Mps;
    Cash.textContent = "$"+Data.Money
}, 1000);

setInterval(function(){
    Data.Stocks.Dirt.Cost = rando(1000, 50000);
    DirtValue.textContent = "Stock Value: $"+Data.Stocks.Dirt.Cost;

    Data.Stocks.Stone.Cost = rando(5000, 500000);
    StoneValue.textContent = "Stock Value: $"+Data.Stocks.Stone.Cost;
}, 60000)





//SAVE DATA

Save.addEventListener("click", function(){
    localStorage.setItem("SaveData", JSON.stringify(Data));
});

Load.addEventListener("click", function(){
    var Data1 = JSON.parse(localStorage.getItem("SaveData"));
    console.log(Data1);
    Data = Data1;
    BankDisplay.innerText = "Owned: " + Data.Bank.Owned;
    BankerDisplay.innerText = "Owned: " + Data.Bankers.Owned;
    ClickerDisplay.innerText = "Owned: " + Data.Clickers.Owned;
    DirtOwned.textContent = "Owned Stocks: " + Data.Stocks.Dirt.Owned;
    StoneOwned.textContent = "Owned Stocks: " + Data.Stocks.Stone.Owned;
    MoneyPerSecond.textContent = "$"+Data.Mps + " Per Second";
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

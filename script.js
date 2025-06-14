var Data = {
    Version: "v2.2",
    Money: 0,
    Mps: 0,
    Stocks: {
        Dirt: {Owned: 0, Cost: 5000},
        Stone: {Owned: 0, Cost: 20000},
        Wood: {Owned: 0, Cost: 50000},
        Iron: {Owned: 0, Cost: 75000},
        Gold: {Owned: 0, Cost: 150000}
    },
    Clickers: {Cost: 10, Owned: 0},
    Bankers: {Cost: 1000, Owned: 0},
    Bank: {Cost: 30000, Owned: 0},
    Farm: {Cost: 500000, Owned: 0},
    Printer: {Cost: 750000, Owned: 0},
    Magnet: {Cost: 5000000, Owned: 0}
}

var Version = document.getElementById("version");

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

var FarmUpg = document.getElementById("FarmUpg");
var FarmDisplay = document.getElementById("FarmDisplay");
var FarmCost = document.getElementById("FarmCost");

var PrinterUpg = document.getElementById("PrinterUpg");
var PrinterDisplay = document.getElementById("PrinterDisplay");
var PrinterCost = document.getElementById("PrinterCost");

var MagnetUpg = document.getElementById("MagnetUpg");
var MagnetDisplay = document.getElementById("MagnetDisplay");
var MagnetCost = document.getElementById("MagnetCost");

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

//WOOD

var WoodInvest = document.getElementById("WoodInvest");
var WoodSell = document.getElementById("WoodSell");
var WoodValue = document.getElementById("WoodValue");
var WoodOwned = document.getElementById("WoodOwned");

WoodInvest.addEventListener("click", function(){
    if(Data.Money >= Data.Stocks.Wood.Cost){
        Data.Money -= Data.Stocks.Wood.Cost;
        Data.Stocks.Wood.Owned += 1;
        WoodOwned.textContent = "Owned Stocks: "+Data.Stocks.Wood.Owned;
        Cash.textConent = "$"+Data.Money;
    }
});

WoodSell.addEventListener("click", function(){
    if(Data.Stocks.Wood.Owned >= 1){
    Data.Money += Data.Stocks.Wood.Cost;
    Data.Stocks.Wood.Owned -= 1;
    WoodOwned.textContent = "Owned Stocks: "+Data.Stocks.Wood.Owned;
    Cash.textContent = "$"+Data.Money;
    }
});

//Gold

var GoldInvest = document.getElementById("GoldInvest");
var GoldSell = document.getElementById("GoldSell");
var GoldValue = document.getElementById("GoldValue");
var GoldOwned = document.getElementById("GoldOwned");

GoldInvest.addEventListener("click", function(){
    if(Data.Money >= Data.Stocks.Gold.Cost){
        Data.Money -= Data.Stocks.Gold.Cost;
        Data.Stocks.Gold.Owned += 1;
        GoldOwned.textContent = "Owned Stocks: "+Data.Stocks.Gold.Owned;
        Cash.textConent = "$"+Data.Money;
    }
});

GoldSell.addEventListener("click", function(){
    if(Data.Stocks.Gold.Owned >= 1){
    Data.Money += Data.Stocks.Gold.Cost;
    Data.Stocks.Gold.Owned -= 1;
    GoldOwned.textContent = "Owned Stocks: "+Data.Stocks.Gold.Owned;
    Cash.textContent = "$"+Data.Money;
    }
});

//IRON

var IronInvest = document.getElementById("IronInvest");
var IronSell = document.getElementById("IronSell");
var IronValue = document.getElementById("IronValue");
var IronOwned = document.getElementById("IronOwned");

IronInvest.addEventListener("click", function(){
    if(Data.Money >= Data.Stocks.Iron.Cost){
        Data.Money -= Data.Stocks.Iron.Cost;
        Data.Stocks.Iron.Owned += 1;
        IronOwned.textContent = "Owned Stocks: "+Data.Stocks.Iron.Owned;
        Cash.textConent = "$"+Data.Money;
    }
});

IronSell.addEventListener("click", function(){
    if(Data.Stocks.Iron.Owned >= 1){
    Data.Money += Data.Stocks.Iron.Cost;
    Data.Stocks.Iron.Owned -= 1;
    IronOwned.textContent = "Owned Stocks: "+Data.Stocks.Iron.Owned;
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
        Data.Clickers.Cost = Data.Clickers.Cost * rando(1, 10);
        Data.Clickers.Owned += 1;
        ClickerDisplay.innerText = "Owned: " + Data.Clickers.Owned;
        ClickerCost.innerText = "$" + Data.Clickers.Cost;
        Cash.textContent = "$"+Data.Money;
        Data.Mps += 1;
        MoneyPerSecond.textContent = "$"+Data.Mps + " Per Second";
    } else{
        alert("You can't afford this.");
    }
});

BankerUpg.addEventListener("click", function(){
    if(Data.Money >= Data.Bankers.Cost){
        Data.Money -= Data.Bankers.Cost;
        Data.Bankers.Cost = Data.Bankers.Cost * rando(3, 9);
        Data.Bankers.Owned += 1;
        BankerDisplay.innerText = "Owned: " + Data.Bankers.Owned;
        BankerCost.innerText = "$" + Data.Bankers.Cost;
        Cash.textContent = "$"+Data.Money
        Data.Mps += 5;
        MoneyPerSecond.textContent = "$"+Data.Mps + " Per Second";
    } else{
        alert("You can't afford this.");
    }
});

BankUpg.addEventListener("click", function(){
    if(Data.Money >= Data.Bank.Cost){
        Data.Money -= Data.Bank.Cost;
        Data.Bank.Cost = Data.Bank.Cost * rando(2, 8);
        Data.Bank.Owned += 1;
        BankDisplay.innerText = "Owned: " + Data.Bank.Owned;
        BankCost.innerText = "$" + Data.Bank.Cost;
        Cash.textContent = "$"+Data.Money;
        Data.Mps += 50;
        MoneyPerSecond.textContent = "$"+Data.Mps + " Per Second";
    } else{
        alert("You can't afford this.");
    }
});

FarmUpg.addEventListener("click", function(){
    if(Data.Money >= Data.Farm.Cost){
        Data.Money -= Data.Farm.Cost;
        Data.Farm.Cost = Data.Farm.Cost * rando(1, 5);
        Data.Farm.Owned += 1;
        FarmDisplay.innerText = "Owned: " + Data.Farm.Owned;
        FarmCost.innerText = "$" + Data.Farm.Cost;
        Cash.textContent = "$"+Data.Money;
        Data.Mps += 250;
        MoneyPerSecond.textContent = "$"+Data.Mps + " Per Second";
    } else{
        alert("You can't afford this.")
    }
});

PrinterUpg.addEventListener("click", function(){
    if(Data.Money >= Data.Printer.Cost){
        Data.Money -= Data.Printer.Cost;
        Data.Printer.Cost = Data.Printer.Cost * rando(2, 5);
        Data.Printer.Owned += 1;
        PrinterDisplay.innerText = "Owned: " + Data.Printer.Owned;
        PrinterCost.innerText = "$" + Data.Printer.Cost;
        Cash.textContent = "$"+Data.Money;
        Data.Mps += 300;
        MoneyPerSecond.textContent = "$"+Data.Mps + " Per Second";
    } else{
        alert("You can't afford this.")
    }
});

MagnetUpg.addEventListener("click", function(){
    if(Data.Money >= Data.Magnet.Cost){
        Data.Money -= Data.Magnet.Cost;
        Data.Magnet.Cost = Data.Magnet.Cost * rando(2, 5);
        Data.Magnet.Owned += 1;
        MagnetDisplay.innerText = "Owned: " + Data.Magnet.Owned;
        MagnetCost.innerText = "$" + Data.Magnet.Cost;
        Cash.textContent = "$"+Data.Money;
        Data.Mps += 500;
        MoneyPerSecond.textContent = "$"+Data.Mps + " Per Second";
    } else{
        alert("You can't afford this.")
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

    Data.Stocks.Wood.Cost = rando(15000, 1000000);
    WoodValue.textContent = "Stock Value: $"+Data.Stocks.Wood.Cost;

    Data.Stocks.Iron.Cost = rando(25000, 1500000);
    StoneValue.textContent = "Stock Value: $"+Data.Stocks.Iron.Cost;

    Data.Stocks.Gold.Cost = rando(50000, 1750000);
    StoneValue.textContent = "Stock Value: $"+Data.Stocks.Gold.Cost;
}, 60000)





//SAVE DATA

Save.addEventListener("click", function(){
    localStorage.setItem("SaveData", JSON.stringify(Data));
});

Load.addEventListener("click", function(){
    var Data1 = JSON.parse(localStorage.getItem("SaveData"));
    console.log(Data1);
    Data = Data1;
    if(Data.Version == undefined || null){
        Data.Version = "v2.2";
        Version.textContent = Data.Version;
    }
    Version.textContent = Data.Version;
    DirtOwned.textContent = "Owned Stocks: " + Data.Stocks.Dirt.Owned;
    DirtValue.textContent = "Stock Value: " + Data.Stocks.Dirt.Cost;
    
    StoneOwned.textContent = "Owned Stocks: " + Data.Stocks.Stone.Owned;
    StoneValue.textContent = "Stock Value: " + Data.Stocks.Stone.Cost;

    WoodOwned.textContent = "Owned Stocks: " + Data.Stocks.Wood.Owned;
    WoodValue.textContent = "Stock Value: " + Data.Stocks.Wood.Cost;

    IronOwned.textContent = "Owned Stocks: " + Data.Stocks.Iron.Owned;
    IronValue.textContent = "Stock Value: " + Data.Stocks.Iron.Cost;

    GoldOwned.textContent = "Owned Stocks: " + Data.Stocks.Gold.Owned;
    GoldValue.textContent = "Stock Value: " + Data.Stocks.Iron.Cost;

    BankDisplay.innerText = "Owned: " + Data.Bank.Owned;
    BankCost.textContent = "$"+Data.Bank.Cost;

    BankerDisplay.innerText = "Owned: " + Data.Bankers.Owned;
    BankerCost.innerText = "$"+Data.Bankers.Cost;

    ClickerDisplay.innerText = "Owned: " + Data.Clickers.Owned;
    ClickerCost.innerText = "$"+Data.Clickers.Cost;

    PrinterDisplay.innerText = "Owned: " + Data.Printer.Owned;
    PrinterCost.innerText = "$"+Data.Printer.Cost;
    
    MagnetDisplay.innerText = "Owned: " + Data.Magnet.Owned;
    MagnetCost.innerText = "$"+Data.Magnet.Cost;

    FarmDisplay.innerText = "Owned: " + Data.Farm.Owned;
    FarmCost.innerText = "$"+Data.Farm.Cost;

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



//Animations

var DirtCo = document.getElementById("DirtCo");
var StoneCo = document.getElementById("StoneCo");
var WoodCo = document.getElementById("WoodCo");

DirtCo.addEventListener("mouseover", function(){
    DirtCo.style = "margin-left: 3px; margin-bottom: 7px; border-radius: 4px; background-color: WHITE; width: 300px; box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.5); transition: box-shadow 0.3s; margin-left: 7px; transition: margin-left 0.5s; background-image: linear-gradient(to right, rgb(154, 121, 121), lightgrey);";
});

DirtCo.addEventListener("mouseout", function(){
    DirtCo.style = "margin-left: 3px; margin-bottom: 7px; border-radius: 4px; background-color: WHITE; width: 300px; box-shadow: none; transition: box-shadow 0.3s; background-image: linear-gradient(to right, rgb(154, 121, 121), lightgrey);";
});

StoneCo.addEventListener("mouseover", function(){
    StoneCo.style = "margin-left: 3px; margin-bottom: 7px; border-radius: 4px; background-color: WHITE; width: 300px; box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.5); transition: box-shadow 0.3s; margin-left: 7px; transition: margin-left 0.5s; background-image: linear-gradient(to right, grey, lightgrey);";
});

StoneCo.addEventListener("mouseout", function(){
    StoneCo.style = "margin-left: 3px; margin-bottom: 7px; border-radius: 4px; background-color: WHITE; width: 300px; box-shadow: none; transition: box-shadow 0.3s; background-image: linear-gradient(to right, grey, lightgrey);";
});

WoodCo.addEventListener("mouseover", function(){
    WoodCo.style = "margin-left: 3px; margin-bottom: 7px; border-radius: 4px; background-color: WHITE; width: 300px; box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.5); transition: box-shadow 0.3s; margin-left: 7px; transition: margin-left 0.5s; background-image: linear-gradient(to right, rgb(118, 99, 76), lightgrey);";
});

WoodCo.addEventListener("mouseout", function(){
    WoodCo.style = "margin-left: 3px; margin-bottom: 7px; border-radius: 4px; background-color: WHITE; width: 300px; box-shadow: none; transition: box-shadow 0.3s; background-image: linear-gradient(to right, rgb(118, 99, 76), lightgrey);";
});

IronCo.addEventListener("mouseover", function(){
    IronCo.style = "margin-left: 3px; margin-bottom: 7px; border-radius: 4px; background-color: WHITE; width: 300px; box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.5); transition: box-shadow 0.3s; margin-left: 7px; transition: margin-left 0.5s; background-image: linear-gradient(to right, white, lightgrey);";
});

IronCo.addEventListener("mouseout", function(){
    IronCo.style = "margin-left: 3px; margin-bottom: 7px; border-radius: 4px; background-color: WHITE; width: 300px; box-shadow: none; transition: box-shadow 0.3s; background-image: linear-gradient(to right, white, lightgrey);";
});

GoldCo.addEventListener("mouseover", function(){
    GoldCo.style = "margin-left: 3px; margin-bottom: 7px; border-radius: 4px; background-color: WHITE; width: 300px; box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.5); transition: box-shadow 0.3s; margin-left: 7px; transition: margin-left 0.5s; background-image: linear-gradient(to right, rgb(255, 234, 113), lightgrey);";
});

GoldCo.addEventListener("mouseout", function(){
    GoldCo.style = "margin-left: 3px; margin-bottom: 7px; border-radius: 4px; background-color: WHITE; width: 300px; box-shadow: none; transition: box-shadow 0.3s; background-image: linear-gradient(to right, rgb(255, 234, 113), lightgrey);";
});


//Info Thing

var ClickerInfo = document.getElementById("ClickerInfo");
var BankerInfo = document.getElementById("BankerInfo");
var BankInfo = document.getElementById("BankInfo");
var FarmInfo = document.getElementById("FarmInfo");
var PrinterInfo = document.getElementById("PrinterInfo");
var MagnetInfo = document.getElementById("MagnetInfo");


ClickerInfo.addEventListener("click", function(){
    alert("Clickers click the mouse button automatically for you granting you +1 MPS for ever clicker owned.");
});

BankerInfo.addEventListener("click", function(){
    alert("Bankers speed up production by setting up tents or 'mini banks' allowing for easy access for customers granting +5 MPS for every banker owned.");
});

BankInfo.addEventListener("click", function(){
    alert("Banks gain 10 fold the amount of customers that 'mini banks' get. Banks grant +50 MPS for every bank owned.");
});

FarmInfo.addEventListener("click", function(){
    alert("Farms grow money naturally for you and take only 1 day to harvest! Each farm grants +250 MPS for every farm owned.");
});

PrinterInfo.addEventListener("click", function(){
    alert("Printers automatically print money for you granting +300 MPS for every printer owned.");
});

MagnetInfo.addEventListener("click", function(){
    alert("Magnets suck in nearby asteroids which are then sold for money granting +500 MPS for every magnet owned.");
});





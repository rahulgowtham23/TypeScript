"use strict";
class PersonalDetails {
    constructor(username, phonenumber) {
        this.UserName = username;
        this.PhoneNumber = phonenumber;
    }
}
let CurrentLoggedInUser;
let CardNumberAutoIncrement = 1000;
let TravelIDAutoIncrement = 2000;
let TikcetIDAutoIncrement = 3000;
class UserDetails extends PersonalDetails {
    constructor(username, phonenumber, balance) {
        CardNumberAutoIncrement++;
        super(username, phonenumber);
        this.Balance = 0;
        this.CardNumber = "CMRL" + CardNumberAutoIncrement;
        this.Balance = balance;
    }
    walletrecharge(amount) {
        this.Balance += amount;
    }
    deductbalance(amount) {
        this.Balance -= amount;
    }
}
let userArrayList = new Array();
userArrayList.push(new UserDetails("Rahul", 789456123, 0));
userArrayList.push(new UserDetails("Max", 789456123, 100));
userArrayList.push(new UserDetails("Will", 789456123, 200));
class TravelDetails {
    constructor(cardnumber, fromlocation, tolocation, date, travelcost) {
        TravelIDAutoIncrement++;
        this.TravelID = "TID" + TravelIDAutoIncrement;
        this.CardNumber = cardnumber;
        this.FromLocation = fromlocation;
        this.ToLocation = tolocation;
        this.Date = date;
        this.TravelCost = travelcost;
    }
}
let travelArrayList = new Array();
travelArrayList.push(new TravelDetails("CMRL1001", "Airport", "Egmore", new Date(2023, 10, 10), 55));
travelArrayList.push(new TravelDetails("CMRL1001", "Egmore", "Koyambedu", new Date(2023, 10, 10), 32));
travelArrayList.push(new TravelDetails("CMRL1002", "Alandur", "Koyambedu", new Date(2023, 11, 10), 25));
travelArrayList.push(new TravelDetails("CMRL1002", "Egmore", "Thirumangalam", new Date(2023, 11, 10), 25));
class TicketFairDetails {
    constructor(fromlocation, tolocation, ticketprice) {
        TikcetIDAutoIncrement++;
        this.TicketID = "MR" + TikcetIDAutoIncrement;
        this.FromLocation = fromlocation;
        this.ToLocation = tolocation;
        this.TicketPrice = ticketprice;
    }
}
let ticketArrayList = new Array();
ticketArrayList.push(new TicketFairDetails("Airport", "Egmore", 55));
ticketArrayList.push(new TicketFairDetails("Airport", "Koyambedu", 25));
ticketArrayList.push(new TicketFairDetails("Alandur", "Koyambedu", 25));
ticketArrayList.push(new TicketFairDetails("Koyambedu", "Egmore", 32));
ticketArrayList.push(new TicketFairDetails("Vadapalani", "Egmore", 45));
ticketArrayList.push(new TicketFairDetails("Arumbakkam", "Egmore", 25));
ticketArrayList.push(new TicketFairDetails("Vadapalani", "Koyambedu", 25));
ticketArrayList.push(new TicketFairDetails("Arumbakkam", "Koyambedu", 16));
function login() {
    let existname = document.getElementById("existname").value;
    let phone = parseInt(document.getElementById("existphone").value);
    let isPresent = true;
    for (let i = 0; i < userArrayList.length; i++) {
        if (existname == userArrayList[i].UserName && phone == userArrayList[i].PhoneNumber) {
            isPresent = false;
            CurrentLoggedInUser = userArrayList[i];
            menu();
            break;
        }
    }
    if (isPresent) {
        alert("Invalid User !!");
    }
}
function signup() {
    let name = document.getElementById("name").value;
    let phone = parseInt(document.getElementById("phone").value);
    let Walletamount = parseInt(document.getElementById("Walletamount").value);
    userArrayList.push(new UserDetails(name, phone, Walletamount));
    alert("Successfully Registered !");
}
function menu() {
    let menublock = document.getElementById("menublock");
    menublock.style.display = "block";
    let card = document.getElementById("card");
    card.style.display = "none";
}
function showbalance() {
    hideall();
    let balanceblock = document.getElementById("balanceblock");
    balanceblock.style.display = "block";
    // let menublock = document.getElementById("menublock") as HTMLDivElement;
    // menublock.style.display="none";
    let balance = document.getElementById("balance-message");
    balance.innerHTML = "Your Balance is:" + CurrentLoggedInUser.Balance;
}
function displayrecharge() {
    hideall();
    let rechargeblock = document.getElementById("rechargeblock");
    rechargeblock.style.display = "block";
}
function recharge() {
    let rechargeamount = parseInt(document.getElementById("rechargeamount").value);
    CurrentLoggedInUser.walletrecharge(rechargeamount);
    alert("Amount added successfully!!!");
}
function travelhistory() {
    hideall();
    let travelhistoryblock = document.getElementById("travelhistoryblock");
    travelhistoryblock.style.display = "block";
    let tablelement = document.getElementById("travel-table");
    tablelement.style.display = "block";
    tablelement.innerHTML = "";
    for (let i = 0; i < travelArrayList.length; i++) {
        let tabledata = document.createElement('tr');
        tabledata.innerHTML =
            `<td>${travelArrayList[i].TravelID}</td>
            <td>${travelArrayList[i].CardNumber}</td>
            <td>${travelArrayList[i].FromLocation}</td>
            <td>${travelArrayList[i].ToLocation}</td>
            <td>${travelArrayList[i].Date.toDateString()}</td>
            <td>${travelArrayList[i].TravelCost}</td>`;
        tablelement.appendChild(tabledata);
    }
}
function travel() {
    hideall();
    let ticketfairblock = document.getElementById("ticketfairblock");
    ticketfairblock.style.display = "block";
    let tablelement = document.getElementById("ticket-table");
    tablelement.style.display = "block";
    tablelement.innerHTML = "";
    for (let i = 0; i < ticketArrayList.length; i++) {
        let tabledata = document.createElement('tr');
        tabledata.innerHTML =
            `<td>${ticketArrayList[i].TicketID}</td>
            <td>${ticketArrayList[i].FromLocation}</td>
            <td>${ticketArrayList[i].ToLocation}</td>
            <td>${ticketArrayList[i].TicketPrice}</td>
            `;
        tablelement.appendChild(tabledata);
    }
    let ticketidgettingblock = document.getElementById("ticketidgettingblock");
    ticketidgettingblock.style.display = "block";
}
//function ticketprocess() {
// let ticketidgettingblock = document.getElementById("ticketidgettingblock") as HTMLDivElement;
// ticketidgettingblock.style.display = "block";
// let ticketid = (document.getElementById("ticketid") as HTMLInputElement).value;
// let isValidTicketID: boolean = true;
// for (let i = 0; i < ticketArrayList.length; i++) {
//     if (ticketid == ticketArrayList[i].TicketID) {
//         isValidTicketID = false;
//         alert("valid TicketID");
//     }
// }
// if (isValidTicketID) {
//     alert("Ivalid Ticket ID");
// }
//}
function process() {
    // 1.	Show the Ticket fair details where the user wishes to travel by getting TicketID.
    // 2.	Check the ticketID is valid. Else show “Invalid user id”.
    // 3.	IF ticket is valid then, Check the balance from the user object whether it has sufficient balance to travel.
    // 4.	If “Yes” deduct the respective amount from the balance and add the travel details like Card number, From and ToLocation, Travel Date, Travel cost, Travel ID (auto generation) in his travel history.
    // 5.	If “No” ask him to recharge and go to the “Existing User Service” menu.
    let ticketid = document.getElementById("ticketid").value;
    let isValidTicketID = true;
    for (let i = 0; i < ticketArrayList.length; i++) {
        if (ticketid == ticketArrayList[i].TicketID) {
            isValidTicketID = false;
            if (CurrentLoggedInUser.Balance >= ticketArrayList[i].TicketPrice) {
                let ticketPrice = ticketArrayList[i].TicketPrice;
                CurrentLoggedInUser.deductbalance(ticketPrice);
                travelArrayList.push(new TravelDetails(CurrentLoggedInUser.CardNumber, ticketArrayList[i].FromLocation, ticketArrayList[i].ToLocation, new Date, ticketArrayList[i].TicketPrice));
            }
            else {
                /*let rechargeblock = document.getElementById("rechargeblock") as HTMLDivElement;
                rechargeblock.style.display="block";
                recharge()*/
                alert("Insufficient Balance!!");
                displayrecharge();
            }
        }
    }
    if (isValidTicketID) {
        alert("Ivalid Ticket ID");
    }
}
function hideall() {
    let balanceblock = document.getElementById("balanceblock");
    balanceblock.style.display = "none";
    let rechargeblock = document.getElementById("rechargeblock");
    rechargeblock.style.display = "none";
    let travelhistoryblock = document.getElementById("travelhistoryblock");
    travelhistoryblock.style.display = "none";
    let ticketfairblock = document.getElementById("ticketfairblock");
    ticketfairblock.style.display = "none";
    let ticketidgettingblock = document.getElementById("ticketidgettingblock");
    ticketidgettingblock.style.display = "none";
}

/*function signupvalidate() {
    event?.preventDefault();

    var valid = true;

    let username = (document.getElementById("name") as HTMLInputElement).value;
    let nameerror = document.getElementById("nameerror") as HTMLLabelElement;

    var regname = /^[a-zA-Z]{3,20}$/;

    if (username == "" || !regname.test(username)) {
        valid = false;

        nameerror.innerHTML = "Invalid Name";
        nameerror.style.color = "red";
    }
    else {
        nameerror.innerHTML = "valid name";
        nameerror.style.color = "green";
    }

    return valid;
}
*/


let MedicineIdAutoIncrement = 10;

let UserIDAutoIncrement = 100;

let OrderIdAutoIncrement = 200;


let CurrentUserId: User;

let CurrentmedicineID: string;



class User {
    UserName: string
    UserID: string
    EmailID: string
    Password: string
    PhoneNumber: number
    Balance: number = 0

    constructor(username: string, emailid: string, password: string, phonenumber: number) {

        UserIDAutoIncrement++;

        this.UserID = "UID" + UserIDAutoIncrement.toString();
        this.UserName = username;
        this.EmailID = emailid;
        this.Password = password;
        this.PhoneNumber = phonenumber;
    }

    update(amount: number) {
        this.Balance += amount;
    }

    showbalance(): number {
        return this.Balance
    }


    deduct(amount: number)
    {
        this.Balance-=amount;
    }
}

let userArrayList: Array<User> = new Array<User>();     // list creation to add default value

userArrayList.push(new User("Rahul", "rahul@gmail.com", "rahul23", 78965413));
userArrayList.push(new User("dustin", "dustin@gmail.com", "dustin56", 88965413));
userArrayList.push(new User("maxine", "maxine@gmail.com", "maxine32", 915665413));




class Medicine {
    MedicineID: string
    MedicineName: string
    Price: number
    Quantity: number
    Expiry: Date

    constructor(medicinename: string, price: number, quantity: number, expiry: Date) {
        MedicineIdAutoIncrement++;

        this.MedicineID = "MID" + MedicineIdAutoIncrement.toString();
        this.MedicineName = medicinename;
        this.Price = price;
        this.Quantity = quantity;
        this.Expiry = expiry;
    }
}



let medicineArrayList: Array<Medicine> = new Array<Medicine>();   // list creation to add default value

medicineArrayList.push(new Medicine("Paracetomol", 5, 50, new Date(2026, 8, 23)));
medicineArrayList.push(new Medicine("Colpal", 5, 60, new Date(2026, 8, 23)));
medicineArrayList.push(new Medicine("Stepsil", 5, 70, new Date(2026, 8, 23)));
medicineArrayList.push(new Medicine("Iodex", 5, 80, new Date(2026, 8, 23)));
medicineArrayList.push(new Medicine("Acetherol", 5, 100, new Date(2026, 8, 23)));




enum Orderstuatus {
    ordered,
    cancelled
}

class Order {
    OrderId: string;
    MedicineId: string;
    UserId: string;

    MedicineName: string;
    MedicineCount: number;
    Orderstatus: Orderstuatus;

    constructor(paramMedicineId: string, paramUserId: string, paramMedicineName: string, paramMedicineCount: number, orderstatus: Orderstuatus) {
        OrderIdAutoIncrement++;

        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.UserId = paramUserId;

        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.Orderstatus = orderstatus;
    }
}



let orderArrayList: Array<Order> = new Array<Order>();




function signup() {
    var name = (document.getElementById("name") as HTMLInputElement).value;
    var emailid = (document.getElementById("emailid") as HTMLInputElement).value;
    var password = (document.getElementById("password") as HTMLInputElement).value;
    var phonenumber = parseInt((document.getElementById("phonenumber") as HTMLInputElement).value);

    userArrayList.push(new User(name, emailid, password, phonenumber));

    homepage();
}




function login() {
    let emailid = (document.getElementById("existemailid") as HTMLInputElement).value;
    let password = (document.getElementById("existpassword") as HTMLInputElement).value;

    for (let i = 0; i < userArrayList.length; i++) {
        if (emailid == userArrayList[i].EmailID && password == userArrayList[i].Password)
            CurrentUserId = userArrayList[i];
        homepage();
    }
}





function homepage() {
    var homepage = document.getElementById("homepage") as HTMLDivElement;
    var container = document.getElementById("container") as HTMLDivElement;
    var menu = document.getElementById("menu") as HTMLDivElement;

    homepage.style.display = "block";
    container.style.display = "none";
    menu.style.display = "block";
}





function medicinetable() {
    hideall();

    var homepage = document.getElementById("homepage") as HTMLDivElement;
    var medicinedetail = document.getElementById("medicinedetail") as HTMLDivElement;

    homepage.style.display = "none";
    medicinedetail.style.display = "block";

    let tableelement = document.getElementById("medicinetable") as HTMLInputElement;
    tableelement.innerHTML = "";

    for (let i = 0; i < medicineArrayList.length; i++) {
        let tabledata = document.createElement("tr");

        tabledata.innerHTML = `<td>${medicineArrayList[i].MedicineName}</td>
        <td>${medicineArrayList[i].Price}</td>
        <td>${medicineArrayList[i].Quantity}</td>
        <td>${medicineArrayList[i].Expiry.toDateString()}</td>
        <td><button onclick="formdisplay('${medicineArrayList[i].MedicineID}')">Edit</button></td>
        <td><button onclick="Delete('${medicineArrayList[i].MedicineID}')">Delete</button></td>
        `
        tableelement.appendChild(tabledata);
    }
}

function formdisplay(id:string)
{
    let formblock = document.getElementById("formblock") as HTMLInputElement;
    formblock.style.display="block";

    CurrentmedicineID=id;

}


function edit() {

    let editname = (document.getElementById("medicinename") as HTMLInputElement).value;
    let editprice = parseInt((document.getElementById("medicineprice") as HTMLInputElement).value);
    let editquantity = parseInt((document.getElementById("medicinequantity") as HTMLInputElement).value);
    

    for (let i = 0; i < medicineArrayList.length; i++) {
        if (CurrentmedicineID == medicineArrayList[i].MedicineID)
            medicineArrayList[i].MedicineName=editname;
            medicineArrayList[i].Price=editprice;
            medicineArrayList[i].Quantity=editquantity;
            break;
        }
    
        medicinetable();
}



function Delete(id: string) {
    medicineArrayList = medicineArrayList.filter((item) => item.MedicineID != id);
    medicinetable()
}




function purchasetable() {
    hideall();

    var medicinedetail = document.getElementById("medicinedetail") as HTMLDivElement;
    var purchase = document.getElementById("purchase") as HTMLDivElement;

    medicinedetail.style.display = "none";
    purchase.style.display = "block";

    let tableelement = document.getElementById("purchasetable") as HTMLTableElement;
    tableelement.innerHTML = "";

    for (let i = 0; i < medicineArrayList.length; i++) {
        let tabledata = document.createElement("tr");


        /*const button = document.createElement('button');
        button.textContent = 'buy';

        button.addEventListener('click', () => {
            setglobal(medicineArrayList[i].MedicineID)
        })
        */

        tabledata.innerHTML = `<td>${medicineArrayList[i].MedicineName}</td>
            <td>${medicineArrayList[i].Price}</td>
            <td>${medicineArrayList[i].Quantity}</td>
            <td>${medicineArrayList[i].Expiry.toDateString()}</td>
            <td><button onclick="setglobal('${medicineArrayList[i].MedicineID}')">Buy</button></td>
            `
        tableelement.appendChild(tabledata);
        //tableelement.appendChild(button);
    }
}


function setglobal(medicineid: string) {

    let quantityblock = (document.getElementById('quantityblock') as HTMLDivElement);
    quantityblock.style.display = "block";
    CurrentmedicineID = medicineid;
}




function quantity() {
    hideall();

    let quantity = parseInt((document.getElementById('quantity') as HTMLInputElement).value);
    buymedicine(quantity, CurrentmedicineID);

}


function buymedicine(quantity: number, medicineid: string) {
    for (let i = 0; i < medicineArrayList.length; i++) {
        if (medicineArrayList[i].MedicineID == medicineid) 
        {   
            let totalamount = medicineArrayList[i].Price*quantity;

            CurrentUserId.deduct(totalamount);
            
            medicineArrayList[i].Quantity = medicineArrayList[i].Quantity - quantity;
            orderArrayList.push(new Order(medicineArrayList[i].MedicineID, CurrentUserId.UserID, medicineArrayList[i].MedicineName, quantity, Orderstuatus.ordered));
        }
    }
}



function orderhistory() {

    hideall();

    let orderblock = document.getElementById("orderblock") as HTMLDivElement;
    orderblock.style.display = "block";

    let tableelement = document.getElementById("ordertable") as HTMLDivElement;
    tableelement.style.display = "block";

    tableelement.innerHTML = "";

    for (let i = 0; i < orderArrayList.length; i++) {
        let tabledata = document.createElement("tr");
        tabledata.innerHTML = `<td>${orderArrayList[i].MedicineId}</td>
            <td>${orderArrayList[i].UserId}</td>
            <td>${orderArrayList[i].MedicineName}</td>
            <td>${orderArrayList[i].MedicineCount}</td>`

        tableelement.appendChild(tabledata);
    }
}



/*
function topup() {
    let topupblock = document.getElementById("topupblock") as HTMLDivElement;

    topupblock.style.display = "block";

    let balanceblock = document.getElementById("balanceblock") as HTMLDivElement;

    balanceblock.style.display = "block";

}
*/

function displayrecharge()
{
    hideall();

    let rechargeblock = document.getElementById("rechargeblock") as HTMLDivElement;
    rechargeblock.style.display="block";

}


function recharge() {

    hideall();
    /*let rechargeblock = document.getElementById("rechargeblock") as HTMLDivElement;
    rechargeblock.style.display = "block";*/

    let amount = parseInt((document.getElementById('amount') as HTMLInputElement).value);

    CurrentUserId.update(amount);
}



function showbalance() {

    hideall();

    let balanceblock = document.getElementById("balanceblock") as HTMLDivElement;
    balanceblock.style.display = "block";


    let balance = (document.getElementById("balance") as HTMLInputElement);

    balance.innerHTML = "Your Balance is:"+" "+ CurrentUserId.Balance;
}






function showcancelorder() {
    let tableelement = document.getElementById("order-table") as HTMLDivElement;
    tableelement.style.display = "block";
    tableelement.innerHTML = "";

    for (let i = 0; i < orderArrayList.length; i++) {
        let tabledata = document.createElement("tr");
        tabledata.innerHTML = `<td>${orderArrayList[i].MedicineId}</td>
            <td>${orderArrayList[i].UserId}</td>
            <td>${orderArrayList[i].MedicineName}</td>
            <td>${orderArrayList[i].MedicineCount}</td>
            <td><button onclick="cancelorder('${orderArrayList[i].OrderId}')">Cancel</button></td>`

        tableelement.appendChild(tabledata);
    }
}


function cancelorder(id: string) {
    for (let i = 0; i < orderArrayList.length; i++) {
        if (id == orderArrayList[i].OrderId) {
            orderArrayList[i].Orderstatus = Orderstuatus.cancelled;

            for (let j = 0; j < medicineArrayList.length; j++) {
                if (medicineArrayList[j].MedicineID == orderArrayList[i].MedicineId) 
                {
                    let returnamount = orderArrayList[i].MedicineCount*medicineArrayList[j].Price;
                    CurrentUserId.update(returnamount);

                    medicineArrayList[j].Quantity += orderArrayList[i].MedicineCount;
                    break;
                }
            }
        }
    }
}



function hideall()
{
    let rechargeblock = document.getElementById("rechargeblock") as HTMLDivElement;
    rechargeblock.style.display="none";


    let balanceblock = document.getElementById("balanceblock") as HTMLDivElement;
    balanceblock.style.display="none";

    let orderblock = document.getElementById("orderblock") as HTMLDivElement;
    orderblock.style.display="none";

    let medicinedetail = document.getElementById("medicinedetail") as HTMLDivElement;
    medicinedetail.style.display="none";

    let purchase = document.getElementById("purchase") as HTMLDivElement;
    purchase.style.display="none";

    let quantityblock = document.getElementById("quantityblock") as HTMLDivElement;
    quantityblock.style.display="none";
}
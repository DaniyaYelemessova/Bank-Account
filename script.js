//Business logic
function UserDataBase(){
  this.accounts = [];
  this.currentId = 0;
}

UserDataBase.prototype.addAccount = function(user){
    user.id = this.assignId()
    this.accounts[user.id] = user;
}

UserDataBase.prototype.assignId = function(){
  this.currentId += 1;
  return this.currentId;
}

function BankAccount(name,balance){
  this.name = name;
  this.balance = balance;
}

BankAccount.prototype.deposit = function(amount){
    this.balance = this.balance + amount
    return this.balance
}

BankAccount.prototype.withdrawal = function(amount){
  this.balance -= amount;
  return this.balance
}


//UI logic
function reset(){
  const accountForm = document.querySelector("#accountForm");
  accountForm.reset();
  const depositOrWithdrawForm = document.querySelector("#depositOrWithdrawForm");
  depositOrWithdraw.reset();
}

const userDataBase = new UserDataBase();

function displayNewUser(userDisplay){
  const currentBalance = document.querySelector("#currentBalance");
  currentBalance.innerText = `Hi, ${userDisplay.name}! Current balance: $${userDisplay.balance}`;
}


function newAccount(e){
  e.preventDefault();
  const userName = document.querySelector("#userName").value;
  const initialDeposit = parseInt(document.querySelector("#initialDeposit").value);
  const newUser = new BankAccount(userName, initialDeposit);
  userDataBase.addAccount(newUser);
  displayNewUser(newUser);
}

function depositOrWithdraw(e){
  e.preventDefault();
  const depOrWith = document.getElementById("depositOrWithdraw").value;
  const userName = document.querySelector("#userName").value;
  const amount = parseInt(document.querySelector("#amount").value);

  const user = userDataBase.accounts.find((account) => account && account.name === userName);
  
  if (!user) {
    console.error("User not found");
    return;
  }

  if(depOrWith === "1"){
      user.deposit(amount)
  }else if(depOrWith === "2"){
    user.withdrawal(amount)
  }else{
    console.error("Invalid operations");
    return;
  }
  displayNewUser(user);
  reset();
}

document.addEventListener("DOMContentLoaded", function(){
  const accountForm = document.querySelector("#accountForm");
  accountForm.addEventListener("submit", newAccount);

  const depositOrWithdrawForm = document.querySelector("#depositOrWithdrawForm");
  depositOrWithdrawForm.addEventListener("submit", depositOrWithdraw);
})
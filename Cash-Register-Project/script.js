let cash = document.getElementById('cash');
let purchaseBtn = document.getElementById('purchase-btn');
let change = document.getElementById('change-due');

let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

let currencyUnits = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100]
];

purchaseBtn.addEventListener('click', () => {
  const cashValue = parseFloat(cash.value);

  if (!cashValue) {
    alert("Enter the cash"); 
    return;
  }

  const changeDue = cashValue - price;

  if (cashValue < price) {
    alert("Customer does not have enough money to purchase the item"); 
    return;
  } else if (cashValue === price) {
    change.innerText = "No change due - customer paid with exact cash"; 
    return;
  }

  const changeResult = getChange(changeDue, cid);

  change.innerText = `Status: ${changeResult.Status} ${formatChange(changeResult.change)}`; 
  change.classList.remove('hidden'); 
});

const getChange = (changeDue, cid) => {
  let totalCid = parseFloat(cid.reduce((sum, [_, amount]) => sum + amount, 0).toFixed(2));

  if (totalCid < changeDue) {
    return { Status: "INSUFFICIENT_FUNDS", change: [] };
  }
  
  let changeArray = [];
  let remainingChange = changeDue;

  for (let i = currencyUnits.length - 1; i >= 0; i--) {
    let [unit, unitValue] = currencyUnits[i];
    let unitInDrawer = cid.find(currency => currency[0] === unit)[1]; // here is the change

    if (unitValue <= remainingChange && unitInDrawer > 0) {
      let amountFromUnit = 0;

      while (remainingChange >= unitValue && unitInDrawer > 0) {
        remainingChange = (remainingChange - unitValue).toFixed(2);
        unitInDrawer -= unitValue;
        amountFromUnit += unitValue;
      }
      if (amountFromUnit > 0) {
        changeArray.push([unit, parseFloat(amountFromUnit.toFixed(2))]);
      }
    }
  }

  if (remainingChange > 0) {
    return { Status: "INSUFFICIENT_FUNDS", change: [] };
  }
  if (remainingChange == 0 && totalCid == changeDue) { // here is the change
    return { Status: "CLOSED", change: changeArray.sort((a, b) => currencyUnits.find(unit => unit[0] === b[0])[1] - currencyUnits.find(unit => unit[0] === a[0])[1]) }; // here is the change
  }

  return { Status: "OPEN", change: changeArray };
};

const formatChange = changeArray => changeArray
  .filter(([unit, amount]) => amount > 0) // here is the change
  .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`) // here is the change
  .join(" "); // here is the change

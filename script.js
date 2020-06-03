const transactionsUl = document.querySelector('[data-transations]');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');


const dummyTransactions = [
  { id: 1, name: 'Bolo de brigadeiro', amount: -20 },
  { id: 2, name: 'Sálario', amount: 300 },
  { id: 3, name: 'Torta de frango', amount: -10 },
  { id: 4, name: 'Violão', amount: 150 },
]

const addTransactionIntoDom = transaction => {
  const operator = transaction.amount < 0 ? '-' : '+';
  const CssClass = transaction.amount < 0 ? 'minus' : 'plus';
  const amountWithoutOperator = Math.abs(transaction.amount)

  const li = document.createElement('li');
  li.classList.add(CssClass);
  li.innerHTML = `
    ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn">x</button>
  `
  transactionsUl.prepend(li)
}

const updateBalanceValues = () => {
  const transationsAmouts = dummyTransactions.map(transaction => transaction.amount)
  const total = transationsAmouts.reduce((acumulator, transaction) => acumulator + transaction, 0).toFixed(2);
  const income = transationsAmouts.filter(valor => valor > 0).reduce((acumulator, valor) => acumulator + valor, 0).toFixed(2);
  const expense = transationsAmouts.filter(valor => valor < 0).reduce((acumulator, valor) => acumulator + valor, 0).toFixed(2);

  balanceDisplay.textContent = `R$ ${total}`;
  incomeDisplay.textContent = `R$ ${income}`;
  expenseDisplay.textContent = `R$ ${Math.abs(expense)}`;

}

const init = () => {
  dummyTransactions.forEach(addTransactionIntoDom);
  updateBalanceValues()
}

init()
const transactionsUl = document.querySelector('[data-transations]');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransacao = form.querySelector('#text');
const inputTransacaoAmount = form.querySelector('#amount');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
  transactions = transactions.filter(transaction => transaction.id !== ID);
  updateLocalStorage();
  init()
}

const addTransactionIntoDom = transaction => {
  const operator = transaction.amount < 0 ? '-' : '+';
  const CssClass = transaction.amount < 0 ? 'minus' : 'plus';
  const amountWithoutOperator = Math.abs(transaction.amount)

  const li = document.createElement('li');
  li.classList.add(CssClass);
  li.innerHTML = `
    ${transaction.name} 
    <span>${operator} R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
  `
  transactionsUl.append(li)
}

const updateBalanceValues = () => {
  const transationsAmouts = transactions.map(transaction => transaction.amount);
  const total = transationsAmouts.reduce((acumulator, transaction) => acumulator + transaction, 0).toFixed(2);
  const income = transationsAmouts.filter(valor => valor > 0).reduce((acumulator, valor) => acumulator + valor, 0).toFixed(2);
  const expense = transationsAmouts.filter(valor => valor < 0).reduce((acumulator, valor) => acumulator + valor, 0).toFixed(2);

  balanceDisplay.textContent = `R$ ${total}`;
  incomeDisplay.textContent = `R$ ${income}`;
  expenseDisplay.textContent = `R$ ${Math.abs(expense)}`;

}

const init = () => {
  transactionsUl.innerHTML = ''
  transactions.forEach(addTransactionIntoDom);
  updateBalanceValues()
}

init();

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

// Gerador de id:
const generatorId = () => Math.round(Math.random() * 1000);

const addToTransactionsArray = (transactionName, transactionAmount) => {
  transactions.push({
    id: generatorId(),
    name: transactionName,
    amount: +transactionAmount
  });
}

const cleanInputs = () => {
  inputTransacao.value = ''
  inputTransacaoAmount.value = ''
}

const handleFormSubmit = event => {
  event.preventDefault();
  const transactionName = inputTransacao.value.trim();
  const transactionAmount = inputTransacaoAmount.value.trim();
  const isSomeInputEmpty = transactionName === '' || transactionAmount === '';

  if (isSomeInputEmpty) {
    alert('Por favor! preencha tanto o nome quanto o valor da transaçao.')
    return;
  }

  addToTransactionsArray(transactionName, transactionAmount)
  init();
  updateLocalStorage();
  cleanInputs()
}

form.addEventListener('submit', handleFormSubmit)
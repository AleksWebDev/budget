//DOM
const form = document.getElementById('form');
const title = document.getElementById('title');
const type = document.querySelector('#type');
const value = document.querySelector('#value');
const incomeList = document.getElementById('incomes-list');
const expensesList = document.getElementById('expenses-list');
const list = document.getElementById('budget-table');
const btnDelete = document.querySelector('.item__remove');
const budgetEL = document.querySelector('#budget');
const totalIncomeEL = document.querySelector('#total-income');
const totalExpenceEl = document.querySelector('#total-expense');
const percentsWrapper = document.querySelector('#expense-percents-wrapper');

const monthEl = document.querySelector('#month');
const yearEl = document.querySelector('#year');
//Data
const budget = JSON.parse(localStorage.getItem('records')) || [];

const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})

calcBudget(budget);
displayMonth();

console.log(priceFormatter.format(10000))

//Adding new record
form.addEventListener('submit', function(e){
    e.preventDefault();

    //Check input 
    if(title.value.trim() === ''){
      title.classList.add('form__input--error');
      return;
    }else{
      title.classList.remove('form__input--error');
    }

    if(value.value.trim() === ''  || +value.value <= 0){
      value.classList.add('form__input--error');
      return;
    }else{
      value.classList.remove('form__input--error');
    }

    //Calculate ID
    let id = 1;
    if(budget.length > 0){
        let lastElement = budget[budget.length - 1];
        let currentID = lastElement.id;
        id = currentID + 1;
    }
    //Forming Data 
    const record = {
        id: id,
        title: title.value,
        type: type.value,
        value: +value.value,
    }
    budget.push(record);

    if(record.type === 'inc'){
        const temp = `
          <li class="budget-list__item item item--income" data-id=${record.id}>
            <div class="item__title">${record.title}</div>
            <div class="item__right">
              <div class="item__amount">+ ${priceFormatter.format(record.value)}</div>
              <button class="item__remove">
                <img src="./img/circle-green.svg" alt="delete" />
              </button>
            </div>
          </li>
        `;
        incomeList.insertAdjacentHTML('afterbegin', temp);
    }else{
        const temp = `
          <li class="budget-list__item item item--expense" data-id=${record.id}>
            <div class="item__title">${record.title}</div>
            <div class="item__right">
              <div class="item__amount">- ${priceFormatter.format(record.value)}</div>
              <button class="item__remove">
                <img src="./img/circle-red.svg" alt="delete" />
              </button>
            </div>
          </li>
        `

        expensesList.insertAdjacentHTML('afterbegin', temp);
    }

    saveToLocalcStorage();
    calcBudget(budget)
})

//Deliting record
document.body.addEventListener('click', function(e){
  //Button remove
  if(e.target.closest('button.item__remove')){
    const targetElement = e.target.closest('li.budget-list__item')
    const id = +targetElement.dataset.id;

    const targetID = budget.find(idx => {
      if(id === idx){
        return true;
      }
    })


    budget.splice(targetID, 1);
    calcBudget(budget)
    targetElement.remove();
    saveToLocalcStorage();
  }
})

//Save to local storage
function saveToLocalcStorage(){
  localStorage.setItem('records', JSON.stringify(budget));
}

//calculate budget
function calcBudget(budget){

  console.log(budget.type);

  //COMMON INCOME
  const totalIncome = budget.reduce(function(total, element){
    if(element.type === 'inc'){
      return total += element.value
    }else{
      return total;
    };
  }, 0);

  //COMMON EXPENCES
  const totalExpence = budget.reduce(function(total, element){
    if(element.type === 'exp'){
      return total += element.value
    }else{
      return total;
    };
  }, 0);

  let totalBudget = totalIncome - totalExpence;

  let expensePercents = 0;

  if(totalIncome){
    expensePercents = Math.round((totalExpence * 100) / totalIncome);
  }

  budgetEL.innerHTML = '+ ' +  priceFormatter.format(totalBudget);
  totalIncomeEL.innerHTML = '+ ' + priceFormatter.format(totalIncome);
  totalExpenceEl.innerHTML = '+ ' + priceFormatter.format(totalExpence);

  if(expensePercents) {
    const bage = `<div class="badge">${expensePercents}%</div>`

    percentsWrapper.innerHTML = bage;
  }else{
    percentsWrapper.innerHTML = ' ';
  } 
}


function displayMonth(){
  const now = new Date();
  const year = now.getFullYear();

  const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
    month: 'long'
  });


  const month = timeFormatter.format(now);
  monthEl.innerHTML = month;
  yearEl.innerHTML = year;
}

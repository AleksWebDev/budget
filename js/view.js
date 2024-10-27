const elements = {
    form: document.getElementById('form'),
    title: document.getElementById('title'),
    type: document.querySelector('#type'),
    value: document.querySelector('#value'),
    incomeList: document.getElementById('incomes-list'),
    expensesList: document.getElementById('expenses-list'),
    list: document.getElementById('budget-table'),
    btnDelete: document.querySelector('.item__remove'),
    budgetEL: document.querySelector('#budget'),
    totalIncomeEL: document.querySelector('#total-income'),
    totalExpenceEl: document.querySelector('#total-expense'),
    percentsWrapper: document.querySelector('#expense-percents-wrapper'),
    monthEl: document.querySelector('#month'),
    yearEl: document.querySelector('#year')
}

const renderRecords = (data) => {
    if(data){
        if(data.type === 'inc'){
            const temp = `
                <li class="budget-list__item item item--income" data-id="${data.id}">
                <div class="item__title">${data.title}</div>
                <div class="item__right">
                  <div class="item__amount">+ ${data.value}</div>
                  <button class="item__remove">
                    <img src="./img/circle-green.svg" alt="delete" />
                  </button>
                </div>
              </li>
            `
    
            elements.incomeList.insertAdjacentHTML('beforeend', temp);
        }else{
            const temp = `
                <li class="budget-list__item item item--expense" data-id="${data.id}">
                <div class="item__title">${data.title}</div>
                <div class="item__right">
                  <div class="item__amount">- ${data.value}</div>
                  <button class="item__remove">
                    <img src="./img/circle-red.svg" alt="delete" />
                  </button>
                </div>
              </li>
            `
    
            elements.expensesList.insertAdjacentHTML('beforeend', temp);
        }
    }
}

const resetForm = () => {
    elements.form.reset();
}

const deleteItem = (target) => {
    target.remove();
}

const displayRecords = (data) => {

    const priceFormatter = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    })

    elements.totalIncomeEL.innerHTML = priceFormatter.format(data.totalIncome);
    elements.totalExpenceEl.innerHTML = priceFormatter.format(data.totalExpences);
    elements.budgetEL.innerHTML = priceFormatter.format(data.totalBudget);
}

const displayMonthAndYear = () =>{

    const now = new Date();
    const year = now.getFullYear();

    const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
        month: 'long',
    });

    const month = timeFormatter.format(now);
    elements.monthEl.innerHTML = month;
    elements.yearEl.innerHTML = year;
}

export default {elements, resetForm, renderRecords, deleteItem, displayRecords, displayMonthAndYear}
const budget = JSON.parse(localStorage.getItem('records')) || [];

const forgeData = (title, type, value) => {

    let id = 1;

    if(budget.length > 0){
        let lastElement = budget[budget.length - 1];
        let currentId = lastElement.id;
        id = currentId + 1;
    }

    const data = {
        id: id,
        type: type,
        title: title,
        value: parseInt(value),
    }

    budget.push(data);
    saveToLS();

    return data;
}

const saveToLS = () => {
    localStorage.setItem('records', JSON.stringify(budget));
}

const deleteItem = (id) => {
    const targetID = budget.find(item => {
        if(item.id === id){
            return true;
        }
    })

    budget.splice(targetID, 1);
    calcBudget();
    saveToLS();
}

const calcBudget = () => {

    let totalIncome = 0;
    let totalExpences = 0;
    let totalBudget = 0;
    let percentExpences = 0;

    budget.forEach(element => {

        if(element.type === 'inc'){
            totalIncome = totalIncome + element.value;
        }else{
            totalExpences = totalExpences + element.value;
        }

    });

    totalBudget = totalIncome - totalExpences;

    if(totalIncome){
        percentExpences = Math.round((totalExpences * 100) / totalIncome);
    }

    return {
        totalIncome, totalExpences, totalBudget, percentExpences,
    }
}

export default {budget, forgeData, saveToLS, deleteItem, calcBudget};
import view from './view.js';
import model from './model.js';

window.addEventListener('DOMContentLoaded', function(){
    model.budget.forEach(item => {
        view.renderRecords(item);
    })

    view.displayMonthAndYear();
    const recordsBudget = model.calcBudget();
    view.displayRecords(recordsBudget);
})

view.elements.form.addEventListener('submit', function(e){

    e.preventDefault();

    const title = view.elements.title.value;
    const type = view.elements.type.value;
    const value = view.elements.value.value;

    const data = model.forgeData(title, type, value);
    view.renderRecords(data);
    view.resetForm();
    //Display data 
    const recordsBudget = model.calcBudget();
    view.displayRecords(recordsBudget);
    model.saveToLS();
})

view.elements.list.addEventListener('click', function(e){
    if(e.target.closest('.item__remove')){
        const targetElem = parseInt(e.target.parentElement.parentElement.parentElement.dataset.id);
        const targetElementDOM = e.target.parentElement.parentElement.parentElement;
        model.deleteItem(targetElem);
        const data = model.calcBudget();
        view.displayRecords(data);
        view.deleteItem(targetElementDOM);
    }
})


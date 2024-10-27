import view from './view.js';
import model from './model.js';

view.elements.form.addEventListener('submit', function(e){

    e.preventDefault();

    const title = view.elements.title.value;
    const type = view.elements.type.value;
    const value = view.elements.value.value;

    const data = model.forgeData(title, type, value);
    view.renderRecords(data);
    view.resetForm();
    //Display data 
    model.calcBudget();
})

view.elements.list.addEventListener('click', function(e){
    if(e.target.closest('.item__remove')){
        const targetElem = parseInt(e.target.parentElement.parentElement.parentElement.dataset.id);
        const targetElementDOM = e.target.parentElement.parentElement.parentElement;
        model.deleteItem(targetElem);
        view.deleteItem(targetElementDOM);
    }
})


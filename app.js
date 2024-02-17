let cardName = document.getElementsByClassName('card-name')[0];
let cardNameInput = document.getElementById('name');
let cardNumber = document.getElementsByClassName('card-number')[0];
let cardNumberInput = document.getElementById('number');
let expDate = document.getElementsByClassName("exp-date")[0];
let dateInputMM = document.getElementById('exp-mm');
let dateInputYY = document.getElementById('exp-yy');
let cvc = document.getElementsByClassName('cvc')[0];
let cvcInput = document.getElementById('cvc');
let form = document.getElementsByClassName('form')[0];
let reset = document.getElementById('reset');

cardNameInput.addEventListener("input", controlNameInput);
cardNumberInput.addEventListener("input", controlNumberInput);

dateInputMM.addEventListener('input', controlDateMM);
dateInputYY.addEventListener('input', controlDateYY);

cvcInput.addEventListener('input', controlCVC);

form.addEventListener('submit', controlForm);

reset.addEventListener('click', resetForm);

function resetForm(e){
    document.getElementsByClassName('success')[0].style.display = 'none';
    form.style.display ='flex';
    cardName.innerHTML = "JANE APPLESEED";
    cardNumber.innerHTML = "0000 0000 0000 0000"; 
    expDate.innerHTML = '00/00'
    cvc.innerHTML = '000';
    form.reset();
}

function controlForm(e){
    e.preventDefault();
    form.style.display ='none';
    document.getElementsByClassName('success')[0].style.display = 'flex';
}

function controlCVC(e){
    let input = e.target.value;
    input = justTwoNumbersChecker(input);
    if(input == null){
        cvc.innerHTML = '000';    
        cvcInput.value = '';
    }
    else{
        if(input.length > 3){
            input = input.slice(0,3);
        }
        cvc.innerHTML = input.join('');
        cvcInput.value = input.join('');
    }
}

function controlDateMM(e){
    let input = e.target.value;
    input = dateChecker(input);
    if(input == null){
        if(dateInputYY.value == ''){
            expDate.innerHTML = '00/00'
            dateInputMM.value = '';
        }
        else{
            dateInputMM.value = '';
            expDate.innerHTML = `00/${dateInputYY.value}`
        }
    }
    else{
        if(dateInputYY.value == ''){
            expDate.innerHTML = `${input}/00`;
        }
        else{
            expDate.innerHTML = `${input}/${dateInputYY.value}`
        }
        dateInputMM.value = input;
    }
}

function controlDateYY(e){
    let input = e.target.value;
    input = justTwoNumbersChecker(input);
    if(input == null){
        if(dateInputMM.value == ''){
            expDate.innerHTML = '00/00'
            dateInputYY.value = '';
        }
        else{
            dateInputYY.value = '';
            expDate.innerHTML = `${dateInputMM.value}/00`
        }
    }
    else{
        if(input.length > 2){
            input = input.slice(0,2);
        }
        if(dateInputMM.value == ''){
            expDate.innerHTML = `00/${input.join('')}`;
        }
        else{
            expDate.innerHTML = `${dateInputMM.value}/${input.join('')}`
        }
        dateInputYY.value = input.join('');
    }
}

function controlNumberInput(e){
    let input = e.target.value;
    input = numberChecker(input);
    if(input == null){
        cardNumber.innerHTML = "0000 0000 0000 0000";    
        cardNumberInput.value = '';
    }
    else{
        if(input.length > 4){
            input = input.slice(0,4);
        }
        cardNumber.innerHTML = input.join(' ');
        cardNumberInput.value = input.join('');
    }
}

function controlNameInput(e){
    let input = e.target.value;
    input = nameChecker(input);
    if(input == ''){
        cardName.innerHTML = "JANE APPLESEED";    
    }
    else{
        cardName.innerHTML = input.toUpperCase();
    }
    cardNameInput.value = input;
}

function nameChecker(s){
    let regex = /[a-zA-Z ]*/g;
    return s.match(regex).join('');
}

function numberChecker(s){
    let regex = /[0-9]{1,4}/g;
    return s.match(regex);
}

function dateChecker(s){
    let regex = /^(0?[1-9]|1[0-2])$/g;
    return s.match(regex);
}

function justTwoNumbersChecker(s){
    let regex = /[0-9]/g;
    return s.match(regex);
}
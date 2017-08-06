
/*The global variables*/
const first = $('#name');
const title = $('#title');
const design = $('#design');
const activities = $('.activities');
const payment = $('#payment');
const form = $("#form");
let amount = 0;
const cardNumber = $('#cc-num');
const zipCode = $('#zip');
const cvv = $('#cvv');
const mail = $('#mail');
let selected;

/*Select the first input as the page loads */
$(document).ready( () => {
    first.select();
    $('.colors').remove();
    $('#other-title').remove();
});

/*If you choose 'other' from the dropdown, a new input is added,
if you recheck something else the input is removed */
title.on('change', (e) => {
    const target = e.target;
    const newInput = $('<input type="text" id="other-title" name="user_jobRole" placeholder="Your Job Role">');
    if(target.value === 'other' ) { //if we select 'other' the input is added and selected
        title.after( newInput);
        newInput.select();
    } else { //if we select something else, we remove the 'other' input if it exists
        if( $('#other-title')) {
            $('#other-title').remove();
        }
    }
});

/*Reveal different t-shirt color depending on a theme selection */
design.on('change', (e) => {
    const target = e.target;
    if(target.value === 'js puns') { //if we select the 'JS Punt' theme we got selected the following colors
            $('.color').remove();
            newInput = $('<label class="color" class="color" for="color">Color:</label> <select class="color" > ' +
            ' <option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option> ' +
            ' <option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> ' + 
            ' <option value="gold">Gold (JS Puns shirt only)</option> ' + 
            ' </select>');
            $('#colors-js-puns').after(newInput);

    } else if (target.value === 'heart js') { //if we select the 'Heart JS' theme we got selected the following colors
            $('.color').remove();
            newInput = $('<label class="color" for="color">Color:</label> <select class="color" > ' +
            ' <option value="tomato">Tomato (I &#9829; JS shirt only)</option> ' +
            ' <option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> ' + 
            ' <option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>  ' + 
            ' </select>');
            $('#colors-js-puns').after(newInput);
    } else {
            $('.color').remove(); // if we select 'select theme' again from the drop down, the colors dropdown is removed
    }
});

/* on click event for the activities section,
it prevents multiple events with the same date and time to be selected at the same time
It also calculates the cost for the selected events */
activities.on('click', (e) => {
    const target = e.target;
    const parent = target.parentNode;
    let string = parent.textContent.substr(parent.textContent.length - 3); // this takes the last 3 characters from the checkbox text contents
    let price = parseInt(string); // transform the last 3 chars from string to integer, and use it as a price of the event

    if(target.className === 'checkbox'){
        if($('#amountValue')) {
            $('#amountValue').remove();
        } // check if there is already a amount span, so we avoid adding the amount several times
        if($('#checkboxError')) {
            $('#checkboxError').remove();
        } // check the same thing for the error if no events  are selected
            if(target.checked) { // if we check a checkbox, prevent same date and time events to be selected and add the price of the event in the full amount
                if(target.name === 'js-frameworks'){
                    $('#checkbox4').attr('disabled', true);
                } else if (target.name === 'js-libs') {
                    $('#checkbox5').attr('disabled', true);
                } else if (target.name === 'express') {
                    $('#checkbox2').attr('disabled', true); 
                } else if (target.name === 'node') {
                    $('#checkbox3').attr('disabled', true);
                }
            amount += price;
            } else { //if we uncheck the check box enable to check the events that were disabled and remove the price from the full amount
                if(target.name === 'js-frameworks'){
                    $('#checkbox4').removeAttr('disabled', true);
                } else if (target.name === 'js-libs') {
                    $('#checkbox5').removeAttr('disabled', true);
                } else if (target.name === 'express') {
                    $('#checkbox2').removeAttr('disabled', true); 
                } else if (target.name === 'node') {
                    $('#checkbox3').removeAttr('disabled', true);
                }
            amount -= price;
            }
            let amountValue = $('<span id="amountValue" class="amount">Total: ' + amount + ' $</span>');
            activities.after(amountValue); 
    }
        if ($("#form input:checkbox:checked").length === 0) //if no checkboxes are selected, add an error message
        { 
            $('#amountValue').remove();
        }
});

/*Show a payment option depending on a dropdown selection */
payment.on('change', (e) => {
    const target = e.target;
    selected = target.value;
    if(target.value === 'credit card') { //if we select to pay with a credit card we show only the options for credit card payment
        if($('#paymentError')) {
            $('#paymentError').remove();
        }
        $("#credit-card").show();
        $("#register").show();
        $("#paypal").hide();
        $("#bitcoin").hide();
    } else if (target.value === 'paypal') { //if we select to pay with paypal we show only the options paypal payment
        if($('#paymentError')) {
            $('#paymentError').remove();
        }
        $("#paypal").show();
        $("#register").show();
        $("#credit-card").hide();
        $("#bitcoin").hide();
    } else if (target.value === 'bitcoin') { //if we select to pay with bitcoins we show only the options for bitcoin payment
        if($('#paymentError')) {
            $('#paymentError').remove();
        }
        $("#bitcoin").show();
        $("#register").show();
        $("#credit-card").hide();
        $("#paypal").hide();
    } else { // else if we select select payment option again, all payment options show again
        $("#bitcoin").show();
        $("#register").show();
        $("#credit-card").show();
        $("#paypal").show();
    }
});

/*Real time credit card number validation */
cardNumber.on('keyup', (e) => {
    const target = e.target;
    const error = $('<span id=realtimeVal>Insert between 13 and 16 digits!</span>');
    const errorNumeric = $('<span id="cardErrornum">Only numbers are accepted!</span>');
    if($('#realtimeVal')) {
            $('#realtimeVal').remove();
    }
    if($('#cardErrornum')) {
        $('#cardErrornum').remove();
    }
    if( target.value.length < 13  || target.value.length > 16 ) { //if the input is not log enough or it's too long we display an error
        $('#credit-card').after(error);
        target.style.border = 'red solid 1px';
    } else if( isNaN(target.value)) { //if we input anything but number we display error
        $('#credit-card').after(errorNumeric);
        target.style.border = 'red solid 1px';
    } else {
        target.style.border = 'green solid 1px';
    }
});
/*Real time zip code validation */
zipCode.on('keyup', (e) => {
    const target = e.target;
    const errorLength = $('<span id="zipCodeError">Insert 5 digits!</span>');
    const errorNumeric = $('<span id="zipCodeErrornum">Only numbers are accepted!</span>');
    if($('#zipCodeError')) {
        $('#zipCodeError').remove();
    }
    if($('#zipCodeErrornum')) {
        $('#zipCodeErrornum').remove();
    }
    if( target.value.length !== 5 ) {//if the input is not log enough or it's too long we display an error
        $('#credit-card').after(errorLength);
        target.style.border = 'red solid 1px';
    }else if( isNaN(target.value)) { //if we input anything but number we display error
        $('#credit-card').after(errorNumeric); 
        target.style.border = 'red solid 1px';
    } else {
        target.style.border = 'green solid 1px';
    }
});
/*Real time cvv number validation */
cvv.on('keyup', (e) => {
    const target = e.target;
    const errorLength = $('<span id="cvvError">Insert 3 digits!</span>');
    const errorNumeric = $('<span id="cvvErrornum">Only numbers are accepted!</span>');
    if($('#cvvError')) {
        $('#cvvError').remove();
    }
    if($('#cvvErrornum')) {
        $('#cvvErrornum').remove();
    }
    if( target.value.length !== 3 ) { //if the input is not log enough or it's too long we display an error
        $('#credit-card').after(errorLength);
        target.style.border = 'red solid 1px';
    } else if( isNaN(target.value)) { //if we input anything but number we display error
        $('#credit-card').after(errorNumeric);
        target.style.border = 'red solid 1px';
    } else {
        target.style.border = 'green solid 1px';
    }
});
/*Email field validation */
mail.on('change', (e) => {
    const target = e.target;
    const error = $('<span id="mailError">Insert correct email address! </span>');
    if($('#mailError')) {
            $('#mailError').remove();
        }
    if(target.value.match('.com$') && target.value.indexOf('@') !== -1){ //check if the email contans the '@' sign and '.com' on the end of the input
        if($('#mailError')) { //if they are contained in the input, we remove the error message if it exists and give the input a green border
            $('#mailError').remove();
        }
        target.style.border = "solid green 1px"; 
    } else { // else we display the error message and give the input a red border
        target.style.border = "solid red 1px";
        mail.after(error);
    }
});
/*on submit event on the form */
form.on('submit', (e) => {
    if($('#checkboxError')) {
        $('#checkboxError').remove();
    }
    if($('#paymentError')) {
        $('#paymentError').remove();
    }
    if($('#noMailError')) {
            $('#noMailError').remove();
        }
    const name = $('#name');
    const nameDiv = $('#nameError');
    const nameErrorMessage = $('<span id="error">Name field can\'t be blank.</span>');
    const noCheckboxesError = $('<span id="checkboxError">You must check at least one checkbox!</span>');
    const noMailError = $('<span id="noMailError">E-mail field can\'t be blank.</span>');
    if( name.val() === '') { //if the name field is empty, display an error and prevent the form from submittion
        e.preventDefault();
        if(nameDiv.children().length <= 2) {
            name.after(nameErrorMessage);
        }  
    } else if($('#error')) {
        $('#error').remove();
    }  
    if( mail.val() === '') { //if email field is empty, display an error and prevent the form from submittion
        e.preventDefault();
        if($('#noMailError')) {
            $('#noMailError').remove();
        }
        mail.after(noMailError);
    }
    const emptyCard = $('<span id="cardempty">Insert a card number! </span>');
    if($('#cardempty')) {
            $('#cardempty').remove();
        }
    if(selected === 'credit card') {
        if( cardNumber.val() === '') { //if card number is empty, display an error and prevent the form from submittion
            e.preventDefault();
            payment.after(emptyCard);
        }
    }    
    const emptyCvv = $('<span id="cvvempty">Insert a cvv code! </span>');
    if($('#cvvempty')) {
            $('#cvvempty').remove();
        }
    if(selected === 'credit card') {
        if( cvv.val() === '') { //if cvv code is empty, display an error and prevent the form from submittion
            e.preventDefault();
            payment.after(emptyCvv);
        }
    }    
    const emptyZip = $('<span id="zipempty">Insert a zipCode! </span>');
    if($('#zipempty')) {
            $('#zipempty').remove();
        }
    if(selected === 'credit card') {
        if( zipCode.val() === '') { //if zip code is empty, display an error and prevent the form from submittion
            e.preventDefault();
            payment.after(emptyZip);
        }
    }    
    if ($("#form input:checkbox:checked").length === 0) //if no checkboxes checked, display an error and prevent the form from submittion
    {
        e.preventDefault();
        activities.after(noCheckboxesError);
    }
    if($('#payment').val() === 'select_method') { //if no payment option selected, display an error and prevent the form from submittion
        e.preventDefault();
        const howToPay = $('<span id="paymentError">      You must select a payment option!<span>');
        payment.after(howToPay);
    }
});

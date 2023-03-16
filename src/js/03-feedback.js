'use strict';
import throttle from 'lodash.throttle'

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

const STORAGE_KEY = "feedback-form-state";
const formData = {};

refs.form.addEventListener('input', throttle(handleFormInput, 500));

refs.form.addEventListener('submit', handleFormSubmit);

function handleFormInput (evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function handleFormSubmit (evt) {
    if(evt.target.elements.email.value !== "" && evt.target.elements.message.value !== "") {
        const output = {
            'email': evt.target.elements.email.value, 
            'message': evt.target.elements.message.value
        };
        console.log(output);
        evt.preventDefault();
        evt.target.reset();
        localStorage.removeItem(STORAGE_KEY);
    } else {
       alert('Будь-ласка заповніть усі поля.'); 
    }
}

populateForm();

function populateForm () {
    const parsedInputs = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(parsedInputs) {
        refs.input.value = parsedInputs.email;
        refs.textarea.value = parsedInputs.message;
    }
}
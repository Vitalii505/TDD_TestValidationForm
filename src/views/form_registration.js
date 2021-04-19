import { el, mount } from "redom";

export class registrationForm {
    #elements;
    #email;
    #password;
    #repeatedPassword;
    #button;
    emailStatus;

    constructor() {
        this.#elements = el("div#container", "Registration Form");
        this.#email = el("input#email", "Email");
        this.#password = el("input#password", "Password");
        this.#repeatedPassword = el("input#repeatedPassword", "Repeat password");
        this.#button = el("button#btnRegister", { disabled: true, value: "Register an account" });
        
        mount(this.#elements, this.#email);
        mount(this.#elements, this.#password);
        mount(this.#elements, this.#repeatedPassword);
        mount(this.#elements, this.#button);
        this.#button.addEventListener("click", this.onClickedForRegister);
        this.#email.addEventListener('keyup', this.EmailValidation);
        this.#password.addEventListener('keyup', this.PasswordValidation);
        this.#repeatedPassword.addEventListener('keyup', this.RepeatPassword);
        this.#elements.addEventListener('keyup', this.inValidState);
    };
    get elements() {
        return this.#elements;
    };
    get emailValue() {
        return this.#email.value;
    };
    set emailValue (email) {
        this.#email.value = email;
    }
    get passwordValue() {
        return this.#password.value;
    };
    set passwordValue (password) {
        this.#password.value = password;
    };
    get repeatPasswordValue() {
        return this.#repeatedPassword.value;
    };
    set repeatPasswordValue (password) {
        this.#repeatedPassword.value = password;
    };

    EmailValidation() {
       let inputEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if(inputEmail.test(this.emailValue)){
           this.emailStatus = 'Your email is valid';
           return true;
       } else {
          this.emailStatus = 'Your email is not valid';
          return false;
       }
    };

    PasswordValidation(){
        let nonconformityText = "";
        if(this.passwordValue.length < 8) {
            nonconformityText += " Password not be less, than 8 symbols </br>";
        }
        let containNumber = /\d/;
        if(!containNumber.test(this.passwordValue)) {
            nonconformityText = nonconformityText +  ' Password contain a number </br>'
        }
        let containLowerCase = /[a-z]/;
        if(!containLowerCase.test(this.passwordValue)){
            nonconformityText = nonconformityText +  ' Password contains an lowercase English character </br>'
        }

        let containUpperCase = /[A-Z]/;
        if(!containUpperCase.test(this.passwordValue)){
            nonconformityText = nonconformityText +  ' Password contains an uppercase English character </br>'
        }

        let specialSymbol = /[!@#$%^&*]/;
        if(!specialSymbol.test(this.passwordValue)){
            nonconformityText = nonconformityText +  ' Your password should contain special symbol. </br>'
        }

        if(nonconformityText.length < 2) {
            nonconformityText = 'Password is acceptable';
            return true;
        } else {
            return false;
        }
    };

    RepeatPassword() {
        let nonconformityText = "";
        if(this.passwordValue !== this.repeatPasswordValue){
            nonconformityText = 'Passwords do not match';
            return false;
        } else {
            return true;
        }
    };

    onClickedForRegister() {
        if (!this.EmailValidation()) {
            return false;
        };
        if (!this.PasswordValidation()) {
            return false;
        }
        if (!this.RepeatPassword()) {
            return false;
        }
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("repeatedPassword").value = "";
        document.getElementById("btnRegister").disabled = false;

        alert("Create new account");
    };

    inValidState(){
        if(this.EmailValidation() === true && this.PasswordValidation() === true && this.RepeatPassword() === true) {
            this.#button.disabled = false;
        }
    };
}


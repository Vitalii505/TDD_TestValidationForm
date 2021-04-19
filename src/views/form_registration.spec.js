import { registrationForm } from "./form_registration";

let FORM;
beforeEach(() => {
    FORM = new registrationForm();
    document.body.innerHTML = "";
    document.body.append(FORM.elements);
});

    describe('getRegistrationForm', () => {
        it("should render div#container", () => {
            expect.assertions(1);
            const CONTEINER = document.getElementById("container");
            expect(CONTEINER).toBeTruthy();
        });
        it("should render input#email", () => {
            expect.assertions(1);
            const EMAIL = document.getElementById("email");
            expect(EMAIL).toBeTruthy();
        });
        it("should render input#password", () => {
            expect.assertions(1);
            const PASSWORD = document.getElementById("password");
            expect(PASSWORD).toBeTruthy();
        });
        it("should render input#repeatedPassword", () => {
            expect.assertions(1);
            const REPEATED_PASSWORD = document.getElementById("repeatedPassword");
            expect(REPEATED_PASSWORD).toBeTruthy();
        });
        it("should render button#btnRegister", () => {
            expect.assertions(1);
            const BUTTON = document.getElementById("btnRegister");
            expect(BUTTON).toBeTruthy();
        });
    });
    describe('EmailValidation', () => {
        it("should do email verification", () => {
            expect.assertions(1);
            const VALID_EMAIL = "Vitaliyalimov505@gmail.com"; 
            document.getElementById("email").value = VALID_EMAIL;
            const EMAIL_VALUE = document.getElementById("email").value;
            expect(FORM.EmailValidation(EMAIL_VALUE)).toBe(true);
        });
        it("should do email mismatch check", () => {
            expect.assertions(3);
            const ENTERED_EMAIL = ["@gmail.com", "Vitaliyalimov505#gmail.com", "Vitaliygmail.com"];
            ENTERED_EMAIL.forEach(elem => {
                document.getElementById("email").value = elem;
                const EMAIL_VALUE = document.getElementById("email").value;
                expect(FORM.EmailValidation(EMAIL_VALUE)).toBe(false);
            });
        });
    });

    describe('PasswordValidation', () => {
        it("should display a message about password length mismatch", () => {
            expect.assertions(1);
            FORM.passwordValue = "vitalii";
            FORM.PasswordValidation();
            expect(FORM.PasswordValidation()).toBe(false);
        });
        it("should not render message about length, if its correct", () => {
            expect.assertions(1);
            FORM.passwordValue = 'vitaliiAlimov';
            FORM.PasswordValidation();
            expect(FORM.PasswordValidation()).not.toContain('Password not be less, than 8 symbols');
        });
        it("should render message, that password should contain number", () => {
            expect.assertions(1);
            FORM.passwordValue = "vitalii";
            FORM.PasswordValidation();
            expect(FORM.PasswordValidation()).toBe(false);
        });
        it('should not display a message if the password entered has a digit', () => {
            expect.assertions(1);
            FORM.passwordValue = "vitalii505";
            FORM.PasswordValidation();
            expect(FORM.PasswordValidation()).not.toEqual(expect.stringContaining('Password contain a number'));
        });
        it('should display a message about what the password should contain lowercase symbol', () => {
            expect.assertions(1);
            FORM.passwordValue = "VITALII505";
            FORM.PasswordValidation();
            expect(FORM.PasswordValidation()).toBe(false);
        });
        it('no message should be displayed if the password contains an lowercase character', () => {
            expect.assertions(1);
            FORM.passwordValue = "Vitalii505";
            FORM.PasswordValidation();
            expect(FORM.PasswordValidation()).not.toEqual(expect.stringContaining('Your password should contain english symbol lowercase'));
        });
        it('should display a message about what the password should contain uppercase symbol', () => {
            expect.assertions(1);
            FORM.passwordValue = "vitalii505";
            FORM.PasswordValidation();
            expect(FORM.PasswordValidation()).toBe(false);
        });
        it('no message should be displayed if the password contains an uppercase character', () => {
            expect.assertions(1);
            FORM.passwordValue = "Vitalii505";
            FORM.PasswordValidation();
            expect(FORM.PasswordValidation()).not.toEqual(expect.stringContaining('Password contains an uppercase English character'));
        });
        it('should render message, that password should contain special symbol if it does not has', () => {
            expect.assertions(1);
            FORM.passwordValue = "Vitalii505";
            FORM.PasswordValidation();
            expect(FORM.PasswordValidation()).toBe(false);
        });
        it('should not render message, that password should contain special symbol, if it has', () => {
            expect.assertions(1);
            FORM.passwordValue = "Vitalii@505";
            FORM.PasswordValidation();
            expect(FORM.PasswordValidation()).not.toEqual(expect.stringContaining('Password contain special symbol'));
        });
        it('check if the password is acceptable', () => {
            expect.assertions(1);
            FORM.passwordValue = "Vitalii@505";
            FORM.PasswordValidation();
            expect(FORM.PasswordValidation()).toBe(true);
        });
    });

    describe('Repeat Password', () => {
        it('should display an error message matching the password entered', () => {
            expect.assertions(1);
            FORM.passwordValue = "Vitalii@505";
            FORM.repeatPasswordValue = "Vitalii505";
            expect(FORM.RepeatPassword()).toBe(false);
        });
        it('should not render error message', () => {
            expect.assertions(1);
            FORM.passwordValue = "Vitalii@505";
            FORM.repeatPasswordValue = "Vitalii@505";
            expect(FORM.RepeatPassword()).toBe(true);
        });
    });
    describe("Button registers the user", () => {
        it("should be disabled initially", () => {
            expect.assertions(1);
            const BUTTON = document.getElementById("btnRegister");
            expect(BUTTON.disabled).toBe(true);
        });
        it("should call onClickedForRegister() method if clicked", () => {
            expect.assertions(1);
            document.body.innerHTML = "";
            const clickOnSpy = jest
                .spyOn(registrationForm.prototype, "onClickedForRegister")
                .mockImplementation(() => {
                    return true;
                });
            const DUPLICATE_class = new registrationForm();
            document.body.append(DUPLICATE_class.elements);
            const BUTTON = document.getElementById("btnRegister");
            BUTTON.disabled = false;
            BUTTON.click();
            expect(clickOnSpy).toBeCalled();
        });
        it('should work if email, password, repeat password are valid', () => {
            expect.assertions(1);
            FORM.emailValue = 'vitaliyalimov505@gmail.com';
            FORM.passwordValue = "Vitalii@505";
            FORM.repeatPasswordValue = "Vitalii@505";
            FORM.inValidState();
            const BUTTON = document.getElementById('btnRegister');
            expect(BUTTON.disabled).toBe(false);
        });
        // it('should call inValidState() method after keyUp', () => {
        //     expect.assertions(1)
        //     document.body.innerHTML = "";
        //     const KEY_UP = jest.spyOn(registrationForm.prototype, 'inValidState').mockImplementation(() => {
        //         return true;
        //     });
        //     const DUPLICATE_class = new registrationForm();
        //     document.body.append(DUPLICATE_class.elements);
        //     const elements = document.getElementById("container");
        //     triggerEvent(elements, "keyup");
        //     expect(KEY_UP).toBeCalled();
        // });
    });

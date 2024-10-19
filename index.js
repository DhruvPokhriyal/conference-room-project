const closeButtons = Array.from(document.querySelectorAll(".close-button"));
const signUpForm = Array.from(document.querySelectorAll(".sign-up"));
for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", () => {
        signUpForm[i].reset();
    });
}

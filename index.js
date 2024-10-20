const ADMIN_MAIL = "admin@sample.com";
const ADMIN_PASSWORD = "admin@123";

const closeButtons = Array.from(document.querySelectorAll(".close-button"));
const closeButtonIcons = Array.from(document.querySelectorAll(".btn-close"));
const signUpForm = Array.from(document.querySelectorAll(".sign-up"));
const adminRoleButton = Array.from(document.querySelectorAll(".admin-role"));
for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", () => {
        signUpForm[i].reset();
    });
    closeButtonIcons[i].addEventListener("click", () => {
        signUpForm[i].reset();
    });
}

for (let i = 0; i < signUpForm.length; i++) {
    let form = signUpForm[i];
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const mail = form.querySelector(".mail").value;
        const pswd = form.querySelector(".password").value;
        if (mail === "" || pswd === "") {
            alert("Ensure you input a value in both fields!");
        } else if (mail === ADMIN_MAIL && pswd === ADMIN_PASSWORD) {
            alert("Form Successfully Submitted");
            closeButtons[i].click();
            if (form.id === "sign-up-1") {
                document.querySelector("#add-room button.admin-role").click();
            }

            if (form.id === "sign-up-2") {
                document
                    .querySelector("#remove-room button.admin-role")
                    .click();
            }
        } else {
            alert("Invalid Info\n");
        }

        form.reset();
    });
}

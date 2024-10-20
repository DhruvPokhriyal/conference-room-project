const ADMIN_MAIL = "admin@sample.com";
const ADMIN_PASSWORD = "admin@123";
const roomList = [];

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

const roomModification = Array.from(
    document.querySelectorAll(".room-modification")
);

for (let i = 0; i < roomModification.length; i++) {
    let form = roomModification[i];
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const buildingName = form.querySelector(".bname").value;
        const roomId = form.querySelector(".rid").value;
        if (buildingName === "" || roomId === "") {
            alert("Ensure you input a value in both fields!");
        } else {
            if (form.id == "room-addition") {
                const roomInfo = { buildingName: roomId };
                roomList.push(roomInfo);
                alert("Room Successfully Added");
                document.querySelector("#add-room-close").click();
            }
            if (form.id == "room-removal") {
            }
        }

        form.reset();
    });
}

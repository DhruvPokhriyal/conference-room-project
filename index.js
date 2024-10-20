const ADMIN_MAIL = "admin@sample.com";
const ADMIN_PASSWORD = "admin@123";
let roomList = [];
let reservedTimeSlots = {};
let availableRoom = [];

const closeButtons = Array.from(document.querySelectorAll(".close-button"));
const closeButtonIcons = Array.from(document.querySelectorAll(".btn-close"));
const signUpForm = Array.from(document.querySelectorAll(".sign-up"));
const adminRoleButton = Array.from(document.querySelectorAll(".admin-role"));

const modals = Array.from(document.querySelectorAll(".modal"));
for (let modal of modals) {
    closeOptions = Array.from(
        modal.querySelectorAll(".close-button, .btn-close")
    );
    for (let option of closeOptions) {
        option.addEventListener("click", () => {
            modal.querySelector("form").reset();
        });
    }
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
            alert("Sign Up Successfully");
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

        let buildingName = form.querySelector(".bname").value;
        let roomId = form.querySelector(".rid").value;
        if (buildingName === "" || roomId === "") {
            alert("Ensure you input a value in both fields!");
        } else {
            if (form.id == "room-addition") {
                let roomInfo = [buildingName, roomId];
                roomList.push(roomInfo);
                alert("Room Successfully Added");
                document.querySelector("#add-room-close").click();
            }
            if (form.id == "room-removal") {
                let flag = false;
                let index;
                for (let i = 0; i < roomList.length; i++) {
                    room = roomList[i];
                    if (room[0] == buildingName && room[1] == roomId) {
                        flag = true;
                        index = i;
                        break;
                    }
                }
                if (flag) {
                    roomList.splice(index, 1);
                    alert("Room Successfully Removed");
                    document.querySelector("#remove-room-close").click();
                } else {
                    alert("Room Not Found !!");
                    form.reset();
                }
            }
        }

        form.reset();
    });
}

const displayRoom = document.querySelector("#room-list");
const displayRoomList = displayRoom.querySelector("p");

document.querySelector("#display-room").addEventListener("click", () => {
    if (roomList.length) {
        displayRoomList.textContent = "";
        for (let room of roomList) {
            let roomInfo = `${room[0]}-${room[1]}\n`;
            displayRoomList.textContent += roomInfo;
        }
    }
});

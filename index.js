const ADMIN_MAIL = "admin@sample.com";
const ADMIN_PASSWORD = "admin@123";
let roomList = [
    ["Gagan", "012"],
    ["Safari", "006"],
];
let reservedTimeSlots = [];
let availableRoom = [];

const displayRoom = document.querySelector("#room-list");
const displayRoomList = displayRoom.querySelector("ul");

function roomDisplay() {
    if (roomList.length) {
        displayRoomList.textContent = "";
        for (let room of roomList) {
            let entry = document.createElement("li");
            let roomInfo = `${room[0]},${room[1]}\n`;
            entry.textContent = roomInfo;
            displayRoomList.appendChild(entry);
        }
    } else {
        displayRoomList.textContent = "No Rooms Available";
    }
}

const displayTimeSlot = document.querySelector("#timeslot");
const displayTimeSlotList = displayTimeSlot.querySelector("ul");

function timeSlotDisplay() {
    if (reservedTimeSlots.length) {
        displayTimeSlotList.textContent = "";
        for (let room of reservedTimeSlots) {
            let entry = document.createElement("li");
            let reservedRoomInfo = `${room[4]} : ${room[0]},${room[1]} [${room[2]}-${room[3]}]\n`;
            entry.textContent = reservedRoomInfo;
            displayTimeSlotList.appendChild(entry);
        }
    } else {
        displayTimeSlotList.textContent = "No Reservations";
    }
}

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
                    roomDisplay();
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

document.querySelector("#display-room").addEventListener("click", () => {
    roomDisplay();
});

const reserveRoom = document.querySelector("#reserve-room");
reserveRoom.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    let form = reserveRoom.querySelector("form");
    let buildingName = form.querySelector(".bname").value;
    let roomId = form.querySelector(".rid").value;
    let startTime = form.querySelector("#reserve-start-time").value;
    let endTime = form.querySelector("#reserve-end-time").value;
    let username = form.querySelector(".uname").value;
    if (startTime >= endTime) return;
    if (
        buildingName === "" ||
        roomId === "" ||
        startTime === "" ||
        endTime === "" ||
        username === ""
    ) {
        alert("Ensure you input a value in all fields!");
    } else {
        let existFlag = false;
        for (let room of roomList) {
            if (room[0] == buildingName && room[1] == roomId) {
                existFlag = true;
                break;
            }
        }
        let availableFlag = true;
        for (let bookedRoom of reservedTimeSlots) {
            if (bookedRoom[0] == buildingName && bookedRoom[1] == roomId) {
                let reservedStartTime = bookedRoom[2];
                let reservedEndTime = bookedRoom[3];
                if (
                    !(
                        endTime <= reservedStartTime ||
                        startTime >= reservedEndTime
                    )
                ) {
                    availableFlag = false;
                    break;
                }
            }
        }

        if (existFlag && availableFlag) {
            let roomInfo = [buildingName, roomId, startTime, endTime, username];
            reservedTimeSlots.push(roomInfo);
            alert("Room Reserved");
            document.querySelector("#reserve-room-close").click();
        } else if (existFlag) {
            alert("Room Unavailable");
        } else {
            alert("Room does not exist");
        }
    }
    form.reset();
});

document.querySelector("#time-slot-display").addEventListener("click", () => {
    timeSlotDisplay();
});

const reserveRoomCancel = document.querySelector("#room-cancellation");
reserveRoomCancel.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    form = reserveRoomCancel.querySelector("form");
    let buildingName = form.querySelector(".bname").value;
    let roomId = form.querySelector(".rid").value;
    let startTime = form.querySelector("#reserve-start-time-cancel").value;
    let endTime = form.querySelector("#reserve-end-time-cancel").value;
    let username = form.querySelector(".uname").value;
    if (
        buildingName === "" ||
        roomId === "" ||
        startTime === "" ||
        endTime === "" ||
        username === ""
    ) {
        alert("Ensure you input a value in all fields!");
    } else {
        let index = 0;
        for (let i = 0; i < reservedTimeSlots.length; i++) {
            let reservedRoom = reservedTimeSlots[i];
            if (
                buildingName == reservedRoom[0] &&
                roomId == reservedRoom[1] &&
                startTime == reservedRoom[2] &&
                endTime == reservedRoom[3] &&
                username == reserveRoom[4]
            ) {
                index = i;
                break;
            }
        }
        reservedTimeSlots.splice(index, 1);
        alert("Reservation Successfully Removed");
        timeSlotDisplay();
        document.querySelector("#reserve-room-cancel-close").click();
    }
    form.reset();
});

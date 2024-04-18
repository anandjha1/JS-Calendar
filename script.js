
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
// selectors
const monthNameEle = document.getElementById("month-name");
const daysBodyEle = document.getElementById("days-body");
const prevMonthBtn = document.getElementById("prev-month-btn");
const nextMonthBtn = document.getElementById("next-month-btn");
const todayBtn = document.getElementById("today-btn");

// init 
let { date, month, year } = getDateObj(new Date());
renderCalendar(new Date(year, month, date));

// envent listeners
prevMonthBtn.onclick = function () {
    renderCalendar(new Date(year, --month, date));
}

nextMonthBtn.onclick = function () {
    renderCalendar(new Date(year, ++month, date));
}

todayBtn.onclick = function () {
    let today = getDateObj(new Date());
    date = today.date;
    month = today.month;
    year = today.year;
    renderCalendar(new Date(year, month, date));
}

// variables inits
function getDateObj(date_passed) {
    const month = date_passed.getMonth();
    const day = date_passed.getDay();
    const year = date_passed.getFullYear();
    const date = date_passed.getDate();

    return { date, month, day, year };
}

function renderCalendar(passedDate) {

    const daysArr = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ];
    const currentDate = getDateObj(passedDate);
    const monthFirstDate = new Date(currentDate.year, currentDate.month, 1);
    const monthLastDate = new Date(new Date(currentDate.year, currentDate.month + 1, 1) - 1);

    monthNameEle.innerHTML = months[currentDate.month] + " " + currentDate.year;

    let day = monthFirstDate.getDay(), row = 0, lastDay = monthLastDate.getDay();

    if (day <= 6) {
        const prevMonth = getDateObj(new Date(monthFirstDate - 1));
        let prevMonthLastDate = prevMonth.date;
        for (let j = day - 1; j >= 0; j--) {
            daysArr[0][j] = `<td class="${j === 0 ? "weekend disable" : "disable"}">${prevMonthLastDate--}</td>`;
        }
    }

    const lastDate = monthLastDate.getDate()
    for (let i = 1; i <= lastDate; i++) {
        daysArr[row][day++] = `<td class=${day === 1 ? "weekend" : "active"}>${i} <br><span class="point"></span></td>`;
        if (day === 7) day = 0;
        if (day === 0) row++;
    }

    const nextMonth = getDateObj(new Date(currentDate.year, currentDate.month + 1, 1));
    let firstDate = nextMonth.date;
    while (row <= 5) {
        for (let i = lastDay + 1; i <= 6; i++) {
            daysArr[row][i] = `<td class="${i === 0 ? "weekend disable" : "disable"}">${firstDate++}</td>`;
        }
        row++;
        lastDay = -1;
    }

    daysBodyEle.innerHTML = "";

    daysArr.forEach(row => {
        if (row[0] !== 0) {
            daysBodyEle.innerHTML += `<tr>${row.join("")}</tr>`;
        }
    })
}

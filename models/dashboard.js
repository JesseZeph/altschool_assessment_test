const mongoose = require('mongoose');
const date = new Date();
const currentTime = date.getHours() + ":" + date.getMinutes + ":" + date.getSeconds();
const currentDate = date.Date + ":" + getMonth(date.getMonth()) + " " + date.getFullYear();
console.log(currentDate);

function getMonth(monthNumber) {
    const monthsArr = ["Jan", "Feb", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthsArr[monthNumber];
}

const dashboardSchema = mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    currentTime: {
        type: String,
        default: currentTime,
    },
    currentDate: {
        type: String,
        default: currentDate,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    categoryChoosed: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: false,
    },

});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);
module.exports = Dashboard;

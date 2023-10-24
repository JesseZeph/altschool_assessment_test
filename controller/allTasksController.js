const db = require('../config/mongoose');
const Dashboard = require('../models/dashboard');
const User = require('../models/register');

module.exports.alltask = function (req, res) {
    const data = Dashboard.find({})
        .then(function (data) {
            User.findOne({ email: "jessezephyr@gmail.com" })
                .then(function (user) {
                    console.log(`***********user`, user.firstname);
                    const userName = user.firstname || 'Guest'
                    return res.render('alltask', {
                        title: "Dashboard",
                        userName: userName,
                        dashboard: data
                    });
                })
        })
        .catch(function (err) {
            console.log('Error', err);
            return;
        })
}
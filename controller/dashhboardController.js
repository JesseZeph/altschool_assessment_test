const db = require('../config/mongoose');
const Dashboard = require('../models/dashboard');
const User = require('../models/register');

module.exports.dashboard = function (req, res) {
    Dashboard.find({})
        .then(function (data) {
            const userEmail = "jessezephyr@gmail.com"; // Change this to the authenticated user's email
            User.findOne({ email: userEmail })
                .then(function (user) {
                    if (user) {
                        // Assuming the user object has a 'name' property
                        const userName = user.firstname || 'Guest';

                        res.render('dashboard', {
                            title: 'Dashboard',
                            dashboard: data,
                            userName: userName
                        });
                    } else {
                        res.render('dashboard', {
                            title: 'Dashboard',
                            dashboard: data,
                            userName: 'Guest' // Default to 'Guest' if user not found
                        });
                    }
                })
                .catch(function (err) {
                    console.log('Error finding user:', err);
                    res.render('dashboard', {
                        title: 'Dashboard',
                        dashboard: data,
                        userName: 'Guest' // Default to 'Guest' in case of an error
                    });
                });
        })
        .catch(function (err) {
            console.log('Error fetching dashboard data:', err);
            return res.status(500).send('Internal Server Error');
        });
}

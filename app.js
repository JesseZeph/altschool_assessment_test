const express = require('express');
const PORT = 3000;
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');




const db = require('./config/mongoose');
const Register = require('./models/register');
const Dashboard = require('./models/dashboard');
const Login = require('./models/login')

const app = express();

// use express router

app.get('/', require('./routes/index'));
app.get('/dashboard', require('./routes/index'));
app.get('/register', require('./routes/index'));
app.get('/alltask', require('./routes/index'));
app.get('/completedtask', require('./routes/index'));
app.get('/login', require('./routes/index'))


//set up the view engine    
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'your-secret-key',         
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

//set up static files
app.use(express.static('public'));

//register user

app.post('/register', async (req, res) => {
    const { firstname, lastname, phone, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Register.create({
            firstname,
            lastname,
            phone,
            email,
            password: hashedPassword,
        });

        console.log('User created successfully', user);
        res.redirect('/dashboard');
    } catch (err) {
        console.log('Error creating user', err);
        res.status(500).send('Error creating user');
    }
});



  

app.get('/dashboard', (req, res) => {
    const userName = req.user ? req.user.name : 'Guest'; 
    res.render('dashboard', { userName });
  });

app.post('/addtask', function (req, res) {
    Dashboard.create({
        task: req.body.task,
        date: req.body.date,
        description: req.body.description,
        time: req.body.time,
        categoryChoosed: req.body.categoryChoosed
    })
        .then(newTask => {
            console.log("Task created successfully", newTask);
            res.redirect('back');
        })
        .catch(err => {
            console.log("Error Creating Task", err);
            res.redirect('back');
        });
});

app.get('/complete-task', function (req, res) {
    let id = req.query.id;
    Dashboard.findByIdAndUpdate(id, { completed: true })
        .then(newTask => {
            console.log("Tasks retrived successfully", newTask);
            res.redirect('back');
        })
        .catch(err => {
            console.log("Error retrieving Task", err);
            res.redirect('back');
        });
});

app.get('/delete-task', function (req, res) {
    let id = req.query.id;
    Dashboard.findByIdAndDelete(id)
        .then(newTask => {
            console.log("Task deleted", newTask);
            res.redirect('back');
        })
        .catch(err => {
            console.log("Error Deleting Task", err);
            res.redirect('back');
        });

});



app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Register.findOne({ email });

        if (!user) {
            res.status(404).json({ message: 'Invalid credentials' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(404).json({ message: 'Invalid credentials' });
            return;
        }

        res.redirect('/dashboard');
    } catch (err) {
        console.error('Error finding user:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/'); 
    });
});
  



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


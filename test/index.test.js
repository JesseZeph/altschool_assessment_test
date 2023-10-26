const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Routes', () => {
  // Test registration
  it('should register a new user', (done) => {
    chai
      .request(app)
      .post('/register')
      .send({
        firstname: 'John',
        lastname: 'Doe',
        phone: '1234567890',
        email: 'johndoe@example.com',
        password: 'password123',
      })
      .end((err, res) => {
        res.should.have.status(302); 
        done();
      });
  });

  // Test login
  it('should log in a registered user', (done) => {
    chai
      .request(app)
      .post('/login')
      .send({
        email: 'johndoe@example.com',
        password: 'password123',
      })
      .end((err, res) => {
        res.should.have.status(302); 
        done();
      });
  });

  // Test adding a task
  it('should add a task to the dashboard', (done) => {
    chai
      .request(app)
      .post('/addtask')
      .send({
        task: 'Task 1',
        date: '2023-10-26',
        description: 'Task description',
        time: '10:00 AM',
        categoryChoosed: 'Work',
      })
      .end((err, res) => {
        res.should.have.status(302); 
        done();
      });
  });

  // Test completing a task
  it('should mark a task as completed', (done) => {
    const taskId = 'task_id';

    chai
      .request(app)
      .get(`/complete-task?id=${taskId}`)
      .end((err, res) => {
        res.should.have.status(302); 
        done();
      });
  });

  // Test deleting a task
  it('should delete a task', (done) => {
    const taskId = 'task_id';

    chai
      .request(app)
      .get(`/delete-task?id=${taskId}`)
      .end((err, res) => {
        res.should.have.status(302);
        done();
      });
  });

  // Test logging out
  it('should log out a user', (done) => {
    chai
      .request(app)
      .get('/logout')
      .end((err, res) => {
        res.should.have.status(302);
        done();
      });
  });
});

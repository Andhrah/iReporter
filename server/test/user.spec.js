import chai from 'chai';
import supertest from 'supertest';

import app from '../index';
import db from '../config';

const { expect } = chai;
const server = supertest(app);

describe('iReporter', () => {
  after(async () => {
    const client = await db.connect();
    const dropTable = 'DROP TABLE IF EXISTS users';
    await client.query(dropTable);
    client.release();
  });

  describe('the * catch-all route', () => {
    it('should return an error message', async () => {
      const response = await server.get('/api/v1/andra');
      expect(response.body.status).to.equal(404);
      expect(response.body.error).to.equal('404 Page Not Found');
    });
  });


  describe('the / endpoint', () => {
    it('should return a welcome message', async () => {
      const response = await server.get('/api/v1/');
      expect(response.body.status).to.equal(200);
      expect(response.body.data).to.equal('Welcome to iReporter');
    });
  });

  describe('the signup endpoint', () => {
    it('should create a user and save to database', async () => {
      const newUser = {
        firstname: 'Andra',
        lastname: 'Collins',
        othername: 'Chi',
        email: 'andra@you.com',
        password: 'password',
        username: 'andraquin',
        phoneNumber: '07013394689',
        registered: new Date().toDateString(),
        isAdmin: Boolean(),
      };
      const response = await server.post('/api/v1/auth/signup')
        .send(newUser);
      expect(response.body.status).to.equal(201);
    });

    it('should return error for Email already in use', async () => {
      const newUser = {
        firstname: 'Andra',
        lastname: 'Collins',
        othername: 'Chi',
        email: 'andra@you.com',
        password: 'password',
        username: 'andraquin1',
        phoneNumber: '07013394689',
        registered: new Date().toDateString(),
        isAdmin: Boolean(),
      };
      const response = await server.post('/api/v1/auth/signup')
        .send(newUser);
      expect(response.body.status).to.equal(409);
      expect(response.body.error).to.equal('Email is already taken');
    });

    it('should return error for Username already in use', async () => {
      const newUser = {
        firstname: 'Andra',
        lastname: 'Collins',
        othername: 'Chi',
        email: 'andra1@you.com',
        password: 'password',
        username: 'andraquin',
        phoneNumber: '07013394689',
        registered: new Date().toDateString(),
        isAdmin: Boolean(),
      };
      const response = await server.post('/api/v1/auth/signup')
        .send(newUser);
      expect(response.body.status).to.equal(409);
      expect(response.body.error).to.equal('Username is already taken');
    });

    it('should error for empty signup details', async () => {
      const newEmptyUser = {
        firstname: '',
        lastname: '',
        othername: '',
        email: '',
        password: '',
        username: '',
        phoneNumber: '',
        registered: '',
        isAdmin: '',
      };
      const response = await server.post('/api/v1/auth/signup')
        .send(newEmptyUser);
      expect(response.body.status).to.equal(400);
    });
  });

  describe('the signin endpoint', () => {
    it('should login a user with email', async () => {
      const loginUser = {
        email: 'andra@you.com',
        password: 'password',
      };
      const response = await server.post('/api/v1/auth/login')
        .send(loginUser);
      expect(response.body.status).to.equal(200);
      expect(response.body.data).to.be.an('array');
    });

    it('should return error for empty login details', async () => {
      const loginUser = {
        email: '',
        password: '',
      };
      const response = await server.post('/api/v1/auth/login')
        .send(loginUser);
      expect(response.body.status).to.equal(400);
    });

    it('should login a user with username', async () => {
      const loginUser = {
        username: 'andraquin',
        password: 'password',
      };
      const response = await server.post('/api/v1/auth/login')
        .send(loginUser);
      expect(response.body.status).to.equal(200);
    });

    it('should return error for incorrect Email/Password', async () => {
      const loginUser = {
        email: 'andrafake@you.com',
        password: 'password1',
      };
      const response = await server.post('/api/v1/auth/login')
        .send(loginUser);
      expect(response.body.status).to.equal(401);
      expect(response.body.error).to.equal('Incorrect Email/Username or Password');
    });

    it('should return error for incorrect Username/Password', async () => {
      const loginUser = {
        username: 'andraquinfake@you.com',
        password: 'password1',
      };
      const response = await server.post('/api/v1/auth/login')
        .send(loginUser);
      expect(response.body.status).to.equal(401);
      expect(response.body.error).to.equal('Incorrect Email/Username or Password');
    });
  });
});

import chai from 'chai';
import supertest from 'supertest';

import app from '../index';
import db from '../config';

const { expect } = chai;
const server = supertest(app);
const token = process.env.JWT_TOKEN;

describe('iReporter', () => {
  after(async () => {
    const client = await db.connect();
    const dropTable = 'DROP TABLE IF EXISTS interventions';
    await client.query(dropTable);
    client.release();
  });

  describe('the /interventions endpoint', () => {
    it('should create a interventions and save to the database', async () => {
      const newIntervention = {
        createdOn: new Date().toDateString(),
        createdBy: 6,
        interventionReasons: ['Bad Road', 'Collapsed Bridge'],
        location: '6.605874, 3.349149',
        status: 'Draft',
        images: ['image1', 'image2'],
        video: ['video1', 'video2'],
        comment: 'Corruption in the educational system.',
      };
      const response = await server.post('/api/v1/interventions')
        .set('authorization', token).send(newIntervention);
      expect(response.body.status).to.equal(201);
      expect(response.body.data).to.be.an('array');
      expect(response.body.data[0].message).to.eql('Created intervention record');
    });

    it('should return a list of all interventions record', async () => {
      const response = await server.get('/api/v1/interventions')
        .set('authorization', token);
      expect(response.body.status).to.equal(200);
      expect(response.body.data).to.be.an('array');
    });


    it('should return an error for empty fields to be saved to the database', async () => {
      const newEmptyIntervention = {
        createdOn: '',
        createdBy: '',
        interventionReasons: '',
        location: '',
        status: '',
        images: '',
        video: '',
        comment: '',
      };
      const response = await server.post('/api/v1/interventions')
        .set('authorization', token).send(newEmptyIntervention);
      expect(response.statusCode).to.equal(400);
      expect(response.body.status).to.equal(400);
      expect(response.body.error).to.not.be.an('undefined');
      expect(response.body.error).to.be.an('array');
    });
  });

  describe('should display a specific intervention record', () => {
    it('should fetch a specific intervention record and display it', async () => {
      const response = await server.get('/api/v1/interventions/1')
        .set('authorization', token);
      expect(response.body.status).to.equal(200);
      expect(response.body.data).to.be.an('array');
    });

    it('should return error for wrong intervention id', async () => {
      const response = await server.get('/api/v1/interventions/997667777')
        .set('authorization', token);
      expect(response.statusCode).to.equal(404);
      expect(response.body.error).to.not.be.an('undefined');
      expect(response.body.error).to.eql('Intervention Not Found');
    });
  });

  describe("should edit a specific intervention record's location", () => {
    it("should get a specific intervention and edit it's location", async () => {
      const response = await server
        .patch('/api/v1/interventions/1/location')
        .set('authorization', token)
        .send({ location: '6.605874, 3.349149' });
      expect(response.body.status).to.equal(200);
      expect(response.body.data[0].message).to.eql('Updated Intervention record\'s location');
    });

    it('should return an error message for incorrect intervention id', async () => {
      const response = await server.patch('/api/v1/interventions/888555555/location')
        .set('authorization', token);
      expect(response.statusCode).to.equal(400);
    });
  });

  describe("should edit a specific intervention record's comment", () => {
    it("should get a specific intervention and edit it's location", async () => {
      const response = await server.patch('/api/v1/interventions/1/comment')
        .set('authorization', token)
        .send({
          comment: 'Corrution is the order of the day',
        });
      expect(response.body.status).to.equal(200);
      expect(response.body.data[0].message).to.eql('Updated Intervention record\'s comment');
    });

    it('should return an error message for incorrect intervention id', async () => {
      const response = await server.patch('/api/v1/interventions/88867/comment')
        .set('authorization', token).send({
          comment: 'Corrution is the order of the day',
        });
      expect(response.statusCode).to.equal(404);
      expect(response.body.status).to.equal(404);
      expect(response.body.error).to.equal('Intervention Not Found');
    });

    it("should get a specific intervention and edit it's location", async () => {
      const response = await server.patch('/api/v1/interventions/1/comment')
        .set('authorization', token)
        .send({
          comment: '',
        });
      expect(response.body.status).to.equal(400);
      expect(response.body.error[0].comment).to.eql('Comment is required');
    });
  });


  describe('should delete intervention', () => {
    it('should delete a specific intervention record', async () => {
      const response = await server.delete('/api/v1/interventions/1')
        .set('authorization', token);
      expect(response.body.status).to.equal(200);
      expect(response.body.data[0].message).to.eql('Intervention record has been deleted');
    });

    it('should return an error message for incorrect intervention id', async () => {
      const response = await server.delete('/api/v1/interventions/888')
        .set('authorization', token);
      expect(response.statusCode).to.equal(404);
    });
  });

  describe('No token provided', () => {
    it('should return error when no token is provided', async () => {
      const response = await server.patch('/api/v1/interventions/1/comment')
        .send({
          comment: '',
        });
      expect(response.body.status).to.equal(401);
      expect(response.body.error).to.equal('No token provided');
    });

    it('should return error for wrong token provided', async () => {
      const fakeToken = 'abcdef';
      const response = await server.patch('/api/v1/interventions/1/comment')
        .set('authorization', fakeToken)
        .send({
          comment: '',
        });
      expect(response.body.status).to.equal(500);
      expect(response.body.error).to.equal('Failed to authenticate token');
    });
  });
});

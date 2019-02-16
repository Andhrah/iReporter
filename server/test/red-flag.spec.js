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
    const dropTable = 'DROP TABLE IF EXISTS red_flags';
    await client.query(dropTable);
    client.release();
  });

  describe('the /red-flag endpoint', () => {
    it('should create a red-flag and save to the database', async () => {
      const newRedFlag = {
        createdOn: new Date().toDateString(),
        createdBy: 6,
        corruptionMethods: ['Fraud', 'Theft'],
        entityInvolved: ['President', 'Vice President'],
        location: '6.605874, 3.349149',
        corruptionDate: new Date(2018, 6, 20).toDateString(),
        namesInvolved: ['John Bull', 'Jane Doe'],
        status: 'Draft',
        images: ['image1', 'image2'],
        video: ['video1', 'video2'],
        comment: 'Corruption in the educational system.',
      };
      const response = await server.post('/api/v1/red-flags')
        .set('authorization', token).send(newRedFlag);
      expect(response.body.status).to.equal(201);
      expect(response.body.data).to.be.an('array');
      expect(response.body.data[0].message).to.eql('Red-flag has been created');
    });

    it('should return a list of all red-flags record', async () => {
      const response = await server.get('/api/v1/red-flags')
        .set('authorization', token);
      expect(response.body.status).to.equal(200);
      expect(response.body.data).to.be.an('array');
    });

    it('should return an error for empty fields to be saved to the database', async () => {
      const newEmptyRedFlag = {
        corruptionMethods: '',
        entityInvolved: '',
        location: '',
        corruptionDate: '',
        namesInvolved: '',
        images: '',
        videos: '',
        comment: '',
      };
      const response = await server.post('/api/v1/red-flags')
        .set('authorization', token)
        .send(newEmptyRedFlag);
      expect(response.statusCode).to.equal(400);
      expect(response.body.status).to.equal(400);
      expect(response.body.error).to.not.be.an('undefined');
      expect(response.body.error).to.be.an('array');
    });
  });

  describe('should display a specific red-flag record', () => {
    it('should fetch a specific red-flag record and display it', async () => {
      const response = await server.get('/api/v1/red-flags/1')
        .set('authorization', token);
      expect(response.body.status).to.equal(200);
      expect(response.body.data).to.be.an('array');
    });

    it('should return error for wrong red-flag id', async () => {
      const response = await server.get('/api/v1/red-flags/997667777')
        .set('authorization', token);
      expect(response.statusCode).to.equal(404);
      expect(response.body.error).to.not.be.an('undefined');
      expect(response.body.error).to.eql('Red-Flag Not Found');
    });
  });

  describe("should edit a specific red-flag record's location", () => {
    it("should get a specific red-flags and edit it's location", async () => {
      const getAll = await server.get('/api/v1/red-flags')
        .set('authorization', token);
      const redFlagId = getAll.body.data[0].id;
      const response = await server
        .patch(`/api/v1/red-flags/${redFlagId}/location`)
        .set('authorization', token)
        .send({ location: '6.605874, 3.349149' });
      expect(response.body.status).to.equal(200);
      expect(response.body.data[0].message).to.eql('Updated Red-Flag record\'s location');
    });

    it('should return an error message for incorrect red-flag id', async () => {
      const response = await server.patch('/api/v1/red-flags/888555555/location')
        .set('authorization', token);
      expect(response.statusCode).to.equal(400);
    });
  });

  describe("should edit a specific red-flag record's comment", () => {
    it("should get a specific red-flag and edit it's location", async () => {
      const getAll = await server.get('/api/v1/red-flags')
        .set('authorization', token);
      const redFlagId = getAll.body.data[0].id;
      const response = await server
        .patch(`/api/v1/red-flags/${redFlagId}/comment`)
        .set('authorization', token)
        .send({
          comment: 'Corrution is the order of the day, just testing',
        });
      expect(response.body.status).to.equal(200);
    });

    it('should return an error message for incorrect red-flag id', async () => {
      const response = await server.patch('/api/v1/red-flags/88867/comment')
        .set('authorization', token).send({
          comment: 'Corrution is the order of the day',
        });
      expect(response.statusCode).to.equal(404);
    });
  });

  describe('should delete red-flag', () => {
    it('should delete a specific red-flag record', async () => {
      const getAll = await server.get('/api/v1/red-flags')
        .set('authorization', token);
      // console.log(getAll.body.data);
      const redFlagId = getAll.body.data[0].id;
      const response = await server.delete(`/api/v1/red-flags/${redFlagId}`)
        .set('authorization', token);
      expect(response.body.status).to.equal(200);
    });

    it('should return an error message for incorrect red-flag id', async () => {
      const response = await server.delete('/api/v1/red-flags/888')
        .set('authorization', token);
      expect(response.statusCode).to.equal(404);
    });
  });
});

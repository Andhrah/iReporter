import chai from 'chai';
import supertest from 'supertest';

import app from '../index';
import db from '../models/red-flag';

const { expect } = chai;
const server = supertest(app);

describe('Ride-My-Way', () => {
  describe('the /red-flags endpoint', () => {
    it('should return a list of all red-flags record', async () => {
      const response = await server.get('/api/v1/red-flags');
      expect(db.length).to.equal(response.body.data.length);
    });

    it('should create a red-flag and save to the database', async () => {
      const newRedFlag = {
        createdOn: new Date().toString(),
        createdBy: 1,
        type: 'red-flag',
        location: '6.605874, 3.349149.',
        status: 'Resolved',
        Images: ['image1', 'image2'],
        Videos: ['video1', 'video2'],
        comment: 'Corruption in the educational system.',
      };
      const initialRedFlags = db.length;
      const response = await server.post('/api/v1/red-flags').send(newRedFlag);
      expect(response.body.status).to.equal(201);
      expect(db.length).to.equal(initialRedFlags + 1);
    });
  });

  describe('should display a specific red-flag record', () => {
    it('should fetch a specific red-flag record and display it', async () => {
      const redFlag = db[0];
      const response = await server.get(`/api/v1/red-flags/${redFlag.id}`);
      expect(response.body.status).to.equal(200);
    });
  });

  describe('should edit a specific red-flagrecord\'s location', () => {
    it('should get a specific red-flag and edit it\'s location', async () => {
      const redFlag = db[2];
      const response = await server.patch(`/api/v1/red-flags/${redFlag.id}/location`);
      expect(response.body.status).to.equal(200);
    });
  });

  describe('should edit a specific red-flagrecord\'s comment', () => {
    it('should get a specific red-flag and delete it\'s location', async () => {
      const redFlag = db[4];
      const response = await server.patch(`/api/v1/red-flags/${redFlag.id}/comment`);
      expect(response.body.status).to.equal(200);
    });
  });
});

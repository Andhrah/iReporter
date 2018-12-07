import chai from 'chai';
import supertest from 'supertest';

import app from '../index';
import db from '../models/red-flag';

const { expect } = chai;
const server = supertest(app);

describe('iReporter', () => {
  describe('the /red-flags endpoint', () => {
    it('should return a list of all red-flags record', async () => {
      const response = await server.get('/api/v1/red-flags');
      expect(response.body.status).to.equal(200);
      expect(response.body.data).to.deep.equal(db);
      expect(db.length).to.equal(response.body.data.length);
    });

    it('should create a red-flag and save to the database', async () => {
      const lastRedFlag = db[db.length - 1];
      const newRedFlag = {
        id: lastRedFlag.id + 1,
        createdOn: new Date().toString(),
        createdBy: 6,
        type: 'red-flag',
        location: '6.605874, 3.349149.',
        status: 'Under Investigation',
        Images: ['image1', 'image2'],
        Videos: ['video1', 'video2'],
        comment: 'Corruption in the educational system.',
      };
      const initialRedFlags = db.length;
      const response = await server.post('/api/v1/red-flags').send(newRedFlag);
      const lastNewRedFlag = db[db.length - 1];
      expect(response.body.status).to.equal(201);
      expect(response.body.data).to.be.an('array');
      expect(response.body.data[0].message).to.eql('Red-Flag created successfully');
      expect(response.body.data[0].newRedFlag.id).to.eql(lastNewRedFlag.id);
      expect(response.body.data[0].newRedFlag.createdOn).to.eql(lastNewRedFlag.createdOn);
      expect(response.body.data[0].newRedFlag.createdBy).to.eql(lastNewRedFlag.createdBy);
      expect(response.body.data[0].newRedFlag.type).to.eql(lastNewRedFlag.type);
      expect(response.body.data[0].newRedFlag.location).to.eql(lastNewRedFlag.location);
      expect(response.body.data[0].newRedFlag.status).to.eql(lastNewRedFlag.status);
      expect(response.body.data[0].newRedFlag.images).to.eql(lastNewRedFlag.images);
      expect(response.body.data[0].newRedFlag.videos).to.eql(lastNewRedFlag.videos);
      expect(response.body.data[0].newRedFlag.comment).to.eql(lastNewRedFlag.comment);
      expect(db.length).to.equal(initialRedFlags + 1);
    });

    it('should return an error for empty fields to be saved to the database', async () => {
      const response = await server.post('/api/v1/red-flags');
      expect(response.statusCode).to.equal(400);
      expect(response.body.status).to.equal(400);
      expect(response.body.error).to.not.be.an('undefined');
      expect(response.body.error).to.be.an('array');
    });
  });

  describe('should display a specific red-flag record', () => {
    it('should fetch a specific red-flag record and display it', async () => {
      const redFlag = db[0];
      const response = await server.get(`/api/v1/red-flags/${redFlag.id}`);
      expect(response.body.status).to.equal(200);
      expect(response.body.data).to.deep.equal([redFlag]);
    });

    it('should return error for wrong red-flag id', async () => {
      const response = await server.get('/api/v1/red-flags/99');
      expect(response.statusCode).to.equal(404);
      expect(response.body.error).to.not.be.an('undefined');
      expect(response.body.error).to.eql('Red-flag not found');
    });
  });

  describe('should edit a specific red-flagrecord\'s location', () => {
    it('should get a specific red-flag and edit it\'s location', async () => {
      const redFlag = db[2];
      const response = await server.patch(`/api/v1/red-flags/${redFlag.id}/location`).send(redFlag.location = '6.605874, 3.349149');
      const editedRedFlag = redFlag;
      expect(response.body.status).to.equal(200);
      expect(response.body.data[0].message).to.eql('Updated red-flag record\'s location');
      expect(response.body.data[0].redFlag.location).to.eql(editedRedFlag.location);
    });
    it('should return an error message for incorrect red-flag id', async () => {
      const response = await server.patch('/api/v1/red-flags/888/location');
      expect(response.statusCode).to.equal(404);
      expect(response.body.status).to.equal(404);
      expect(response.body.error).to.not.be.an('undefined');
      expect(response.body.error).to.eql('Red-flag Not Found');
    });
  });

  describe("should edit a specific red-flag record's comment", () => {
    it("should get a specific red-flag and delete it's location", async () => {
      const redFlag = db[4];
      const response = await server.patch(`/api/v1/red-flags/${redFlag.id}/comment`).send(redFlag.comment = 'Corrution is the order of the day');;
      const editedRedFlag = redFlag;
      expect(response.body.status).to.equal(200);
      expect(response.body.data[0].message).to.eql("Updated red-flag record's comment");
      expect(response.body.data[0].redFlag.comment).to.eql(editedRedFlag.comment);
    });
    it('should return an error message for incorrect red-flag id', async () => {
      const response = await server.patch('/api/v1/red-flags/888/comment');
      expect(response.statusCode).to.equal(404);
      expect(response.body.status).to.equal(404);
      expect(response.body.error).to.not.be.an('undefined');
      expect(response.body.error).to.eql('Red-flag Not Found');
    });
  });

  describe('should delete red-flag', () => {
    it('should delete a specific red-flag record', async () => {
      const redFlag = db[3];
      const response = await server.delete(`/api/v1/red-flags/${redFlag.id}`);
      expect(response.body.status).to.equal(200);
      expect(response.body.data[0].message).to.eql(
        'red-flag record has been deleted',
      );
    });

    it('should return an error message for incorrect red-flag id', async () => {
      const response = await server.delete('/api/v1/red-flags/888');
      expect(response.statusCode).to.equal(404);
      expect(response.body.status).to.equal(404);
      expect(response.body.error).to.not.be.an('undefined');
      expect(response.body.error).to.eql('Red-flag Not Found');
    });
  });
});

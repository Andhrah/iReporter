import chai from 'chai';
import supertest from 'supertest';

import app from '../index';
import db from '../models/red-flag';

const { expect } = chai;
const server = supertest(app);

describe('Ride-My-Way', () => {
  describe('the /rides endpoint', () => {
    it('should return a list of all red-flags record', async () => {
      const response = await server.get('/api/v1/red-flags');
      expect(db.length).to.equal(response.body.data.length);
    });
  });
});

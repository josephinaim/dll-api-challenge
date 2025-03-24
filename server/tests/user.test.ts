import request from 'supertest';
import app from '../src/app';

describe('GET /users', function(){
    it('should return users sorted by name', async () => {
        const res = await request(app).get('/api/users?sort=name');
        expect(res.status).toBe(200);
        expect(res.body[0].name <= res.body[1].name).toBe(true);
      });
      it('should return users sorted by id', async () => {
        const res = await request(app).get('/api/users?sort=id');
        expect(res.status).toBe(200);
        expect(res.body[0].id <= res.body[1].id).toBe(true);
      });
      it('should return unsorted users if sort parameters are invalid', async () => {
        const res = await request(app).get('/api/users?sort=invalidField');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(5);
      });
      it('should return all users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(5);
      });
})
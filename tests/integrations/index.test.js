const { DECIMAL } = require('sequelize');
const { app } = require('../../index');
const request = require('supertest');

describe('integration testing', () => {
  let token, UserId, CategoryId, FoodId, token1;
  describe('/POST login', () => {
    describe('positive case', () => {
      test('should send an object (id, username, token) with status 200', (done) => {
        request(app)
          .post('/login')
          .send({
            username: 'satrio23',
            password: 'admin',
          })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);

            token = res.body.token;

            expect(res.body).toHaveProperty('token', expect.any(String));
            expect(res.body).toHaveProperty('username', expect.any(String));
            expect(res.body).toHaveProperty('id', expect.any(Number));
            done();
          });
      });
    });
  });
  describe('negative case', () => {
    test('should send error with status 500 if input password is incorrect', (done) => {
      request(app)
        .post('/login')
        .send({
          username: 'satrio23',
          password: 'doe1234',
        })
        .end((err, res) => {
          expect(err).toBe(null);
          expect(res.status).toBe(500);
          expect(res.body).toHaveProperty('err');
          done();
        });
    });
  });

  describe('Login token roleId = 3', () => {
    test('should send an object (id, username, token) with status 200', (done) => {
      request(app)
        .post('/login')
        .send({
          username: 'staff23',
          password: 'admin12345',
        })
        .end((err, res) => {
          expect(err).toBe(null);
          expect(res.status).toBe(200);

          token1 = res.body.token;

          expect(res.body).toHaveProperty('token', expect.any(String));
          expect(res.body).toHaveProperty('username', expect.any(String));
          expect(res.body).toHaveProperty('id', expect.any(Number));
          done();
        });
    });
  });

  /*User*/

  describe('/POST create user', () => {
    describe('positive case', () => {
      test('should send an object (name, username) with status 201', (done) => {
        request(app)
          .post('/user')
          .send({
            name: 'nugroho',
            username: 'nugroho23',
          })
          .set({ token: token })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(201);

            UserId = res.body.user.id;

            expect(res.body.user).toHaveProperty('id', expect.any(Number));
            done();
          });
      });
    });
    describe('negative case', () => {
      test('should send error with status 500 if no token', (done) => {
        request(app)
          .post('/user')
          .send({
            name: 'nugroho',
            username: 'nugroho23',
          })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('err');
            done();
          });
      });
    });
    describe('negative case 2', () => {
      test('should send error with status 500 if authorization', (done) => {
        request(app)
          .post('/user')
          .send({
            name: 'nugroho',
            username: 'nugroho23',
          })
          .set({ token: token1 })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('err');
            done();
          });
      });
    });
  });
  describe('/GET user', () => {
    describe('positive case', () => {
      test('should send an object(id, name, username, password, RoleId) with status 200', (done) => {
        request(app)
          .get(`/user/${UserId}`)
          .set({ token: token })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);
            expect(res.body.data).toHaveProperty('id', expect.any(Number));
            expect(res.body.data).toHaveProperty('name', expect.any(String));
            expect(res.body.data).toHaveProperty(
              'username',
              expect.any(String)
            );
            expect(res.body.data).toHaveProperty(
              'password',
              expect.any(String)
            );
            expect(res.body.data).toHaveProperty('RoleId', expect.any(Number));
            done();
          });
      });
    });
    describe('negative case', () => {
      test('should send error with status 500 if no token', (done) => {
        request(app)
          .get(`/user/${UserId}`)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('err');
            done();
          });
      });
    });
    describe('negative case 2', () => {
      test('should send error with status 500 if authorization', (done) => {
        request(app)
          .get(`/user/${UserId}`)
          .set({ token: token1 })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('err');
            done();
          });
      });
    });
  });
  describe('/PUT user', () => {
    describe('positive case', () => {
      test('should update user with status 200', (done) => {
        request(app)
          .put(`/user/${UserId}`)
          .send({
            name: 'nugroho wok',
          })
          .set({ token: token })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);
            done();
          });
      });
    });
    describe('negative case', () => {
      test('should send error with status 500 if no token', (done) => {
        request(app)
          .put(`/user/${UserId}`)
          .send({
            name: 'nugroho wok',
          })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            done();
          });
      });
    });
    describe('negative case 2', () => {
      test('should send error with status 500 if authorization', (done) => {
        request(app)
          .put(`/user/${UserId}`)
          .send({
            name: 'nugroho wok',
          })
          .set({ token: token1 })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            done();
          });
      });
    });
  });
  describe('/DELETE user', () => {
    describe('positive case', () => {
      test('should delete user with status 200', (done) => {
        request(app)
          .delete(`/user/${UserId}`)
          .set({ token: token })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);
            done();
          });
      });
    });
    describe('negative case', () => {
      test('should send error with status 500 if no token', (done) => {
        request(app)
          .delete(`/user/${UserId}`)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            done();
          });
      });
    });
    describe('negative case 2', () => {
      test('should send error with status 500 if Authorization', (done) => {
        request(app)
          .delete(`/user/${UserId}`)
          .set({ token: token1 })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            done();
          });
      });
    });
  });

  /*Category*/
  describe('/POST create category', () => {
    describe('positive case', () => {
      test('should send an object (name, description) with status 201', (done) => {
        request(app)
          .post('/category')
          .send({
            name: 'category1',
            description: 'description',
          })
          .set({ token: token })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(201);

            CategoryId = res.body.category.id;

            expect(res.body.category).toHaveProperty('id', expect.any(Number));
            done();
          });
      });
    });
    describe('negative case', () => {
      test('should send error with status 500 if no token', (done) => {
        request(app)
          .post('/category')
          .send({
            name: 'category1',
            description: 'description',
          })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('err');
            done();
          });
      });
    });
    describe('negative case 2', () => {
      test('should send error with status 500 if authorization', (done) => {
        request(app)
          .post('/category')
          .send({
            name: 'category1',
            description: 'description',
          })
          .set({ token: token1 })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('err');
            done();
          });
      });
    });
  });
  describe('/GET category', () => {
    describe('positive case', () => {
      test('should send an object(id, name, description) with status 200', (done) => {
        request(app)
          .get(`/category/${CategoryId}`)
          .set({ token: token })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);
            expect(res.body.data).toHaveProperty('id', expect.any(Number));
            expect(res.body.data).toHaveProperty('name', expect.any(String));
            expect(res.body.data).toHaveProperty(
              'description',
              expect.any(String)
            );
            done();
          });
      });
    });
    describe('negative case', () => {
      test('should send error with status 500 if no token', (done) => {
        request(app)
          .get(`/category/${CategoryId}`)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('err');
            done();
          });
      });
    });
    describe('negative case 2', () => {
      test('should send error with status 500 if authorization', (done) => {
        request(app)
          .get(`/category/${CategoryId}`)
          .set({ token: token1 })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('err');
            done();
          });
      });
    });
  });
  describe('/PUT category', () => {
    describe('positive case', () => {
      test('should update category with status 200', (done) => {
        request(app)
          .put(`/category/${CategoryId}`)
          .send({
            name: 'category 12',
          })
          .set({ token: token })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);
            done();
          });
      });
    });
    describe('negative case', () => {
      test('should send error with status 500 if no token', (done) => {
        request(app)
          .put(`/category/${CategoryId}`)
          .send({
            name: 'category 12',
          })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            done();
          });
      });
    });
    describe('negative case 2', () => {
      test('should send error with status 500 if authorization', (done) => {
        request(app)
          .put(`/category/${CategoryId}`)
          .send({
            name: 'category 12',
          })
          .set({ token: token1 })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            done();
          });
      });
    });
  });
  describe('/DELETE category', () => {
    describe('positive case', () => {
      test('should delete category with status 200', (done) => {
        request(app)
          .delete(`/category/${CategoryId}`)
          .set({ token: token })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);
            done();
          });
      });
    });
    describe('negative case', () => {
      test('should send error with status 500 if no token', (done) => {
        request(app)
          .delete(`/category/${CategoryId}`)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            done();
          });
      });
    });
    describe('negative case 2', () => {
      test('should send error with status 500 if Authorization', (done) => {
        request(app)
          .delete(`/category/${CategoryId}`)
          .set({ token: token1 })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            done();
          });
      });
    });
  });

  /* Food */
  describe('/POST create food', () => {
    describe('positive case', () => {
      test('should send an object (name, description, CategoryId, price, quantity, qtyout) with status 201', (done) => {
        request(app)
          .post('/food')
          .send({
            name: 'food oke',
            description: 'description',
            CategoryId: CategoryId,
            price: 10000,
            quantity: 10,
            qtyout: 0,
          })
          .set({ token: token })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);

            FoodId = res.body.food.id;

            expect(res.body.food).toHaveProperty('id', expect.any(Number));
            done();
          });
      });
    });
    describe('negative case', () => {
      test('should send error with status 500 if no token', (done) => {
        request(app)
          .post('/food')
          .send({
            name: 'food oke',
            description: 'description',
            CategoryId: CategoryId,
            price: 10000,
            quantity: 10,
            qtyout: 0,
          })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('err');
            done();
          });
      });
    });
  });
  describe('/GET food', () => {
    describe('positive case', () => {
      test('should send an object(name, description, CategoryId, price, quantity, qtyout) with status 200', (done) => {
        request(app)
          .get(`/food/${FoodId}`)
          .set({ token: token })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);
            expect(res.body.data).toHaveProperty('id', expect.any(Number));
            expect(res.body.data).toHaveProperty('name', expect.any(String));
            expect(res.body.data).toHaveProperty(
              'description',
              expect.any(String)
            );
            expect(res.body.data).toHaveProperty(
              'CategoryId',
              expect.any(Number)
            );
            expect(res.body.data).toHaveProperty('price', expect.any(String));
            expect(res.body.data).toHaveProperty(
              'quantity',
              expect.any(Number)
            );
            expect(res.body.data).toHaveProperty('qtyout', expect.any(Number));
            done();
          });
      });
    });
    describe('negative case', () => {
      test('should send error with status 500 if no token', (done) => {
        request(app)
          .get(`/food/${FoodId}`)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('err');
            done();
          });
      });
    });
  });
  describe('/PUT food', () => {
    describe('positive case', () => {
      test('should update food with status 200', (done) => {
        request(app)
          .put(`/food/${FoodId}`)
          .send({
            name: 'food 12',
          })
          .set({ token: token })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);
            done();
          });
      });
    });
    describe('negative case', () => {
      test('should send error with status 500 if no token', (done) => {
        request(app)
          .put(`/food/${FoodId}`)
          .send({
            name: 'food 12',
          })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            done();
          });
      });
    });
  });
  describe('/DELETE food', () => {
    describe('positive case', () => {
      test('should delete food with status 200', (done) => {
        request(app)
          .delete(`/food/${FoodId}`)
          .set({ token: token })
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(200);
            done();
          });
      });
    });
    describe('negative case', () => {
      test('should send error with status 500 if no token', (done) => {
        request(app)
          .delete(`/food/${FoodId}`)
          .end((err, res) => {
            expect(err).toBe(null);
            expect(res.status).toBe(500);
            done();
          });
      });
    });
  });
});

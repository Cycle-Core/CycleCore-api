// test/auth.e2e-spec.ts
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth & Users (e2e)', () => {
  let app: INestApplication;
  let server: any;
  let accessToken: string;

  // use a timestamp so emails/usernames are unique each run
  const unique = Date.now();
  const baseRegisterDto = {
    email: `user${unique}@example.com`,
    username: `user${unique}`,
    password: 'StrongPass123',
    confirmPassword: 'StrongPass123',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // if you use ValidationPipe in main.ts, mirror it here
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  // ---------- REGISTER ----------

  it('should register a new user successfully', async () => {
    const res = await request(server)
      .post('/auth/register')
      .send(baseRegisterDto)
      .expect(201);

    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.email).toBe(baseRegisterDto.email.toLowerCase());
    expect(res.body.user.username).toBe(baseRegisterDto.username.toLowerCase());
    expect(res.body).toHaveProperty('accessToken');
  });

  it('should not allow registering with the same email/username again', async () => {
    const res = await request(server)
      .post('/auth/register')
      .send(baseRegisterDto)
      .expect(409);

    expect(res.body.message).toBeDefined();
  });

  it('should reject registration if passwords do not match', async () => {
    const badDto = {
      ...baseRegisterDto,
      email: `mismatch${unique}@example.com`,
      username: `mismatch${unique}`,
      password: 'StrongPass123',
      confirmPassword: 'OtherPass123',
    };

    const res = await request(server)
      .post('/auth/register')
      .send(badDto)
      .expect(409);

    expect(res.body.message).toContain('Passwords do not match');
  });

  // ---------- LOGIN ----------

  it('should login with email and get access token', async () => {
    const res = await request(server)
      .post('/auth/login')
      .send({
        identifier: baseRegisterDto.email,
        password: baseRegisterDto.password,
      })
      .expect(200);

    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('user');
    accessToken = res.body.accessToken;
  });

  it('should login with username as identifier', async () => {
    const res = await request(server)
      .post('/auth/login')
      .send({
        identifier: baseRegisterDto.username,
        password: baseRegisterDto.password,
      })
      .expect(200);

    expect(res.body).toHaveProperty('accessToken');
  });

  it('should fail login with wrong password', async () => {
    const res = await request(server)
      .post('/auth/login')
      .send({
        identifier: baseRegisterDto.email,
        password: 'WrongPassword123',
      })
      .expect(401);

    expect(res.body.message).toContain('Invalid credentials');
  });

  it('should fail login with unknown user', async () => {
    const res = await request(server)
      .post('/auth/login')
      .send({
        identifier: 'idontexist@example.com',
        password: 'StrongPass123',
      })
      .expect(401);

    expect(res.body.message).toContain('Invalid credentials');
  });

  // ---------- PROTECTED ROUTE + LOGOUT ----------

  it('should access /users/me with a valid token', async () => {
    const res = await request(server)
      .get('/users/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe(baseRegisterDto.email.toLowerCase());
  });

  it('should reject /users/me without a token', async () => {
    await request(server).get('/users/me').expect(401);
  });

  it('should handle logout (token is accepted and returns success)', async () => {
    const res = await request(server)
      .post('/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body).toEqual({ success: true });
    // Right now we don't blacklist tokens, so the token would still technically work.
    // Later, when you implement refresh/blacklist, you can update this test.
  });
});

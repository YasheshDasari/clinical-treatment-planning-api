process.env.DB_HOST = 'localhost';
process.env.DB_USER = 'postgres';
process.env.DB_PASSWORD = 'Fus@2026';
process.env.DB_NAME = 'clinical_test_db';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';

describe('Users (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        dataSource = app.get(DataSource);
        await dataSource.synchronize(true); // drops & recreates schema
    });

    afterAll(async () => {
        await app.close();
        await dataSource.destroy();
    });

    it('POST /users should create a user', async () => {
        return request(app.getHttpServer())
            .post('/users')
            .send({
                password: 'testPassword',
                email: 'user@test.com'
            })
            .expect(201)
            .expect(res => {
            expect(res.body).toHaveProperty('id');
            expect(res.body.email).toBe('user@test.com');
            expect(res.body.password).toBe('testPassword');
            });
    });
});
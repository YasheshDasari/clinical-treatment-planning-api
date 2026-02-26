import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from 'supertest';
import { AppModule } from "../src/app.module";

describe('Users (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('POST /users should create a user', async () => {
        return request(app.getHttpServer())
            .post('/users')
            .send({
                username: 'testuser',
                password: 'testpass',
            })
            .expect(201);
    });
});
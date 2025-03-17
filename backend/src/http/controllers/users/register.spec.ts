import chai from 'chai';
import { Request, Response } from 'express';
import Sinon from 'sinon';
import { ZodError } from 'zod';
import { register } from './register';
import { registerBodySchema } from '@/use-cases/schemas/registerBodySchema';
import { connectDB, sequelize } from '@/config/database';
import { UserModel } from '@/models/User';

export const userMock = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: 'johndoe123',
};

const { expect } = chai;

describe('Register Controller (Mocha, Chai, Sinon)', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let statusStub: Sinon.SinonStub;
  let sendStub: Sinon.SinonStub;
  let parseStub: Sinon.SinonStub;
  let connectDBStub: Sinon.SinonStub;

  beforeEach(async () => {
    Sinon.restore();

    await sequelize.sync();

    await connectDB()

    mockRequest = {
      body: {},
    };

    statusStub = Sinon.stub();
    sendStub = Sinon.stub();

    mockResponse = {
      status: statusStub.returns({ send: sendStub }),
    };

    parseStub = Sinon.stub(registerBodySchema, "parse");

    connectDBStub = Sinon.stub();
    Sinon.stub(require('@/config/database'), 'connectDB').callsFake(() => connectDBStub());
  });

  afterEach(async () => {
    Sinon.restore();
    await sequelize.close();
  });

  it('should register a new user', async () => {
    const userData = userMock;

    parseStub.returns(userData);

    await register(mockRequest as Request, mockResponse as Response);

    expect(connectDBStub.calledOnce).to.be.true;
    expect(parseStub.calledOnceWith(mockRequest.body)).to.be.true;
    expect(statusStub.calledOnceWith(201)).to.be.true;
    expect(sendStub.calledOnce).to.be.true;
  });

  it('should return 409 if user already exists', async () => {
    const userData = userMock;

    parseStub.returns(userData);
    await UserModel.create(userData);

    await register(mockRequest as Request, mockResponse as Response);

    expect(connectDBStub.calledOnce).to.be.true;
    expect(parseStub.calledOnceWith(mockRequest.body)).to.be.true;
    expect(statusStub.calledOnceWith(409)).to.be.true;
    expect(sendStub.calledOnceWith({ message: 'E-mail already exists.' })).to.be.true;
  });

  it('should throw if any other error occurs', async () => {
    const userData = userMock;
    const error = new Error('Some other error');

    parseStub.returns(userData);
    Sinon.stub(UserModel, 'create').rejects(error);

    try {
      await register(mockRequest as Request, mockResponse as Response);
      expect.fail('Expected an error to be thrown');
    } catch (err) {
      expect(err).to.equal(error);
    }

    expect(connectDBStub.calledOnce).to.be.true;
    expect(parseStub.calledOnceWith(mockRequest.body)).to.be.true;
  });

  it('should throw an error if schema validation fails', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      password: 'password123',
    };

    const error = new ZodError([]);
    parseStub.throws(error);

    mockRequest.body = invalidData;
    try {
      await register(mockRequest as Request, mockResponse as Response);
      expect.fail('Expected an error to be thrown');
    } catch (err) {
      expect(err).to.be.an.instanceof(ZodError);
      expect(err).to.equal(error);
    }
    expect(connectDBStub.notCalled).to.be.true;
    expect(parseStub.calledOnceWith(invalidData)).to.be.true;
  });
});

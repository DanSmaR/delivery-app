import { emailValid, validToken, validUseName } from '../helpers/constants';

export default {
  get: jest.fn(() => Promise.resolve({
    data: {
      token: validToken,
      id: 4,
      email: validUseName,
      name: emailValid,
    },
  })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({})),
  create: jest.fn(() => Promise.resolve({})),
};

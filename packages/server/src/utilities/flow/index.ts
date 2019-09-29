import crypto from 'crypto';

const generateId = () => {
  return crypto.randomBytes(20).toString('hex');
};

export {
  generateId,
};

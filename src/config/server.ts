import Hapi from '@hapi/hapi';

export const server = Hapi.server({
  port: process.env.PORT,
  host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
});

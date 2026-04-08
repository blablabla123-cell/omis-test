import Joi from 'joi';

export default () => {
  console.log(`${process.env.DATABASE_URL}`);
  const port = process.env.PORT || '3000';
  const postgresPort = process.env.POSTGRES_PORT || '5432';

  return {
    port: Number(port),
    database: {
      url: process.env.DATABASE_URL,
      host: process.env.POSTGRES_HOST,
      port: Number(postgresPort),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      name: process.env.POSTGRES_DB,
    },
    jwt: process.env.JWT_ACCESS_SECRET,
  };
};

export const validationSchema = Joi.object({
  PORT: Joi.number().min(0).max(65535).default(3000),
  DATABASE_URL: Joi.string()
    .uri({
      scheme: ['postgres', 'postgresql'],
    })
    .required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().min(0).max(65535).required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  JWT_ACCESS_SECRET: Joi.string().required(),
});

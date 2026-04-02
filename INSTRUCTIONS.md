# Instrictions

1. Declare .env with the following values:

```
DATABASE_URL=postgresql://user:password@postgres:5432/database?schema=public

PORT=3000

POSTGRES_HOST=postgres

POSTGRES_PORT=5432
POSTGRES_DB=database
POSTGRES_USER=user
POSTGRES_PASSWORD=password

JWT_ACCESS_SECRET=atsecret

```

2. Run docker compose up

3. Log in as admin via test user credentials

`test@example.com`
`password`

4. API Documentation
```
You can navigate to `host/api` and view Swagger with all the available endpoints
```

4. You can view the database Prisma Studio navigating to `host:5555`


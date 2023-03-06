# Route

```/sendMessage```

# Architecture

All the code is located in the ```src``` folder.

```plugins```:
- [Basic Auth](https://github.com/fastify/fastify-basic-auth)
- [Helmet](https://github.com/fastify/fastify-helmet)
- [Sensible](https://github.com/fastify/fastify-sensible)

```routes```:
- ```index.ts```: /

```services```:
- ```env.ts```: Parse env with [Znv](https://github.com/lostfictions/znv) for type-safe environment parsing
- ```logger.ts```: [Pino](https://github.com/pinojs/pino) for logging

# How to run

The project can be run with or without Docker.

### Without Docker

3 steps are needed: 

1. Install dependencies

```pnpm i```

2. Fill the necessary environement variables by creating a .env file

The necessary values to be filled are in ```.env.example```

3. Run the backend

```pnpm dev```

4. Access the "Hello World" example

Don't forget to set the Bearer authorization header with the ```AUTH_TOKEN``` env var (default = secret)

```https://0.0.0.0:3000```


### With Docker

You can use Docker to run the backend:

1. Run the docker image

```docker-compose up -d```

2. Access the "Hello World" example

Don't forget to set the Bearer authorization header with the ```AUTH_TOKEN``` env var (default = secret)

```https://0.0.0.0:3000```

## Tests

Tests are located in the ```__tests__``` folder.

To run them you have 2 options :

1. Run tests without watch mode 

```pnpm test```

2. Run tests with watch mode 

```pnpm test:watch```
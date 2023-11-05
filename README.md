# Infrastructure Mastery: A Kubernetes Learning Showcase

## 🚧 PROJECT UNDER CONSTRUCTION 🚧

> Disclaimer! This project is still in progress and has not yet been finished.

## Introduction

Welcome to my ✨Infrastructure Mastery project✨. This project is designed to provide a **comprehensive learning experience** for Kubernetes, Docker, and Terraform.

It follows a three-layered architecture model. Each layer is containerized using Docker and orchestrated using Kubernetes. The project also demonstrates the use of Terraform for infrastructure as code, and the diagramming using the C4 model of all the system's architecture.

## Why is this useful to you?

This project was made as a learning process for me, but can also help you learn. You can follow along the README to build and run the project, and **gain a deep understanding of modern infrastructure practices**.

## What will be covered?

> **Important disclaimer:** The project will NOT focus on the specifics of the implementation of the applications. The project is meant to focus on the design of the infrastructure and architecture of complex computer systems, not on the code itself. Its main focus is the use of Kubernetes and best practices for the creation of a system robust enough for corporate environments.

The project will cover the following basics of Kubernetes:

- Creating and managing Docker containers
- Creating and managing Kubernetes deployments
- Creating and managing Kubernetes services
- Creating and managing Kubernetes persistent volumes and persistent volume claims
- Using Kubernetes secrets to manage sensitive data
- Knowledge of local Kubernetes environments with [minikube](https://minikube.sigs.k8s.io/docs/) and CI deployments with a cloud provider.

This project structure and setup will provide a solid foundation for learning Terraform, as it covers the basics of infrastructure as code and container orchestration. It will also serve as a demonstration of how to apply skills in software system architecture, following best practices such as the C4 model and the three-layered model.

Without further ado, let's begin!

### The layers

The project is based on the three-layered architecture. You can find [plenty of resources online](https://en.wikipedia.org/wiki/Multitier_architecture) regarding this topic, but for those who aren't familiar with it, it's a way to design architecture composed of 3 layers:

- **Web Layer**: In our case, a simple single-page application (SPA) built with [React](https://react.dev/) and [Vite](https://vitejs.dev/). This will be written in TypeScript and will communicate with the business logic layer via an API.

- **Business Logic Layer**: A [Nuxt](https://nuxtjs.org/) server that handles all the business logic. This will also be written in TypeScript and will communicate with the persistence layer.

- **Persistence Layer**: A [PostgreSQL](https://www.postgresql.org/) database that stores the data.

The project is structured as follows:

```
infrastructure-mastery/
│
├── frontend/
│   ├── src/
│   └── Dockerfile
|   └── ...
│
├── backend/
│   ├── src/
│   └── Dockerfile
|   └── ...
|
├── database/
│   ├── src/
│   └── Dockerfile
|   └── ...
│
└── kubernetes/
    ├── frontend-deployment.yaml
    ├── backend-deployment.yaml
    ├── database-deployment.yaml
    ├── other-config-files.yaml
    └── ...
```

### C4 diagrams

For those unfamiliar with the [C4 model](https://c4model.com/), the C4 model consists of a set of hierarchical diagrams (system Context, Containers, Components, and Code). The creation of these diagrams follows a certain methodology and is used to provide clarity to a team of engineers on what and how to go about the creation of a complex computer system.

These are the models:

🚧 TODO 🚧

### Prerequisites for a local development environment

🚧 TODO 🚧

### The database

The database is rather simple. There's two tables, comments and posts. We'll be using those to create a simple blog.

There's a `Dockerfile` that initalizes a postgreSQL instance in the port 5432. It will use the `.env.local` file to initalize all the database user, password, host, name, etc.

Notice that the `.env` is not tracked by git. This is intentional, as these are secrets that shouldn't be tracked with a git repository. In order to initialize the database locally, you might need to create your own `.env` yourself, like so:

```bash
echo "POSTGRES_DB=test" > .env
echo "POSTGRES_HOST=localhost" >> .env
echo "POSTGRES_USER=admin" >> .env
echo "POSTGRES_PASSWORD=admin" >> .env
echo "POSTGRES_PORT=5432" >> .env
echo "POSTGRES_MAX=10" >> .env
echo "DATABASE_URL=postgres://admin:admin@localhost:5432/test" >> .env
```

Once set the secrets, to create the docker image, you can run the following commands:

```bash
docker build -t infra-mastery-database .
```

To run the container, you can run:

```bash
docker run --env-file .env -p 5432:5432 infra-mastery-database
```

This will mount a postgreSQL container and create all the tables needed. It will also show you all the logs coming from the database. You may run it with the -d flag to run the database on the background. Take into account that stopping the container with `ctrl+C` will not really delete the container, just pause it and leave it in the background.

We can check that by listing all containers running with this command:

```bash
sudo docker ps --all
```

If you want to really shut down the database (which is the recommended approach), you can run:

```bash
sudo docker rm infra-mastery-database
```

### The backend

The backend is a simple node.js server built with [Nitro](https://nitro.unjs.io/). It uses [Kysely](https://kysely.dev/) as a query builder to communicate with the database, and provides a [RESTful](https://en.wikipedia.org/wiki/REST) API to make CRUD actions.

Notice that we provide Kysely with the database secrets using an `.env` file not tracked by git. If you don't have this file yet, you can copy the `.env` file used in the database into the backend directory.

Before running the server, make sure you have the database container up and running. In order to initialize the server, you can run

```bash
pnpm install
pnpm run dev
```

This will make all endpoints avialable! Visit http://localhost:3000 to check if the sever is running. You should get something like this:

```json
{
  "status": "OK",
  "timestamp": "2023-11-05T12:35:13.150Z"
}
```

Now, if you go to http://localhost:3000/posts you will be able to see all the posts!

> If you encounter an error (HTTP status code 500). This is likely because you're trying to access the database, but you don't have the container up and running. Make sure you have followed the steps in the previous section.

You may notice that there are no data to show. This is because the database is not filled with data. You can create a new blog by doing a POST request to the same endpoint, or (better yet) you can run a population script that gets in charge of popoulating the database with dummy data.

To execute the population script you can run:

```
pnpm run db-populate
```

> Make sure you have the .env file already set up as discussed eariler!

After that, you can check the endpoint http://localhost:3000/posts again and you will see some data.

🚧 TODO: DOCKERIZE 🚧

Perfect! Now onto the frontend.

### The frontend

🚧 TODO 🚧

### Kubernetes

🚧 TODO 🚧

### Credits

🚧 TODO 🚧

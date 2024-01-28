# Infrastructure Mastery: A Kubernetes Learning Showcase

## 🚧 PROJECT UNDER CONSTRUCTION 🚧

> Disclaimer! This project is still in progress and has not yet been finished.

## Introduction

Welcome to my ✨Infrastructure Mastery project✨. This project is designed to provide a **comprehensive learning experience** for Kubernetes and Docker.

It follows a three-layered architecture model. Each layer is containerized using Docker and orchestrated using Kubernetes. The project also demonstrates the use of yaml's for infrastructure as code, and the diagramming using the C4 model of all the system's architecture.

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

### Prerequisites for a local development environment

- Docker (See [Docker docs](https://docs.docker.com/engine/install/))
  > To build the images of all 3 applications
- Kubernetes (k8s) (see [The official k8s installation docs](https://kubernetes.io/docs/tasks/tools/))
  > For configuring the cluster
- Minikube (See [installation docs](https://minikube.sigs.k8s.io/docs/start/))
  > To execute the local k8s cluster
- Node.js (See [Node.js official downlaod page](https://nodejs.org/en/download))
  > If you want to run locally the applications before doing the images

### A quick word on containers and images

If you're new to the world of containers and images, think of a container as a package that holds everything your application needs to run, including the code, runtime, system tools, libraries, and settings. It's like a shipping container that can be moved around easily and ensures that the contents are consistent no matter where it's deployed.

An image, on the other hand, is like a blueprint for creating containers. It's a snapshot of a container, containing the application code and all its dependencies. You can think of it as a template that can be used to create multiple identical containers.

If you haven't worked with docker before, don't worry! This will be the perfect time to learn. We'll be going over all the docker commands in the next sections.

### A word on minikube

Minikube is just another container. It differs from normal kubernetes clusters because it does not run in different machines in also even in cloud severs that you rent, as you would usuallly do in a normal kubernetes infrastructure. As this will only be for getting familiar with the tools and to understand how everything works, we'll be doing everything locally and in only one machine. In a virtualized manner, sort to speak, instead of the phyisical approach of configuring and syncronizing multiple servers.

This will save us a bit of work and will help us focus on what we really care: Learning how it works and how to configure it.

### The layers

The project is based on the three-layered architecture. You can find [plenty of resources online](https://en.wikipedia.org/wiki/Multitier_architecture) regarding this topic, but for those who aren't familiar with it, it's a way to design architecture composed of 3 layers:

- **Web Layer**: In our case, a simple single-page application (SPA) built with [React](https://react.dev/) and [Vite](https://vitejs.dev/). This will be written in TypeScript and will communicate with the business logic layer via an API.

- **Business Logic Layer**: A [Nitro](https://nitro.unjs.io/) server that handles all the business logic. This will also be written in TypeScript and will act as mediator between the persistence layer and the front-end.

- **Persistence Layer**: A [PostgreSQL](https://www.postgresql.org/) database that stores the data.

The project is structured in 3 main directories, with their respective Dockerfile, and the kubernetes directory, where all the container orchestration will be defined:

```
infrastructure-mastery/
│
├── frontend/
│   ├── Dockerfile
|   └── ...
│
├── backend/
│   ├── Dockerfile
|   └── ...
|
├── database/
│   ├── Dockerfile
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

For those unfamiliar with the [C4 model](https://c4model.com/), the C4 model consists of a set of hierarchical diagrams (System **C**ontext, **C**ontainers, **C**omponents, and **C**ode). The creation of these diagrams follows a certain methodology and is used to provide clarity to a team of engineers on what to do and how to go about the creation of a complex computer system.

These are the models:

🚧 TODO 🚧

### Minikube setup

Once you have minikube set up, you can check if its running with the following command:

``minikube status`

To start it, you can run:

```
minikube start --addons=ingress
```

> The ingress addon is an official minikube addon that allows us to play with certain routing configuration and specific ingress config details.

Now, before configuring minikube, we have to set up all of our application image's into the minikube instance. This must be done inside the minikube container and there are multiple ways to achieve this (See [here](https://minikube.sigs.k8s.io/docs/handbook/pushing/) for the full list).

What we will do is configure docker to point to the docker engine inside minikube itself, and we can achive this with this command:

```
eval $(minikube docker-env)
```

Now, every command we do with docker, it will run inside minikube, such that when we tell minikube how to run our applications, it will have all the images necessary to do so.

### The database

Let's go over the three layers, how they work and how to build ther images for minikube!

The database is rather simple. There is not much code to see, besides a simple SQL file for the creation of the table schemas. There's two tables, comments and posts. We'll be using those to create a simple blog.

![database](/images/database.png)

All the magic occurs in the [Dockerfile](/database/Dockerfile). I enocurage you to read through the steps to understand everything that is happening behind the scenes!

Notice that the `.env` file (the one that is used to tell postgres what user and password will have) is not tracked by git. This is intentional, as these are secrets that shouldn't be tracked with a git repository. In order to initialize the database locally, you might need to create your own `.env` yourself, like so:

> Make sure you are in the `/database` directory before executing this command

```bash
echo "POSTGRES_DB=test" > .env
echo "POSTGRES_HOST=localhost" >> .env
echo "POSTGRES_USER=admin" >> .env
echo "POSTGRES_PASSWORD=admin" >> .env
echo "POSTGRES_PORT=5432" >> .env
echo "POSTGRES_MAX=10" >> .env
echo "DATABASE_URL=postgres://admin:admin@localhost:5432/test" >> .env
```

This generates the missing `.env` file with all the enviroment variables. Once we have that, to create the docker image, you can run the following command:

```bash
docker build -t infra-mastery-database .
```

> The -t flag is to give the image a name. In this case, "infra-mastery-database"

> After the name of the image, we specify in which directroy our Dockerfile is. In this case, it is in the same directory we are, hence the dot

This will execute [the dockerfile](/database/Dockerfile). To see all the images we have in our machine, you can run:

```bash
sudo docker images
```

> Besides the one we just built, you should also see some images that minikube uses internally. If not, follow the steps in the minikube setup section

Now, take into account that this is similar to a build step. Right now, a "screenshot" was made of the status of our application (in this case, the postgres database) and saved into the image. If we were to change the application (say, we switch from postgreSQL to mySQL, or maybe change the SQL code to initalize the tables) we'd have to redo the image, as it would not have the most recent changes.

If we were to need to redo the image, we could delete the previous image by doing:

```bash
sudo docker rmi infra-mastery-database
```

After that, we could redo our image like before and have the image with the new changes! Now, as we tagged our image (we gave it a name) there is no need to delete and reconstruct the image. We could have overwritten it by just doing the initial command. That is why people usually name the images and containers! (And also to be able to differenciate them from other images/containers)

Be careful! This is just an image, not the container. This is not executable in a machine, it has to be packed in a container. To run this image in a container, you can use this command:

```bash
docker run --env-file .env -p 5432:5432 infra-mastery-database
```

> The --env-file flag is to specify which file to use for the enviroment variables, which in our case is `.env`.

> The -p flag is to specify the port. We want the port 5432 of the container be piped into our machine's 5432 port.

> After the -p flag, we specify which image will use for that container.

You may run it with the -d flag to run the database on the background. Take into account that stopping the container with `ctrl+C` will not really delete the container, just pause it and leave it in the background.

We can check if it's still running that by listing all containers with this command:

```bash
sudo docker ps --all
```

> We use the ps command to list the containers. This by default will only show the ones running

> The --all flag is used to list all containers, even the ones that are paused

If you want to really shut down the database, you can delete the docker container by running:

```bash
sudo docker rm infra-mastery-database
```

### The backend

> I'll be guiding you to configuring a local enviroment first, and then the dockerization.

The backend is a simple node.js server built with [Nitro](https://nitro.unjs.io/). It uses [Kysely](https://kysely.dev/) as a query builder to communicate with the database, and provides a [RESTful](https://en.wikipedia.org/wiki/REST) API to make CRUD actions.

![backend](/images/backend.png)

Notice that we provide Kysely with the database secrets using an `.env` file not tracked by git. If you don't have this file yet, you can copy the `.env` file used in the database into the backend directory.

Before running the server, make sure you have the database container up and running. In order to initialize the server, you can run:

> Make sure you are in the `/backend` directory

```bash
pnpm install # or npm or yarn, it doesn't really matter. I prefer pnpm
pnpm run dev
```

This will make all endpoints avialable! Visit http://localhost:3000 to check if the sever is running. You should get something like this:

```json
{
  "status": "OK",
  "timestamp": "2023-11-05T12:35:13.150Z"
}
```

> The timestamp should be the current date

Now, if you go to http://localhost:3000/posts you will be able to see all the posts!

> If you encounter an error (HTTP status code 500). This is likely because you're trying to access the database, but you don't have the database container up and running. Make sure you have followed the steps in the previous section.

You may notice that there are no data to show. This is because the database is not filled with data. You can create a new blog by doing a POST request to the same endpoint, or (better yet) you can run a population script that gets in charge of popoulating the database with dummy data.

To execute the population script you can run:

```
pnpm run db-populate
```

> Make sure you have the .env file already set up as discussed eariler!

After that, you can check the endpoint http://localhost:3000/posts again and you will see some data.

Great! Now we have to dockerize this application. It runs locally and we can work on it like we usually would, but we have to create a docker image for kubernetes to work on. Let's see how that is done:

First, let's create the image using [this dockerfile](/backend/Dockerfile). It is highly encouraged to read this file, as it will give you a better understanding of what's going on behind the scenes!

We can create the image by running:

```bash
docker build -t infra-mastery-backend .
```

And mounting a container with this command:

```bash
docker run --env-file .env -p 3000:3000 infra-mastery-backend
```

Great! Now you can navigate again to http://localhost:3000/ to see the app up and running. Notice that if we navigate to http://localhost:3000/posts, the Nitro API will throw an error, as it will not be able to connect to the database, even if you have the other container also up and running.

This is a network issue. They are not set up to be working in the same network, so the Nitro app is trying to find something in the port 5432 (the port where postgreSQL should be running) and it does not find it. Docker offers ways to solve this problem, but due to the fact that we will be using kubernetes (Something much more robust) this does not concern us just yet. For now we're satisfied that we can dockerize our API.

### The frontend

The frontend is very simple. It uses [React](https://react.dev/) and [Vite](https://vitejs.dev/). It's written in Typescript aswell.

![frontend](/images/frontend.png)

You can run the app like so:

> Make sure you are in the /frontend directory

```bash
pnpm install # or npm or yarn, it doesn't really matter. I prefer pnpm
pnpm run dev
```

Great! Now you can visit http://localhost:5173/ to see the application.

> This application does not use enviroment variables, due to some incompatibilities with how vite handles them. For more information, check the comment on [this file](/frontend/src/lib/useResource.ts)

Now, if you have the docker container of the database running, and the backend running also as shown, you will be able to see the front with all the posts and comments! Now, let's dockerize it.

We can create the image by running:

```bash
docker build -t infra-mastery-frontend .
```

And mounting a container with this command:

```bash
docker run -p 4173:4173 infra-mastery-frontend
```

## Kubernetes

If you've reached this point, you're almost there! The applications are contenerized, minikube has been set up, now it's all about configuring the cluster.

Before proceding any further, you should check you have all the images you need:

```
docker image ls

REPOSITORY                                           TAG       IMAGE ID       CREATED              SIZE
infra-mastery-database                               latest    6ba9084f8f48   32 minutes ago       425MB
infra-mastery-backend                                latest    ca4f63bf0d62   31 minutes ago       327MB
infra-mastery-frontend                               latest    d24f0c9c146d   30 minutes ago       341MB
registry.k8s.io/ingress-nginx/controller             <none>    5aa0bf4798fa   2 months ago         273MB
registry.k8s.io/kube-apiserver                       v1.28.3   537434729123   3 months ago         126MB
registry.k8s.io/kube-scheduler                       v1.28.3   6d1b4fd1b182   3 months ago         60.1MB
registry.k8s.io/kube-controller-manager              v1.28.3   10baa1ca1706   3 months ago         122MB
registry.k8s.io/kube-proxy                           v1.28.3   bfc896cf80fb   3 months ago         73.1MB
registry.k8s.io/ingress-nginx/kube-webhook-certgen   <none>    1ebff0f9671b   3 months ago         53.7MB
registry.k8s.io/etcd                                 3.5.9-0   73deb9a3f702   8 months ago         294MB
registry.k8s.io/coredns/coredns                      v1.10.1   ead0a4a53df8   11 months ago        53.6MB
registry.k8s.io/pause                                3.9       e6f181688397   15 months ago        744kB
kubernetesui/dashboard                               <none>    07655ddf2eeb   16 months ago        246MB
kubernetesui/metrics-scraper                         <none>    115053965e86   20 months ago        43.8MB
gcr.io/k8s-minikube/storage-provisioner              v5        6e38f40d628d   2 years ago          31.5MB
```

If you have all 3 of the images beginning with infra-mastery, as well as the rest of minikube images, then you're in the right path.

Next, let's spin up the minikube dashboard. This will allow us to have an easy way to check on how the status of our cluster is looking, and is great particullarly for beginners.

To start the dashboard, run

```
minikube dashboard
```

> This will give you a link to access a cool looking dashboard. But don't worry if you don't see anything yet! We haven't setted it up, so you won't seem uch

Before we dive into the configuration, let's understand some basic Kubernetes nomenclature:

- **Pods**: The smallest and simplest unit in the Kubernetes object model that you create or deploy. A Pod represents a running process on your cluster. It is what in Docker we call a container.

- **Services**: An abstract way to expose an application running on a set of Pods as a network service. Services are the way to network pods.

- **Deployments**: A Deployment controller provides declarative updates for Pods and ReplicaSets. You describe a desired state in a Deployment, and the Deployment Controller changes the actual state to the desired state at a controlled rate.

- **Namespaces**: Kubernetes supports multiple virtual clusters backed by the same physical cluster. These virtual clusters are called namespaces.

Now that we have a basic understanding of these terms, let's proceed with the setup.

### Configuring the frontend

Kubernetes is interacted mainly with the kubectl CLI. This will allow os to set up pods, services, deployments, namespaces...
But doing this from the command line can be a challenge, and you can't easily revisit what commands did you use or how is the cluster set up now.
That is why most of engineers use yaml's to describe all the configuration, in text. This way, you can version all your configuration and modify them easily.

> If you're not familiar with yaml's, think of them as JSON's, but with a bit more of capabilities.

> If you're a vscode user like me, you might be interested in the (Kubernetes extension)[https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools]. If you are not, make a quick google search, I'm sure you'll find something equivalent for your IDE. This extension will help you with some autocompletions in the yaml's.

The frontend configuration is based on 3 yamls:

1. (deployment.yaml)[/kubernetes/frontend/deployment.yaml]: This file is used to create a Deployment in Kubernetes. A Deployment is a Kubernetes object that represents a set of multiple, identical Pods with no unique identities. It is used to keep the Pods running and update them in a controlled way.

> The Deployment specifies the number of replicas (instances) of the application that should be running, the Docker image to use for creating the Pods, and the resources (CPU and memory) to allocate for each Pod.

2. service.yaml: This file is used to create a Service in Kubernetes. A Service is an abstract way to expose an application running on a set of Pods as a network service. It defines a logical set of Pods and a policy by which to access them.

> Imagine it as the trafic police officer who tells when the cars have to stop or to continue, but with network connections between pods.

3. ingress.yaml: This file is used to create an Ingress in Kubernetes. An Ingress is an API object that manages external access to the services in a cluster, typically HTTP. Ingress can provide load balancing, SSL termination and name-based virtual hosting.

> As a default, no pods have an ingress, and all communication between pods is exclusively internal. But when you need to expose something to the internet (for example, our frontend), then you need to decalre an ingress. This way, even though our frontend has access to the backend, only the frontend is exposed to the world.

Feel free to read the [files](/kubernetes/frontend/) and play arround with them. It's the best way to learn!

To apply this changes, you can run:

```
kubectl apply -f kubernetes/frontend/deployment.yaml
kubectl apply -f kubernetes/frontend/service.yaml
kubectl apply -f kubernetes/frontend/ingress.yaml
```

![Dashboard](/images/dashboard.png)

You can check the status of your deployment using the dashboard, or the CLI:

```
kubectl get pods
```

Yuu can get the local URL to access the frontend with the following command:

```
minikube service frontend-service --ur
```

> You'll notice the frontend is not finding the backend! This is because we haven't set up the backend yet. Let's keep going!

### Configuring the backend

Now that you now the basics, it's a matter of repetition. 2 yaml's this time, the [deployment](/kubernetes/backend/deployment.yaml) and the [service](/kubernetes/backend/service.yaml). They both behave similar to the ones in the frontend.

Notice that there is no ingress this time! This is intentionall, as we only want to expose the backend to our frontend application, such that it becomes the only access point to the kluster.

To apply this changes, you can run:

```
kubectl apply -f kubernetes/backend/deployment.yaml
kubectl apply -f kubernetes/backend/service.yaml
```

### Configuring the database

The backend is a bit special. Kubernetes is great at destroying pods and creating them again in case there is any problem with them. But what about a database? You can't just destory a database and create it once again without losing the data.

For that we'll use persistent volumes and persistent volume claims.

In Kubernetes, Persistent Volumes (PVs) and Persistent Volume Claims (PVCs) are used to manage storage. This is particularly important for stateful applications, like our database.

The [Persistent Volume (PV)](/kubernetes/database/persistent-volume.yaml) serves as a piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using Storage Classes. It is a resource in the cluster just like a node is a cluster resource.

The [Persistent Volume Claim (PVC)](/kubernetes/database/persistent-volume-claim.yaml) serves as a request for storage by a user. It is similar to a pod. Pods consume node resources and PVCs consume PV resources.

To apply this changes, you can run:

```
kubectl apply -f kubernetes/database/deployment.yaml
kubectl apply -f kubernetes/database/service.yaml
kubectl apply -f kubernetes/database/persistent-volume.yaml
kubectl apply -f kubernetes/database/persistent-volume-claim.yaml
```

### Managing secrets

In Kubernetes, secrets are used to manage sensitive information, such as passwords, OAuth tokens, and ssh keys. Storing this sensitive information in a Secret is safer and more flexible than putting it verbatim in a Pod definition or in a container image.

We have a [secret file](/kubernetes/secrets/db-credentials.yaml) which contains the database credentials. The data field of the Secret is used to store arbitrary data, encoded using base64. This encoding allows the secret data to be safely used in a wide variety of environments, without the risk of the data being exposed.

You can encode any secret like so:

```
echo -n "https://frontend-service:3000" | base64
```

This is the non-enconded version of the secrets, in .env format:

```
POSTGRES_DB="test"
POSTGRES_HOST="localhost"
POSTGRES_USER="admin"
POSTGRES_PASSWORD="admin"
POSTGRES_PORT="5432"
POSTGRES_MAX="10"

DATABASE_URL="postgres://admin:admin@database-service:5432/test"
BACKEND_URL="https://backend-service:3000"
FRONTEND_URL="https://frontend-service:3000"
```

> Notice that the DATABASE_URL is a bit different from the one that we would use without k8s involved. This is because the database is a service of type ClusterIP, meaning that it is only accesible iniside the cluster. This is so to prevent vulnerabilities and external attacks. To reference services inside our k8s network, we can use the service name (hence why it is no longer localhost:5432 but database-service:5432. This will be explained in detail in the next section

Here is how you can apply the secret:

```
kubectl apply -f kubernetes/secrets/db-credentials.yaml
```

This command will create a secret named `db-credentials` in the cluster. The secret can then be used by other parts of your system, while keeping the sensitive data safe. For example, you might have noticed on teh database and backend deployment files this lines, that refernece the use of these secrets when spinning up the pods:

```yaml
envFrom:
  - secretRef:
      name: db-credentials # or connections, as these are the only two secrets we have
```

### Internal and external connections

🚧 TODO 🚧

## That's it!

Next steps you might want to take is to move this cluster to the cloud, for a better feel of a real world scenario.

Thank you for reading!

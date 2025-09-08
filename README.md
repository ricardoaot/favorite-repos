# My Favorite Github Repos

A small app to search repositories through the GitHub API, mark favorites, and add personal notes. Built with Next.js, Prisma, React Query, server-side caching, PostgreSQL, and Docker.

## How start the proyect with docker compose

1.  Navigate to the project root, inside prisma-nextjs-dockerized.

```
make up

or 

docker-compose up
```

> ### Install Make
> 
> Please install Make if you want to use execution shortcuts

```
brew install make
```

2\. when the project is up you can go to the brower and visit

```
http://localhost:3002/
```

---

## Video Demo

you can access to a demo in this link

```
https://www.loom.com/share/95022cbc373d4aa395363d4a5c190897?sid=5b29bcd2-486a-4a22-b361-dde8caa4b697
```

---

## GitHub API Usage

The GitHub API was used to get an initial overview of repositories. For deeper validation, the GitHub web interface was also consulted to cross-check details.

---

## Cache Strategy

This project use different approach of caching front end caching with ReactQuery and server side caching with Nextjs. For example

*   **GitHub:**  
    Server-side cache is implemented. If a result is not found, the cache is reset to ensure fresh data is fetched from GitHub.
*   **Favorites:**  
    Favorites are cached on the frontend.

> **Note:** I planned to implement a backend cache for favorites using Redis, which is stateful and supports serverless/multi-instance environments (unlike using a simple `Map<>`). This was not completed due to time constraints, but it is a recommended improvement.

---

## Design Approach

*   Separation of concerns with an infrastructure (DB) folder and features folders kept separate from the main Next.js app folder.
*   Decoupled frontend scaffolding: for example, each feature folder contains its own components, hooks, services, and types folders.
*   A vertical slicing approach was used, placing each new feature within its own dedicated folder.

---

## Testing

*   The setup with Vitest and Playwright was implemented for unit, component, and end-to-end testing. However, the creation of the test cases is still pending due to lack of time.

---

## Use of AI or other tools

*   AI was used to generate some snipeds of code like the conditioned logic of the favRepoToggle and assist with certain tasks due to time constraints. Also in the troubleshooting of prisma in the container deployment.
*   Using Next.js Docker Template with Docker Compose. For this project, I reused a previously dockerized Next.js project to save time.

---

## some challenges

*   First I retrieve isFavorite attribute using a Set but when I noticed the necesity of use notes i refactored the code to use Maps for a key/value approach.
*   Prisma client compatibility between host and container

---

## Next Steps

*   Implement Atomic design principles to improve modularity of components.
*   Deploy to Vercel (default) or, if AWS architecture is available, consider deploying to Amplify as an alternative.
*   Install Sentry for improved error tracking and monitoring.
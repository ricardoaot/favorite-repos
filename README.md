# How start the proyect with docker compose

Navigate to the project root, inside prisma-nextjs-dockerized.


```
make up

or 

docker-compose up
```


# If you want to enter to the container terminal use 

docker exec -it <container-name> sh


# Using Next.js Docker Template with Docker Compose

## Enable and Test Postgres

*   Make sure Docker Compose is running.
*   Check that the Postgres service is up and accessible (default port: 5432).
*   You can use a tool like `psql` or TablePlus to connect and verify the database.

## Install Make

```
brew install make
```

## Enable Prisma

*   Run `npx prisma generate` to generate the Prisma client.
*   Run `npx prisma migrate dev` to apply migrations and initialize the database.

---

## Use of AI

AI was used to generate some test cases and assist with certain tasks due to time constraints.

---

## GitHub API Usage

The GitHub API was used to get an initial overview of repositories. For deeper validation, the GitHub web interface was also consulted to cross-check details.

---

## Cache Strategy

*   **GitHub:**  
    Server-side cache is implemented. If a result is not found, the cache is reset to ensure fresh data is fetched from GitHub.
*   **Favorites:**  
    Favorites are cached on the frontend.

> **Note:** I planned to implement a backend cache for favorites using Redis, which is stateful and supports serverless/multi-instance environments (unlike using a simple `Map<>`). This was not completed due to time constraints, but it is a recommended improvement.

---

## Testing

Some test cases were generated with the help of AI to speed up development.

---

## Design Approach

*   Atomic design principles were followed.
*   Vertical slicing approach was used for new features.

---

## some challenges

First I retrieve isFavorite attribute using a Set but when I noticed the necesity of use notes i refactored the code to use Maps for a key/value approach

---

## Next Steps

*   Deploy to Vercel (default) or, if AWS architecture is available, consider deploying to Amplify as an alternative.
*   Install Sentry for improved error tracking and monitoring.
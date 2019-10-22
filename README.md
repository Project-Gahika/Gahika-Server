## TS-NEM-Boilerplate

### A Node, Express, Mongoose boilerplate written in Typescript

---

To install

```
git clone https://github.com/GabrielvonPlaten/TS-NEM-Boilerplate.git
mv TS-NEM-Boilerplate server
cd server
```

Before you start the server locally, you need to create a **.env** file on the root folder and add three variables for your jsonwebtoken secret and your mongoDB URIs.

- jwtSecret
- DB_URI_PROD
- DB_URI_DEV

## Install

```
npm / yarn install
```

## Run

```
npm / yarn dev
```

## Build

```
npm / yarn build
```

---

## Project Strutre

```
config
│     db.ts
│
middleware
│     auth.ts
models
│     User.ts
│
routes
│─────api
│     │   auth.ts
│     │   user.ts
│
│.app.ts
```

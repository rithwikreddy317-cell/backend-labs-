# Lab 1: Node.js and Express server

**Name:** k.rithwik reddy· **Registration number:** 252U1R9059 · **Section:** CSE GEN AI 2A 304

**Live link:** https://backend-labs-xy6t.onrender.com
## How to run

```bash
npm install
npm start            # Express server (server.js) on port 3000
npm run start:http   # plain http module server (server-http.js) on port 3000
```

Environment variables: none required. Optionally set `PORT` (defaults to 3000). Do not commit a `.env` file.

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/` | Welcome text |
| GET | `/about` | JSON with name and section |
| GET | `/time` | Current date and time from `new Date()` |
| GET | any other path | 404 message |

## Status codes logged in the browser

| Route | Status |
| --- | --- |
| `/` | 200 |
| `/about` | 200 |
| `/time` | 200 |
| `/unknown` | 404 |

## Screenshots

Add your screenshots to the `screenshots/` folder and uncomment the lines below.

<!--
![Route /](screenshots/root.png)
![Route /about](screenshots/about.png)
![Route /time](screenshots/time.png)
![404 for unknown path](screenshots/not-found.png)
-->

## package.json fields

- **name**: package name (lowercase, no spaces)
- **version**: current version of the project
- **description**: short summary of what the project does
- **main**: entry file used when the package is required
- **scripts**: named commands run with `npm run <name>` (`npm start` for `start`)
- **keywords**: search terms for the npm registry
- **author**: who wrote the package
- **license**: licence the code is shared under
- **dependencies**: packages needed at runtime (here, `express`)

## Viva answers

- **package.json vs node_modules**: `package.json` is the project manifest listing metadata, scripts and dependency versions. `node_modules` is the folder where `npm install` downloads those packages. It can be recreated from `package.json`, so it is not committed.
- **app.listen**: binds the app to a port and starts accepting HTTP connections; the callback runs once the server is ready.
- **request and response**: `req` represents the incoming HTTP request (path, method, headers, query). `res` is the object used to send the reply (status code, headers, body).

## Notes

Problems faced and how you solved them: (write your own notes here)

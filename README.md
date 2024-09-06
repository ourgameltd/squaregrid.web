# SquareGrid Web

This is the repo for the website part of the square grid app.

|Pipeline|Status|
|--------|------|
|Live|[![Release (Live)](https://github.com/ourgameltd/squaregrid.web/actions/workflows/release-live.yml/badge.svg)](https://github.com/ourgameltd/squaregrid.web/actions/workflows/release-live.yml)|
|PR|[![PR](https://github.com/ourgameltd/squaregrid.web/actions/workflows/pr.yml/badge.svg)](https://github.com/ourgameltd/squaregrid.web/actions/workflows/pr.yml)|
|CodeQL|[![CodeQL](https://github.com/ourgameltd/squaregrid.web/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/ourgameltd/squaregrid.web/actions/workflows/github-code-scanning/codeql)|

## Setup

* Install Node & Node version manager
* nvm install 18.17.0
* nvm use 18.17.0
* create .env.local file at root of solution (copy contents below)

## Env vars

```env
NEXT_PUBLIC_MEDIA_ENDPOINT=http://127.0.0.1:10000/devstoreaccount1/media
NEXT_PUBLIC_DOMAIN=http://localhost:4280
```

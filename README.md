# TodaysMazai

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/Le96/todays-mazai/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/Le96/todays-mazai/actions/workflows/ci.yaml)

Be the Monster Energy addict. Version 2.

## Requirements

- `pipenv`
- `Node.js`
  - `v16`

## Usage

### Initialize

```sh
git clone {THIS_REPOSITORY_URL}
cd {REPOSITORY_DIRECTORY}
./init.sh
pipenv install --dev  # if you want to develop
pipenv shell
```

```sh
cd web
npm install
npm install --include-dev  # if you want to develop
```

### Formatting and Linting

```sh
pipenv run fix
```

```sh
cd web
npm run lint
```

### Build for Web

```sh
cd web
npm run build
```

### Compose

```sh
docker compose up --build --detach  # build and start
docker compose logs --follow --timestamps  # log
docker compose down --remove-orphans --volumes  # stop
```

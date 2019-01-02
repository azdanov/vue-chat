# Vue Chat &middot; [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/vue-chat/blob/master/LICENSE)

Trying out Vue.js, Vuex and Firebase to build a basic chat app. [Live version](https://vue-fire-chat-708bf.firebaseapp.com/).

## Setup

1. Clone the project.
```sh
git clone https://github.com/azdanov/vue-chat.git
cd vue-chat
cp .env.example .env
```

2. For the project to work you will need to register a [Firebase](https://firebase.google.com/) account, and fill out the `.env` file. Note that Google and Github authentication methods need to be enabled manually inside the Firebase console.

3. NPM Scripts:
```sh
# Project setup
yarn install

# Compiles and hot-reloads for development
yarn run serve

# Compiles and minifies for production
yarn run build

# Run your tests
yarn run test

# Lints and fixes files
yarn run lint

# Run your unit tests
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

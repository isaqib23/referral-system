## Description

Developed a referral system, In which each user will have unique code which can be used as referral code. Also user should have maximum upline and downline till level 2

## Installation
* Clone the repo
* Copy `.env.example` to `.env`
* Configure `.env`
* Run `npm install`

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Environment Variable

```bash
JWT_SECRET="YOUR JWT SECRET"
MONGO_CONNECTION="YOUR MONGO CONNECTION"
MAX_REFERRAL_LEVEL=SET USER REFERRAL LEVEL
```
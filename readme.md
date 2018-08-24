# Auth Boilerplate: how to use

This is the building blocks for auth in an express app, like the foundation.

## what it includes

* Sequelize models and migrations for user model
* Setting for PostgreSQL
* Passport and Passport-local for authentication
* Express sessions to keep logged in from page to page
* Connect-flash for error/success messages
* Bcrypt for hashing passwords

### User Model

| column Name | SQL Type | Notes |
| ----------- | -------- | ----------------------- |
| id | Integer | serial primary key |
| createdAt | Date | automatically generated |
| updatedAt | Date | automatically generated |
| firstname | String | - |
| lastname | String | - |
| email | Sting | username field for login |
| password | Sting | hashed with bcrypt |
| bob | Date | - |
| admin | Boolean | Admin or regular user |

> Note: CHange these fields in both the model and migrations files BEFORE running sequelize db:migrate

### Default Routes Supplied

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------------- | -------------------------- |
| GET | / | index.js | Home page |
| GET | /profile | controllers/profile.js | Profile page (autherization required) |
| GET | /auth/login | controllers/auth.js | Login form page |
| POST | /auth/login | controllers/auth.js | Login submision; Redirect Profile |
| GET | /auth/signup | controllers/auth.js | Signup form page |
| POST | /auth/signup | controllers/auth.js | Signup submision; Redirect Profile|
| GET | /auth/logout | controllers/auth.js | logout; Redirect Home |
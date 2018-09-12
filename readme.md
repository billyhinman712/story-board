## what it includes

* Sequelize models and migrations for user model
* Setting for PostgreSQL
* Passport and Passport-local for authentication
* Express sessions to keep logged in from page to page
* Connect-flash for error/success messages
* Bcrypt for hashing passwords

### User Model

| column Name | SQL Type | Notes |
| -------------- | -------- | ----------------------- |
| id | Integer | serial primary key |
| createdAt | Date | automatically generated |
| updatedAt | Date | automatically generated |
| firstname | String | - |
| lastname | String | - |
| email | Sting | username field for login |
| password | Sting | hashed with bcrypt |
| dob | Date | - |
| facebookId| String | How to link FB with account|
| facebookToken | String | - |

###Routes 

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------------- | -------------------------- |
| GET | / | index.js | Home page |
| GET | /profile | controllers/profile.js | Profile page (autherization required) |
| GET | * | index.js | catch any other routes to error page|
| GET | /auth/login | controllers/auth.js | Login form page |
| POST | /auth/login | controllers/auth.js | Login submision; Redirect Profile |
| GET | /auth/signup | controllers/auth.js | Signup form page |
| POST | /auth/signup | controllers/auth.js | Signup submision; Redirect Profile|
| GET | /auth/logout | controllers/auth.js | logout; Redirect Home |
| GET | /facebook | controllers/auth.js | calls passport-facebook strategy |
| GET | /callback/facebook | controllers/auth.js | handles response from facebook |
| GET | /articles | controllers/articles.js | article list |
| GET | /articles/:id | controllers/articles.js | shows article |
| GET | /articles/:id/edit | controllers/articles.js | edit form page|
| GET | /articles/new | controllers/articles.js | create story form page |
| POST | /articles | controller/articles.js | post story |
| GET | /profile/articles | controllers/profile.js | views user's stories |

created app that allowes users to create a account to submit stories for others to view.
they are able to delete and edit their stories.

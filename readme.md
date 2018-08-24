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

## Steps to use

#### 1. Clone repo, but with a diffrent name!

```
git clone <repo_link> <new_name>
```

#### 2. Create a new database for your new project

```
createdb <new_db_name>
```

#### 3. Open `config.json` and change the following

* Change database name to what you created in step 2
* Check username/password for your local enviornment
* Make sure the flavor of SQL matches what you're using

> NOTE: If changing from postgreSQL, you will need diffrent node_modules

#### 4. Check models and migrations for your needs

For example, if you don't need the `Admin` column, you will want to delete it from both the migration and model for the user. Likewise, if you need to add somthing, add i both files.

#### 5. Run the migrations

```
sequelize db:migrate
```

#### 6. Add a `.env` file with a SESSION_SECRET key

This can be set to anything

#### 7. Install node modules from `package.json`

```
npm install
```

#### 8. Rn your server and make sure everything works

If you have nodemon installed globally:
```
nodemon
```

Otherwise:
```
node index.js
```

#### 9. Create new repository for the new project to live in!

* Create a new repository on your personal Github account.
* Delete the old remote to origin
* Add a new repo as a new remote location (can also be called origin since we deleted the original origin)
* PUSH!

```
git remote remove origin
git remote add origin <new_repo_link>
git add.
git commit -m " Beginnig of new project"
git push origin master
```

>NOTE: Do NOT make commits from the new project to your auth boilerplate! Keep it pristine!

## Next steps

Assuming that the setup steps went smoothly, now you can add new models and migrations for your new app, and start developing it as if you started it from scratch!

But we both know the truth!
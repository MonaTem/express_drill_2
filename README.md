# Auth 
## CRUD + Sessions

Tonight's assessment is to utilize CRUD and authentication. Our primary objective is to first utilize **authentication** and secondary goal is to utilize **authorization** on a resource.

## Stage 1 : Auth

### Models

Build an App with the a table for the following entity.

| user |
| :--- |
| `id` - PRIMARY KEY |
| `email` - varchar(255) |
| `password_digest` - char(60) |
| `created_at`- timestamp \w zone default now | 
| `updated_at`- timestamp \w zone default now |

You'll need to setup a project with knex and generate a migration for the above entity. You might also want to index the `email` column of your `users` table.

> Note: give your `email` a column an index. See the indexing lesson: [Index](https://learn.galvanize.com/cohorts/209/units/2495/content_files/1170)

### Server

Your server should have a few of the following routes:

| METHOD | PATH | DESCRIPTION |
| :--- | :--- | :--- |
| GET | `/` | shows a `home.ejs` page with a link to `/sign_up` or `/login` if not logged in. If logged in shows a link to `/logout`. |
| GET | `/sign_up` | Shows a form for signing up to the site. |
| POST | `/sign_up` or `/users` | Take in user email and password, digest password, then redirect to profile after creating a session. |
| GET | `/login` | shows a form that allows a user to POST both an `email` and `password` to `/users`. They should redirect `/profile if succcessfully logged in or returned to the `/login` if it fails. |
| POST | `/login` | verifies `email` and `password` and redirects to `/profile` if successful and `/login` if not. |
| GET |  `/profile` | A page that welcomes the user if logged in and redirects to `/login` otherwise. Should include a button to logout. |
| GET | `/logout` | Destroys the `req.session` for the user. |


Note for the above you should try to write clean code for your routes and organize your views.

* Make a `views/users` folder for your `profile.ejs`.
* Make a `views/sessions` folder for your `login.ejs` and `sign_up.ejs` files.
* Make a `views/site` folder for your `home.ejs`.

Add better checks to your sign up process by requiring users to also submit a `password_confirmation` and checking that it matches password before creating a new user.

## Stage 2 : CRUD - KNEX

Let's add crud for a Posts resource and later we'll associate it to a user and require login to create.

### Model

| Post |
| :--- |
| `id` serial primary key |
| `title` varchar(255) | 
| `content` text |
| `created_at` timestamp \w zone |
| `updated_at` timestamp \w zone |


### Routes

We will need to create a series of CRUD routes around this resource.

| METHOD | PATH | DESCRIPTION |
| :--- | :--- | :--- |
| GET | `/posts` | shows all post titles and when they were created with a link to `/posts/:id` for each post. |
| GET | `/posts/:id` | show the post title and content for a particular post. |
| GET | `/posts/new` | show the `post` form with an `input` for the `title` and `textarea` for the `content` |
| POST | `/posts` | create a new `post` with the provided `title` and `content` |
| GET | `/posts/:id/edit` | show the edit form for the provided `id` and fill in the forms values with the `post.title` and `post.content`. **Remember to use methodOverride** for this. |
| PATCH | `/posts/:id` | take the updated post's updated title and content fields and update the `post` in the db. |


Notes:

* You'll need to look up the post and template in it's values for the edit form.
* You'll need to install `methodOverride` and use in your form to override the post request.
  * Use the `action="/posts/:id?_method=PATCH"` and `method="POST"`
* Make a `views/posts` folder for your post related ejs files.
  
  
## Stage 3: CRUD Authorization

### Model Changes

Associate the `users` table to the `posts` table. Add a `user_id` column to that is not nullable to the `posts` table. **You should  drop the `posts` table before trying to run this migration.**

### Route Behavior Changes

| METHOD | PATH | AUTH RESTRICTIONS |
| :--- | :--- | :--- |
| GET | `/posts` | Allow anyone logged in or not to see this |
| GET | `/posts/:id` | Allow anyone logged in or otherwise to see this |
| GET | `/posts/new` | Only logged in users can do this. Redirect to `/posts` if not logged in. |
| POST | `/posts` | Use the `req.session.user_id` to populate the `post.user_id` for a new post. Only allow logged in users to post new posts. Send status `403` if not logged in. |
| GET | `/posts/:id/edit` | Only logged in user whose `req.session.user_id` matches the `post.user_id`. Redirect to `/posts/:id` if not user who owns the post. |
| PATCH | `/posts/:id` | Only logged in user whose `req.session.user_id` matches the `post.user_id`. Send status `403` if not the owning user. |


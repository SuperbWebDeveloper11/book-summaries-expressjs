## `book-summaries-expressjs with express js & google-oauth20`

book-summaries-expressjs with express js & google-oauth20 allow users to read and write book summaries

### `Here how users will use the app`

- users could login using their google accounts
- users can see previously created summaries
- users can create new summary
- users can edit summary
- users can delete summary
- user can logout

### `Dependencies`

- bootstrap
- connect-mongo
- dotenv
- express
- express-handlebars
- express-session
- method-override
- moment
- mongoose
- morgan
- passport
- passport-google-oauth20

### auth routes

- **success:** create user instance + redirect to dashboard
- **failure:** redirect to login

### summary routes

- **add summary:** use EnsureAuth middleware
- **edit summary:** use EnsureAuth middleware
- **delete summary:** use EnsureAuth middleware
- **list all public summaries:**
- **list specific user summaries:**
- **display summary detail:**

**Note:** The design need to be fixed

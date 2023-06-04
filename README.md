I developed this module in order to use it in my projects in the future.

_Advanced Auth Module_:

1. Local
2. JWT
3. GitHub

_Prisma ORM_

Commands:

1. Create migration:
   `npx prisma migrate dev --name`

---

.env structure:

```
# COMMON
API_URL=http://localhost:3000

# AUTH
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
JWT_SECRET=secret

# DATABASE
DATABASE_URL="mysql://root:password@localhost:3306/database"
```

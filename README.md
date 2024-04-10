## Medium-app
# Step1: # Initialize the backend
 - mkdir medium	
	 - cd medium
 - npm create hono@latest
	 - Target-directory: backend
	 - Environment: cloudflare-workers
	 - manager: npm

# Step2 : # Initialize handlers

To begin with, our backend will have

	1.  POST /api/v1/user/signup

	2.  POST /api/v1/user/signin

	3.  POST /api/v1/blog

	4.  PUT /api/v1/blog

	5.  GET /api/v1/blog/:id

	6.  GET /api/v1/blog/bulk


# Step3: # Initialize DB (prisma)
 1. Get your connection url from neon.db
 
 3.  Get connection pool URL from Prisma accelerate
				[https://www.prisma.io/data-platform/accelerate](https://www.prisma.io/data-platform/accelerate)
 3. Initialize prisma in your project 
				- npm i prisma
				- npx prisma init
 4.  Replace `DATABASE_URL` in `.env`with your neonDB connection string.
 5. Add `DATABASE_URL` as the `connection pool` url in `wrangler.toml` - We are doing this only because we are deploying it in cloudFlare
 6. Initialize the schema in `schema.prisma`
			- Create two models User and Posts
				
		

    model  User{
		id  Int  @id  @default(autoincrement())
		email  String  @unique
		name  String?
		password  String
		posts  Post[]
		}

    model  Post{
		id  Int  @id  @default(autoincrement())
		title  String
		content  String
		published  Boolean  @default(false)
		authorId  Int
		author  User  @relation(fields: [authorId],references: [id])
		}
		
7.  Migrate your database
		- npx prisma migrate dev --name created_User_and_Post
 
 8.  Generate the prisma client
		 - npx prisma generate --no-engine
	 -  `--no-engine flag` is set because we are doing serverless backend 
	
	
8. Add the accelerate extension
		- npm install @prisma/extension-accelerate

9.  Initialize the prisma client
				`import { PrismaClient } from '@prisma/client/edge'`
				`import { withAccelerate } from '@prisma/extension-accelerate'`-this is used because we are using the conection pool of prisma
		
		This is written in a route
		`const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate())` 
	- to get rid of c.env.DATABASE_URL typescript error, you need to add a generic

10. `npm i bcryptjs @types/bcryptjs` - this is used to hash passwords while storing in DB and you import it - `import {hash} from  'bcryptjs'`
11. `import { decode, sign, verify } from  'hono/jwt'`- for jwt auth
12. Create `/signin` and `/signup` routes in userRouter.ts
13. Writing middlewares syntax is little different in hono 
14. Now Start creating blog routes in blogRouter.ts
15. Test all the routes in Postman
16.  Now create a module named 'common' which has zod variables and zod types which are to be exported to both frontend and backend
-- we do this by publishing the module to npm 
		- `npm i login`
		- `npm publish --access public`

		--now import into your backend and frontend
		- `npm i @farooq_abdulla/medium-app-common`  

 
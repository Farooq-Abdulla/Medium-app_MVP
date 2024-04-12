import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createBlogInput,updateBlogInput } from "@farooq_abdulla/medium-app-common";
const router= new Hono<{Bindings:{DATABASE_URL: string, JWT_SECRET : string},Variables:{userId:number}}>();

router.use("/*", async(c,next)=>{
    const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate());
    const authToken=c.req.header('authorization');// this is how you get header in hono
    if(!authToken){
        c.status(403);
        return c.json({message: "Access denied / no authToken available"});
    }
    const token = authToken.split(' ')[1];
    
    try {
        const payload= await verify(token,c.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId
            }
        });
        if (!user) {
            c.status(403);
            return c.json({message: "User not found"});
        }
        c.set('userId', user.id);
        await next();
    } catch (e) {
        c.status(403);
        return c.json({message: "Error while signing in / User already exits"});
    }
})
router.get("/getUser", async (c) => {
    try {
        const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
        const user = await prisma.user.findUnique({
            where: {
                id: c.get('userId')
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });
        if (!user) {
            c.status(403);
            return c.json({ message: "User not found" });
        }
        return c.json(user);
    } catch (error) {
        console.log(error);
        c.status(500);
        return c.json({ message: "Internal server error" });
    }
});


router.post('/', async (c) => {
    try {
        const userId = c.get('userId');
        const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
        const body = await c.req.json(); // this is how you get body in HONO
        const { success } = createBlogInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ message: "Invalid input while creating blog" });
        }
        const postCreated = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId,
                published: true,
            },
            select: {
                id: true,
                title: true,
                content: true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });
        return c.json({ postCreated });
    } catch (error) {
        console.log("An error occurred:", error);
        c.status(500);
        return c.json({ message: "Internal server error while posting" });
    }
});


router.put("/", async (c) => {
    try {
        const userId = c.get('userId');
        const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
        const body = await c.req.json(); // this is how you get body in HONO
        const { success } = updateBlogInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ message: "Invalid input while updating blog" });
        }
        const postUpdated = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
                authorId: userId,
                published: true,
            },

        });
        return c.json({ id: postUpdated.id });
    } catch (error) {
        console.log("An error occurred:", error);
        c.status(500);
        return c.json({ message: "Internal server error while updating the post" });
    }
});

//Add pagination
router.get('/bulk', async (c) => {
    try {
        const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
        const posts = await prisma.post.findMany({
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true,
                    }
                }
            }
        });
        return c.json(posts);
    } catch (error) {
        console.log("An error occurred:", error);
        c.status(500);
        return c.json({ message: "Internal server error while getting all the Posts" });
    }
});

router.get('/:id', async (c) => {
    try {
        // const userId = c.get('userId');
        const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
        const paramId = Number(c.req.param('id'));
        const post = await prisma.post.findUnique({
            where: {
                id: paramId
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true,
                    }
                }
            }
        });
        if (!post) {
            c.status(404);
            return c.json({ message: "Post not found" });
        }
        
        return c.json(post);
    } catch (error) {
        console.log("An error occurred:", error); 
        c.status(500);
        return c.json({ message: "Internal server error while getting the Post" });
    }
});




export default router;

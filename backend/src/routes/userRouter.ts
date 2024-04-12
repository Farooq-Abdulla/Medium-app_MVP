import { Hono } from 'hono';
import {compareSync, hash} from 'bcryptjs';
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { signinInput,signupInput } from "@farooq_abdulla/medium-app-common";
const router= new Hono<{Bindings:{DATABASE_URL: string, JWT_SECRET : string}}>();

router.post("/signup", async(c)=>{
    const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate());
    const body=await c.req.json(); // this is how you get body in HONO 
    const {success}= signupInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({message:"Invalid input while signing up"});
    }
    const hashedPassword = await hash(body.password, 10);
    try {
        // const checkingUser= await prisma.user.findUnique({
        //     where:{ email:body.email }
        // })
        // if(checkingUser){
        //     c.status(400)
        //     return c.json({message: "User already exists"})
        // }
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
            }
        });
        const payload= {userId: user.id}
        const token= await sign(payload,c.env.JWT_SECRET);
        return c.json({token:token});
    } catch (e) {
        c.status(403);
        return c.json({message: "Error while signing up"});
    }
});

router.post("/signin", async(c)=>{
    const prisma = new PrismaClient({datasourceUrl: c.env.DATABASE_URL}).$extends(withAccelerate());
    const body=await c.req.json(); // this is how you get body in HONO 
    const {success}= signinInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({message:"Invalid input while signing in"});
    }
    try {
        
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            }
        });
        
        if (!user) {
            c.status(403);
            return c.json({message: "User not found"});
        }
        if( compareSync(body.password, user.password)){
            const payload= {userId: user.id}
            const token= await sign(payload,c.env.JWT_SECRET);
            return c.json({token:token});
        }else{
            c.status(403);
            return c.json({message: "Wrong password"});
        }
    } catch (e) {
        c.status(403);
        return c.json({message: "Error while signing in / User already exits"});
    }
});




export default router;

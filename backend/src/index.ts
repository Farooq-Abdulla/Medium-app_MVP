import { Hono } from 'hono'

const app = new Hono();
import { cors } from 'hono/cors';
app.use(cors());
import userRouter from "./routes/userRouter";
import blogRouter from "./routes/blogRouter";

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);

export default app

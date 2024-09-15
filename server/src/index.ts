import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
//@ts-ignore
import multer from 'multer';
import authRouter from './routes/Auth';
import productRouter from './routes/Product';
import adminRouter from './routes/AdminRouter';

const app = express()
const port = 3000;

//Middlewares
app.use(express.json());
app.use(cors());

// Routers (assuming your routers don't use MySQL either)
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/admin', adminRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is running!' });
});


// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
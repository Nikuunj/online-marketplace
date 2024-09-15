import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserManager } from '../manager/UserManger'; // Correct path to UserManager

const authRouter = express.Router();
const userManager = new UserManager();

// Signup endpoint
authRouter.post('/signup', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Add the user to the UserManager
        const success = await userManager.addUser(email, hashedPassword, name);

        if (!success) {
            return res.status(400).json({ message: 'User already exists' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login endpoint
authRouter.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Verify user credentials
        const userExists = await userManager.readUser(email, password);

        if (!userExists) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

export default authRouter;

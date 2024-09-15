import bcrypt from 'bcrypt';

let TOTAL_USER = 0;

interface User {
    name: string,
    email: string,
    hashedPassword: string
}

export class UserManager {
    private users: User[];

    constructor() {
        this.users = [];
    }

    // Add user with hashed password
    async addUser(email: string, password: string, name: string): Promise<boolean> {
        try {
            // Check if the user already exists
            const userIndex = this.users.findIndex(user => user.email === email);
            // If user exists, return without adding
            if (userIndex !== -1) {
                console.log('User already exists');
                return false;
            }
            // Add new user
            this.users.push({
                name,
                email,
                hashedPassword: password // Store hashed password
            });

            TOTAL_USER++;

            return true;
        } catch (error) {
            console.error('Error adding user:', error);
            return false;
        }
    }

    // Verify user credentials
    async readUser(email: string, password: string): Promise<boolean> {
        try {
            // Find the user
            const user = this.users.find(user => user.email === email);

            // If user does not exist, return false
            if (!user) {
                console.log('User not found');
                return false;
            }

            // Compare the entered password with the hashed password
            const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword);

            return isPasswordMatch;
        } catch (error) {
            console.error('Error verifying user:', error);
            return false;
        }
    }
}

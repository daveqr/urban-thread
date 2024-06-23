import express, {Request, Response} from 'express';

const app = express();
const PORT = 4000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route handler for '/test'
app.get('/test', async (req: Request, res: Response) => {
    try {
        // Simulate an async operation (e.g., database call)
        await simulateAsyncOperation();

        // Return a JSON response
        res.json({message: 'Registration successful'});
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        res.status(500).json({error: 'Failed to process request'});
    }
});

function simulateAsyncOperation() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Operation completed successfully');
        }, 1000);
    });
}


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

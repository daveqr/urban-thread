import express, { json } from 'express';
import connectToDatabase from './db.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

// Routes
app.get('/todos', async (req, res) => {
  const db = await connectToDatabase();
  const todos = await db.collection('todos').find({}).toArray();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const newTodo = req.body;
  const db = await connectToDatabase();
  await db.collection('todos').insertOne(newTodo);
  res.status(201).json(newTodo);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



const todos = [
  { id: 1, text: 'Learn Node.js' },
  { id: 2, text: 'Build REST API' }
];

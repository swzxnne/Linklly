# JsonDB: A Beginner-Friendly Mock Database


Welcome! If you are learning how to build backends (servers) and want to practice database operations without the headache of setting up a complex system like MongoDB or PostgreSQL, you're in the right place!


`JsonDB` is a tiny, super-simple tool that saves your data to a regular `.json` file (`db.json`) on your computer. It perfectly mimics a real database so you can focus entirely on learning how to write your Express server routes (`GET`, `POST`, `PUT`, `DELETE`).


## 🧠 Core Concepts


To make this easy, think of `JsonDB` like an Excel Spreadsheet:
1. **The Database (`JsonDB`)**: This is the whole Excel file.
2. **Collections (`collection`)**: These are the individual sheets at the bottom (e.g., one sheet for "Users", another for "Products").
3. **Records**: These are the individual rows inside a sheet (e.g., "Alice's account").


## 🚀 How to use it in your project


It is just a single file! To use it in any project, grab the `JsonDB.ts` file, place it in your folder, and follow these steps.


### Step 1: Tell it what your data looks like


In TypeScript, we use `interfaces` to describe the shape of the data we want to save. **Rule:** Every piece of data needs an `id` so we can find it later!


```typescript
// Let's say we are building an online store.
// Here is what a product looks like:
export interface Product {
   id: number; // Every item MUST have an 'id' (number or string)
   name: string;
   price: number;
}
```


### Step 2: Turn on the Database
Create an instance of `JsonDB`. This automatically creates a file called `db.json` in your folder if it doesn't exist yet.


```typescript
import { JsonDB } from './JsonDB';


// 1. Start the database
const db = new JsonDB();


// 2. Open up the "products" collection (the "Products" Excel sheet)
const productsDB = db.collection<Product>('products');
```


---


## 🛠️ The 5 Basic Database Commands (CRUD)


Almost every app in the world uses 5 basic commands to handle data. Here is exactly how to do them with `JsonDB`:


### 1. Create Data (`.insert()`)
Want to add a new product? Pass an object into `.insert()`.


```typescript
productsDB.insert({
   id: 1,
   name: "Cool T-Shirt",
   price: 19.99
});


productsDB.insert({
   id: 2,
   name: "Sneakers",
   price: 59.99
});
```


### 2. Read ALL Data (`.getAll()`)
Want a list of everything in your "products" sheet?


```typescript
const allMyProducts = productsDB.getAll();
console.log(allMyProducts);
// Output will be an array of the T-Shirt and the Sneakers!
```


### 3. Read ONE specific Item (`.getById()`)
Need to find a specific item? Just give it the `id`.


```typescript
const shirt = productsDB.getById(1); // Finds the T-Shirt
console.log(shirt.name); // "Cool T-Shirt"
```


### 4. Update Data (`.update()`)
Did the price drop? Give it the `id` of the item, and only the fields you want to change!


```typescript
// Update item with id '2' to have a new price
productsDB.update(2, { price: 49.99 });
```


### 5. Delete Data (`.delete()`)
Out of stock permanently? Delete it by giving it the `id`.


```typescript
productsDB.delete(1); // Deletes the T-Shirt. Bye bye!
```


---


## 💻 Putting it all together with Express


Here is what it looks like when you connect `JsonDB` inside a real Express server route.


```typescript
import express, { Request, Response } from 'express';
import { JsonDB } from './JsonDB';


const app = express();
app.use(express.json()); // Allows Express to read incoming JSON data!


// 1. Setup the Database Connection
interface User {
   id: string;
   username: string;
}
const db = new JsonDB();
const usersDB = db.collection<User>('users');


// 2. Create the routes!


// GET: Send all users back to the client
app.get('/users', (req: Request, res: Response) => {
   const data = usersDB.getAll();
   res.json(data);
});


// POST: Add a brand new user
app.post('/users', (req: Request, res: Response) => {
   const newUser: User = {
       id: String(Date.now()), // Let's auto-generate a random ID using the time
       username: req.body.username
   };
  
   usersDB.insert(newUser);     // Save it to the JSON file
   res.status(201).json(newUser); // Send the new user back as a success response
});


// Start the server
app.listen(3000, () => {
   console.log('Server is running on http://localhost:3000');
});
```


Enjoy practicing! As soon as you feel comfortable building routes like the ones above, you'll be completely ready to replace `JsonDB` with a massive real database!

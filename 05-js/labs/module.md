# Node.js Module Management Lab

## Objectives
Create a Node.js project using ES6 modules, manage dependencies, and understand package.json structure.

---

## Part 1: Project Setup 

### Task 1.1: Initialize Project
```bash
mkdir my-node-app
cd my-node-app
npm init -y
```

### Task 1.2: Configure ES6 Modules
Edit `package.json` to add:
```json
{
  "type": "module",
  "scripts": {
    "start": "node src/app.js"
  }
}
```

### Task 1.3: Create Folder Structure
```
my-node-app/
├── src/
│   ├── utils.js
│   └── app.js
└── package.json
```

---

## Part 2: Install Dependencies

### Understanding the Libraries

**Lodash** is a popular JavaScript utility library that provides helpful functions for working with arrays, objects, strings, and other data types. It offers consistent, modular, and performant methods that make common programming tasks easier. Examples include array manipulation (`shuffle`, `sum`), object utilities, and functional programming helpers.

**Chalk** is a terminal styling library that allows you to add colors and styles to console output. It makes CLI applications more visually appealing and helps distinguish different types of messages (errors in red, success in green, etc.). 

**Note:** For production deployments, chalk should only be used as a production dependency if terminal styling is required in the production environment.

### Task 2.1: Install Packages
```bash
# Production dependency
npm install lodash

# Development dependency
npm install --save-dev chalk
```

### Why Different Dependency Types?

**Production Dependencies** (`dependencies`) are required for your application to run in production. Lodash is installed as a production dependency because our application logic uses it for data manipulation.

**Development Dependencies** (`devDependencies`) are only needed during development, testing, or building. Chalk is installed as a dev dependency because it's only used for console styling during development - it's not needed when the app runs in production.

### Task 2.2: Check package.json
Verify that `dependencies` and `devDependencies` sections were added.

---

## Part 3: Create Modules

### Task 3.1: Create Utility Module
Create `src/utils.js`:
```javascript
// Create and export utility functions using ES6 export

export function add(a, b) {
    // Your code here
}

export function multiply(a, b) {
    // Your code here
}

export const PI = 3.14159;

// Default export
export default function greet(name) {
    // Your code here - return greeting message
}
```

### Task 3.2: Create Main Application
Create `src/app.js`:
```javascript
// Import your utilities (both named and default imports)
import greet, { add, multiply, PI } from './utils.js';

// Import external dependencies
import _ from 'lodash';

// Test your functions
console.log('Addition:', add(5, 3));
console.log('Multiplication:', multiply(4, 7));
console.log('PI value:', PI);
console.log(greet('Node.js'));

// Use lodash
const numbers = [1, 2, 3, 4, 5];
console.log('Lodash shuffle:', _.shuffle(numbers));
console.log('Lodash sum:', _.sum(numbers));
```

---

## Part 4: Run and Verify 

### Task 4.1: Run Application
```bash
npm start
```

### Task 4.2: Check Dependencies
- Examine `node_modules` folder
- Look at `package-lock.json`
- Try deleting `node_modules` and running `npm install`

---

## Challenge Tasks (Optional)

```
### Challenge: Use Development Dependency
Import and use `chalk` in your app.js:
```javascript
import chalk from 'chalk';

// Use chalk.green() for success messages at the end of app.js
console.log(chalk.green('Application started successfully!'));
```

---

**Expected Output:**
```
Addition: 8
Multiplication: 28
PI value: 3.14159
Hello, Node.js!
Lodash shuffle: [3, 1, 5, 2, 4]
Lodash sum: 15
```

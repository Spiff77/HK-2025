# Asynchronous JavaScript Lab

## Objectives
Learn callbacks, promises, and async/await through practical exercises.

---

    ## Setup

Create project:
```bash
mkdir async-lab && cd async-lab
npm init -y
```

Add to `package.json`:
```json
{
  "type": "module"
}
```

---

## Part 1: Callbacks

Create `callbacks.js`:
```javascript
// Simulate API call with setTimeout
function fetchUser(id, callback) {
    setTimeout(() => {
        const user = { id, name: `User ${id}` };
        callback(user);
    }, 1000);
}

// Usage
console.log('Fetching user...');
fetchUser(123, (user) => {
    console.log('Got user:', user.name);
});

// Callback Hell Example
fetchUser(1, (user) => {
    fetchUser(2, (user2) => {
        fetchUser(3, (user3) => {
            // This nesting gets messy!
            console.log('All users loaded');
        });
    });
});
```

---

## Part 2: Promises 

Create `promises.js`:
```javascript
// Convert to Promise
function fetchUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: `User ${id}` });
        }, 1000);
    });
}

// Promise Chain - Sequential execution
fetchUser(123)
    .then(user => {
        console.log('Got user:', user.name);
        return fetchUser(456); // Return next promise
    })
    .then(user2 => {
        console.log('Got user2:', user2.name);
        return fetchUser(789); // Chain another
    })
    .then(user3 => {
        console.log('Got user3:', user3.name);
    });

// Alternative: Promise.all for parallel operations
// const userPromises = [fetchUser(1), fetchUser(2), fetchUser(3)];
// Promise.all(userPromises).then(users => console.log('All users:', users.length));
```

---

## Part 3: Async/Await 

Create `async-await.js`:
```javascript
// Same function as before
function fetchUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: `User ${id}` });
        }, 1000);
    });
}

// Clean async/await syntax
async function getUsers() {
    try {
        // Sequential
        const user1 = await fetchUser(111);
        const user2 = await fetchUser(222);
        console.log('Sequential:', user1.name, user2.name);
        
        // Parallel
        const [userA, userB] = await Promise.all([
            fetchUser(333),
            fetchUser(444)
        ]);
        console.log('Parallel:', userA.name, userB.name);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call async function
getUsers();
```

---

## Run and Test

You can execute the files in two ways:

**Manually with node command:**
```bash
node callbacks.js
node promises.js  
node async-await.js
```

**Or add scripts to package.json:**
```json
{
  "scripts": {
    "callbacks": "node callbacks.js",
    "promises": "node promises.js",
    "async": "node async-await.js"
  }
}
```

Then run with:
```bash
npm run callbacks
npm run promises
npm run async
```

---

## Part 4: Real API with Fetch

Create `fetch-users.js`:

```javascript
// Using fetch with JSONPlaceholder API
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        console.log('Fetched users:', users.map(u => u.name));
        
        return users;
    } catch (error) {
        console.error('Failed to fetch users:', error.message);
    }
}

// Get specific user by ID
async function fetchUserById(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const user = await response.json();
        
        console.log('User details:', user.name, user.email);
        return user;
    } catch (error) {
        console.error('Error fetching user:', error.message);
    }
}

// Usage
fetchUsers();
fetchUserById(1);

```

Run with:

```bash
node fetch-users.js
```

---

## Key Takeaways

- **Callbacks**: Simple but lead to "callback hell"
- **Promises**: Better chaining with `.then()`
- **Async/Await**: Most readable, handles errors with try/catch
- **Parallel vs Sequential**: Use `Promise.all()` for parallel operations
- **Fetch API**: Modern way to make HTTP requests with built-in promise support

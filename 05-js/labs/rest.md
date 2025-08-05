# RESTful Web Services Lab

## Objectives
Learn REST principles by creating and testing a JSON API server using json-server and API testing tools.

---

## Part 1: Project Setup (10 minutes)

### Task 1.1: Create Project
```bash
mkdir rest-api-lab
cd rest-api-lab
npm init -y
```

### Task 1.2: Install json-server
```bash
npm install json-server
```

### Task 1.3: db.json Structure
Create db.json in your project with the following content
```json
{
  "books": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "year": 1925,
      "pages": 180,
      "genre": "Fiction"
    },
    {
      "id": 2,
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "year": 1960,
      "pages": 376,
      "genre": "Fiction"
    },
    {
      "id": 3,
      "title": "Pride and Prejudice",
      "author": "Jane Austen",
      "year": 1813,
      "pages": 432,
      "genre": "Romance"
    }
  ]
}
```
---

## Part 2: Start JSON Server

### Task 2.1: Add npm Script
Edit `package.json`:
```json
{
  "scripts": {
    "server": "json-server --watch db.json --port 3000"
  }
}
```

### Task 2.2: Start Server
```bash
npm run server
```

**Expected Output:**
```
JSON Server is running on http://localhost:3000
Resources: http://localhost:3000/books
```

---

## Part 3: Install API Testing Tool (5 minutes)

Choose **ONE** of these options:

### Option A: Bruno (Recommended)
1. Download Bruno from [usebruno.com](https://www.usebruno.com/)
2. Install and open Bruno
3. Create new collection called "Books API"

### Option B: Postman
1. Download Postman from [postman.com](https://www.postman.com/)
2. Create account and sign in
3. Create new collection called "Books API"

---

## Part 4: Test REST Endpoints (20 minutes)

### Task 4.1: GET All Books
**Method:** `GET`  
**URL:** `http://localhost:3000/books`

**Expected Response:**
```json
[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "year": 1925,
    "pages": 180,
    "genre": "Fiction"
  },
  // ... more books
]
```

### Task 4.2: GET One Book
**Method:** `GET`  
**URL:** `http://localhost:3000/books/1`

**Expected Response:**
```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "year": 1925,
  "pages": 180,
  "genre": "Fiction"
}
```

### Task 4.3: POST - Create New Book
**Method:** `POST`  
**URL:** `http://localhost:3000/books`  
**Headers:** `Content-Type: application/json`

**Body (JSON):**
```json
{
  "title": "Dune",
  "author": "Frank Herbert",
  "year": 1965,
  "pages": 688,
  "genre": "Science Fiction"
}
```

**Expected Response:** `201 Created` with new book including auto-generated `id`

### Task 4.4: PUT - Update Entire Book
**Method:** `PUT`  
**URL:** `http://localhost:3000/books/1`  
**Headers:** `Content-Type: application/json`

**Body (JSON):**
```json
{
  "title": "The Great Gatsby - Updated",
  "author": "F. Scott Fitzgerald",
  "year": 1925,
  "pages": 180,
  "genre": "Classic Fiction"
}
```

### Task 4.5: PATCH - Partial Update
**Method:** `PATCH`  
**URL:** `http://localhost:3000/books/2`  
**Headers:** `Content-Type: application/json`

**Body (JSON):**
```json
{
  "pages": 400
}
```

### Task 4.6: DELETE - Remove Book
**Method:** `DELETE`  
**URL:** `http://localhost:3000/books/3`

**Expected Response:** `200 OK` with empty body

---

## Part 5: Advanced Queries (10 minutes)

### Task 5.1: Filter Books
Test these query parameters:

```
GET /books?author=Jane Austen
GET /books?year=1925
GET /books?genre=Fiction
```

### Task 5.2: Search and Sort
```
GET /books?q=great           (search)
GET /books?_sort=year        (sort by year)
GET /books?_sort=year&_order=desc
```

### Task 5.3: Pagination
```
GET /books?_page=1&_limit=2
```

---

## Part 6: Verify CRUD Operations (5 minutes)

### Task 6.1: Complete CRUD Test
1. **CREATE:** Add a new book using POST
2. **READ:** Get all books, then get your new book by ID
3. **UPDATE:** Modify your book using PUT
4. **DELETE:** Remove your book using DELETE
5. **VERIFY:** Confirm the book is gone with GET

### Task 6.2: Check db.json
Open `db.json` file and verify your changes are persisted.

---

## REST Principles Review

| HTTP Method | Purpose | Example |
|-------------|---------|---------|
| GET | Retrieve data | `GET /books` |
| POST | Create new resource | `POST /books` |
| PUT | Update entire resource | `PUT /books/1` |
| PATCH | Partial update | `PATCH /books/1` |
| DELETE | Remove resource | `DELETE /books/1` |


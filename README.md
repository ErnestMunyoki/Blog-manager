# 📝 Blog Post Manager

This is a simple blog post manager built using **HTML**, **CSS**, and **JavaScript**, with a mock backend powered by `json-server`.

Users can:
- View all blog posts
- See details of a selected post
- Add a new post
- Edit an existing post
- Delete a post

---

├── index.html          # Main HTML file
├── css/
│   └── style.css       # Styling
├── src/
│   └── index.js        # JavaScript logic
├── db.json             # Mock backend database
└── README.md           # Project documentation

📡 API Endpoints

GET /posts — Fetch all posts

GET /posts/:id — Fetch a specific post

POST /posts — Create a new post

PATCH /posts/:id — Edit a post

DELETE /posts/:id — Delete a post

🧠 Features

Dynamic rendering of post list and details

Form-based post creation and editing

Delete functionality with immediate UI update

Clean modular JavaScript structure

📌 Notes

Changes are not persisted after page refresh unless saved to db.json through the mock server.

Editing uses PATCH and appends a form inside the detail view.

✅ Requirements Met

DOM Manipulation

Event Handling

Communication with the Server

One Advanced Deliverable Completed: Post editing via form

👤 Author

Ernest Munyoki

// Holds the currently selected post object
let currentPost = null;

// Fetch and display all posts in the post list
function displayPosts() {
  fetch('http://localhost:3000/posts')
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById('post-list');
      postList.innerHTML = '';

      posts.forEach((post, index) => {
        const div = document.createElement('div');
        div.textContent = post.title;
        div.dataset.id = post.id;
        div.addEventListener('click', () => handlePostClick(post));
        postList.appendChild(div);

        // Automatically show the first post
        if (index === 0) handlePostClick(post);
      });
    });
}

// Display selected post details
function handlePostClick(post) {
  currentPost = post;
  const postDetail = document.getElementById('post-detail');
  postDetail.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.content}</p>
    <p><strong>Author:</strong> ${post.author}</p>
    <button id="edit-post">Edit</button>
    <button id="delete-post">Delete</button>
  `;

  // Attach event listeners for Edit and Delete
  document.getElementById('edit-post').addEventListener('click', showEditForm);
  document.getElementById('delete-post').addEventListener('click', deletePost);
}

// Delete the currently selected post
function deletePost() {
  fetch(`http://localhost:3000/posts/${currentPost.id}`, {
    method: 'DELETE'
  })
  .then(() => {
    const postList = document.getElementById('post-list');
    const postDetail = document.getElementById('post-detail');
    const posts = postList.querySelectorAll('div');

    // Remove post from the list
    posts.forEach(div => {
      if (div.dataset.id == currentPost.id) div.remove();
    });

    // Clear post details
    postDetail.innerHTML = '<p>Select a post to view details.</p>';
  });
}

// Listen for new post submissions and add them
function addNewPostListener() {
  const form = document.getElementById('new-post-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get values from form fields
    const title = form.title.value;
    const content = form.content.value;
    const author = form.author.value;

    const newPost = { title, content, author };

    // Send POST request to server
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
    .then(res => res.json())
    .then(createdPost => {
      // Add new post to list
      const div = document.createElement('div');
      div.textContent = createdPost.title;
      div.dataset.id = createdPost.id;
      div.addEventListener('click', () => handlePostClick(createdPost));
      document.getElementById('post-list').appendChild(div);

      // Show new post in detail view
      handlePostClick(createdPost);

      // Clear the form
      form.reset();
    });
  });
}

// Display the edit form and update post
function showEditForm() {
  const postDetail = document.getElementById('post-detail');
  const editForm = document.createElement('form');

  // Create form with current values
  editForm.innerHTML = `
    <h4>Edit Post</h4>
    <input type="text" id="edit-title" value="${currentPost.title}" required>
    <textarea id="edit-content" rows="5" required>${currentPost.content}</textarea>
    <button type="submit">Update</button>
  `;

  postDetail.appendChild(editForm);

  // Handle form submission
  editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get updated values
    const updatedTitle = document.getElementById('edit-title').value;
    const updatedContent = document.getElementById('edit-content').value;

    // Send PATCH request to update post
    fetch(`http://localhost:3000/posts/${currentPost.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: updatedTitle,
        content: updatedContent
      })
    })
    .then(res => res.json())
    .then(updatedPost => {
      // Refresh post view and list
      handlePostClick(updatedPost);
      displayPosts();
    });
  });
}

// Initialize app when DOM is fully loaded
function main() {
  displayPosts();
  addNewPostListener();
}

document.addEventListener('DOMContentLoaded', main);

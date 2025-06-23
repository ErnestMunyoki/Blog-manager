let currentPost = null;

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

        if (index === 0) handlePostClick(post);
      });
    });
}

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
  document.getElementById('edit-post').addEventListener('click', showEditForm);
  document.getElementById('delete-post').addEventListener('click', deletePost);
}

function deletePost() {
  fetch(`http://localhost:3000/posts/${currentPost.id}`, {
    method: 'DELETE'
  })
  .then(() => {
    const postList = document.getElementById('post-list');
    const postDetail = document.getElementById('post-detail');
    const posts = postList.querySelectorAll('div');
    posts.forEach(div => {
      if (div.dataset.id == currentPost.id) div.remove();
    });
    postDetail.innerHTML = '<p>Select a post to view details.</p>';
  });
}

function addNewPostListener() {
  const form = document.getElementById('new-post-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = form.title.value;
    const content = form.content.value;
    const author = form.author.value;

    const newPost = { title, content, author };

    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
    .then(res => res.json())
  .then(createdPost => {
  const div = document.createElement('div');
  div.textContent = createdPost.title;
  div.dataset.id = createdPost.id;
  div.addEventListener('click', () => handlePostClick(createdPost));
  document.getElementById('post-list').appendChild(div);

  handlePostClick(createdPost); 
  form.reset();
});

  });
}

function showEditForm() {
  const postDetail = document.getElementById('post-detail');
  const editForm = document.createElement('form');
  editForm.innerHTML = `
    <h4>Edit Post</h4>
    <input type="text" id="edit-title" value="${currentPost.title}" required>
    <textarea id="edit-content" rows="5" required>${currentPost.content}</textarea>
    <button type="submit">Update</button>
  `;

  postDetail.appendChild(editForm);

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedTitle = document.getElementById('edit-title').value;
    const updatedContent = document.getElementById('edit-content').value;

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
      handlePostClick(updatedPost);
      displayPosts();
    });
  });
}

function main() {
  displayPosts();
  addNewPostListener();
}

document.addEventListener('DOMContentLoaded', main);
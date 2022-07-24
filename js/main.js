const elUserList = document.querySelector('.user-list');
const elPostList = document.querySelector(".post-list");
const elCommentList = document.querySelector('.comment-list'); 
const userListTemplate = document.querySelector('.user-list__template').content;
const postListTemplate = document.querySelector('.post-list__template').content;
const commentListTemplate = document.querySelector('.comment-list__template').content;
const elLoader = document.querySelector('.loader');
const elBox = document.querySelector('.box');

setTimeout(() => {
	elLoader.classList.add('dn');
	elBox.classList.add('db');
}, 1000);

const renderUserList = (array, node) => {
	node.innerHTML = '';

	array.forEach((el) => {
		const tragmet = userListTemplate.cloneNode(true);
		tragmet.querySelector('.user__name').textContent = el.name;
		tragmet.querySelector('.user__username').textContent = el.username;
		tragmet.querySelector('.user__id').textContent = el.id;
		tragmet.querySelector('.user__email').textContent = el.email;
		tragmet.querySelector('.user__email').href = `mailto:${el.email}`;
		tragmet.querySelector('.user__street').textContent = el.address.street;
		tragmet.querySelector('.user__suite').textContent = el.address.suite;
		tragmet.querySelector('.user__city').textContent = el.address.city;
		tragmet.querySelector('.user__zipcode').textContent = el.address.zipcode;
		tragmet.querySelector(
			'.user__location',
		).href = `https://google.com/maps/place/${el.address.geo.lat},${el.address.geo.lng}`;
		tragmet.querySelector('.user__phone').textContent = el.phone;
		tragmet.querySelector('.user__phone').href = `tel:${el.phone}`;
		tragmet.querySelector('.user__website').textContent = el.website;
		tragmet.querySelector('.user__website').href = `https://${el.website}`;
		tragmet.querySelector('.company__name').textContent = el.company.name;
		tragmet.querySelector('.company__catchPhrase').textContent =
			el.company.catchPhrase;
		tragmet.querySelector('.company__bs').textContent = el.company.bs;

		node.appendChild(tragmet);
	});
};

const renderPosts = (array, node) => {
  node.innerHTML = "";

  array.forEach(el => {
    const post = postListTemplate.cloneNode(true);
    post.querySelector(".post__id").textContent = el.id
    post.querySelector(".post__header").textContent = el.title
    post.querySelector(".post__body").textContent = el.body

    node.appendChild(post);
  });
};

const renderComments = (array , node) => {
  node.innerHTML = "";

  array.forEach(el => {
    const comment = commentListTemplate.cloneNode(true);
    comment.querySelector(".comment__id").textContent = el.id
    comment.querySelector(".comment__name").textContent = el.name
    comment.querySelector(".comment__body").textContent = el.body
    comment.querySelector('.comment__email').textContent = el.email;
    comment.querySelector('.comment__email').href = `mailto:${el.email}`;
    node.appendChild(comment);
  });
}

fetch('https://jsonplaceholder.typicode.com/users')
	.then((res) => res.json())
	.then((data) => renderUserList(data, elUserList))
	.catch((error) => console.log(error));


elUserList.addEventListener('click', (evt) => {
	if (evt.target.matches('.user')) {
		const id = evt.target.querySelector('.user__id').textContent;
		console.log(id);
		fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
			.then((res) => res.json())
			.then((data) => renderPosts(data , elPostList))
			.catch((error) => console.log(error));
	}
});

elPostList.addEventListener("click" , (evt) => {
  if(evt.target.matches(".post")) {
    const id = evt.target.querySelector('.post__id').textContent;
		console.log(id);
		fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
			.then((res) => res.json())
			.then((data) => renderComments(data , elCommentList))
			.catch((error) => console.log(error));
  }
})

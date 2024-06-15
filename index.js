/** @type {HTMLElement} */


const auth = new OAuth2PopupFlow.OAuth2PopupFlow({
authorizationUri: 'https://oauth-zl4v.onrender.com/auth',
  clientId: 'fbclient',
  redirectUri: 'https://flexdrinks.github.io/flexbricks/redirect.html',
  //redirectUri: 'http://localhost:8000/redirect.html',
  scope: 'openid profile',
  responseType: 'id_token',
  accessTokenResponseKey: 'id_token',
  additionalAuthorizationParameters: {
    nonce: Math.random().toString(),
  }
});

async function getBlogPosts() {
  var token = await auth.token();
  //https://api-4gg9.onrender.com/
  const response = await fetch('https://api-4gg9.onrender.com/blogs', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
}

async function openAlbumInNewTabWithHeaders(){
  // get link from input "link"
  link = document.getElementById('link').value;

  var token = await auth.token();
  //https://api-4gg9.onrender.com/
  const response = await fetch('https://api-4gg9.onrender.com/embed-google-photos-album', {
    method: 'POST',
    body: JSON.stringify({link: link}),
    headers: {
        "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
  });
  //get blob and open in new tab
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank').focus();

}

async function main() {
  if (auth.loggedIn()) {

    const content = document.getElementById('content');
    content.innerHTML = initial_content;
    const logoutButton = document.getElementById('logout');

    const payload = await auth.tokenPayload();
    console.log('payload', await auth.token());

    logoutButton.addEventListener('click', () => {
      auth.logout();
      main();
    });

    const posts = await getBlogPosts();
    const postsList = document.getElementById('blog-posts');
    // for post in posts[blogPosts]

    for (const post of posts.blogPosts) {
      //li a  
      const postElement = document.createElement('li');
      const postLink = document.createElement('a');
      postLink.innerText = post[0];
      postLink.href = "blog.html?postid="+post[1];

      postElement.appendChild(postLink);
      postsList.appendChild(postElement);
    }

  } else {
    content.innerHTML = '';
    const loginButton = document.createElement('button');
    loginButton.innerText = 'Зайтить';
    loginButton.addEventListener('click', async () => {
      await auth.tryLoginPopup();
      main();
    });
    content.appendChild(loginButton);
  }
}


var initial_content = null;
document.addEventListener('DOMContentLoaded', function() {
initial_content = document.getElementById('content').innerHTML;
main(null);
}, false);



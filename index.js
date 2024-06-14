/** @type {HTMLElement} */

const auth = new OAuth2PopupFlow.OAuth2PopupFlow({
authorizationUri: 'https://oauth-zl4v.onrender.com/auth',
  clientId: 'fbclient',
  redirectUri: 'http://localhost:8000/redirect.html',
  scope: 'openid profile',
  responseType: 'id_token',
  accessTokenResponseKey: 'id_token',
  additionalAuthorizationParameters: {
    nonce: Math.random().toString(),
  }
});


async function main(new_content = null) {
  let content = document.getElementById('content');
  let old_content = content.innerHTML;
  if (auth.loggedIn()) {
    if (new_content !== null) 
      content.innerHTML = new_content;

    const payload = await auth.tokenPayload();
    const logoutButton = document.getElementById('logout');
    console.log('payload', await auth.token());
    logoutButton.addEventListener('click', () => {
      auth.logout();
      main(old_content);
    });
  } else {
    content.innerHTML = '';
    const loginButton = document.createElement('button');
    loginButton.innerText = 'Зайтить';
    loginButton.addEventListener('click', async () => {
      await auth.tryLoginPopup();
      main(old_content);
    });
    content.appendChild(loginButton);
  }
}

document.addEventListener('DOMContentLoaded', function() {
main(null);
}, false);


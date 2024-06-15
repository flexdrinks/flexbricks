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

async function getBlog() {
  //url is blog.html?postid=id
  var token = await auth.token();
  var postid = new URLSearchParams(window.location.search).get('postid');

  //https://api-4gg9.onrender.com/
  const response = await fetch('https://api-4gg9.onrender.com/blog/'+postid, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
}

function setInnerHTML(elm, html) {
  elm.innerHTML = html;
  
  Array.from(elm.querySelectorAll("script"))
    .forEach( oldScriptEl => {
      const newScriptEl = document.createElement("script");
      
      Array.from(oldScriptEl.attributes).forEach( attr => {
        newScriptEl.setAttribute(attr.name, attr.value) 
      });
      
      const scriptText = document.createTextNode(oldScriptEl.innerHTML);
      newScriptEl.appendChild(scriptText);
      
      oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
  });
}



async function main() {
  if (auth.loggedIn()) {

    const content = document.getElementById('content');
    content.innerHTML = initial_content;
    const logoutButton = document.getElementById('logout');

    const payload = await auth.tokenPayload();
    console.log('payload', await auth.token());
    const blog = await getBlog();
    console.log(blog);


    setInnerHTML(content, blog.content);


    logoutButton.addEventListener('click', () => {
      auth.logout();
      main();
    });

  }
}


var initial_content = null;
document.addEventListener('DOMContentLoaded', function() {
initial_content = document.getElementById('content').innerHTML;
main(null);
}, false);
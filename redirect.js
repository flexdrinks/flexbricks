const auth = new OAuth2PopupFlow.OAuth2PopupFlow({
		authorizationUri: 'https://oauth-zl4v.onrender.com/auth',
  clientId: 'fbclient',
  redirectUri: 'http://localhost:8000/redirect.html',
  scope: 'openid profile',
  responseType: 'id_token',
  accessTokenResponseKey: 'id_token',
});

debugger;
auth.handleRedirect();

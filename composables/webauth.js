var webAuth;
export const webauth = () => {
  webAuth = new auth0.WebAuth({
    domain: 'emeterr.us.auth0.com',
    clientID: 'VNxtYSh6ho2AzFDAmM4XRu6KfCC1TD4b',
  });
  return webAuth;
};

export const WebSignIn = (matricno, fullname, email, password, phone) => {
  webAuth = new auth0.WebAuth({
    domain: 'emeterr.us.auth0.com',
    clientID: 'VNxtYSh6ho2AzFDAmM4XRu6KfCC1TD4b',
  });
  webAuth.signup(
    {
      connection: 'Username-Password-Authentication',
      email: email,
      password: password,
      username: matricno,
      picture: 'http://example.org/jdoe.png',
      user_metadata: { phone: phone, fullname:fullname },
    },
    function (err) {
      console.log(err);
      if (err) return alert('Something went wrong: ' + err.message);
      return alert('success signup without login!');
    }
  );
};

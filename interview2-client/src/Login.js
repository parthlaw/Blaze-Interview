import React from "react";

const Login = () => {
  const oauthUrl = "https://accounts.google.com/o/oauth2/auth?";
  const params = {
    clientId:
      "726522669713-jejlstmji97pqtfv1hkmaga7olkjh315.apps.googleusercontent.com",
    // clientSecret: "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",
    redirectUrl: "http://localhost:3000/callback",
    scope: "https://www.googleapis.com/auth/calendar",
  };
  return (
    <div>
        <a href={`${oauthUrl}scope=${params.scope}&client_id=${params.clientId.trim()}&redirect_uri=${params.redirectUrl.trim()}&response_type=code`}>
      <button>Login</button>
      </a>
    </div>
  );
};

export default Login;

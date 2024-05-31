export const Gest = () => {
  return (
    <div>
      <h2>Hi!! You are now logged in.</h2>
      <form action="/logout" method="post">
        <input type="submit" value="LOGOUT" />
      </form>
      <hr />

      <form action="/api" method="post">
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" value="Try Auth" />
        <input type="submit" value="Try Auth" />
      </form>

      <a href="/auth/github" className="btn btn-dark">
        <span className="fa fa-github"></span> Sign Up with Github
      </a>
    </div>
  );
};

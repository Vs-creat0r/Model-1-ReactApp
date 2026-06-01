export default function SignIn() {
  return (
    <div className="page-container flex-center">
      <div className="signin-card">
        <h2>Sign In</h2>
        <input type="email" placeholder="Email address" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />
        <button className="primary-btn">Log In</button>
      </div>
    </div>
  );
}

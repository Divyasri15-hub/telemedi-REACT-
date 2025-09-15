import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setError("");
      onLogin(storedUser); // pass user details to App
    } else {
      setError("❌ Invalid email or password");
    }
  };

  return (
    <>
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .login-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .auth-card {
          background: #fff;
          padding: 40px 30px;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          width: 100%;
          max-width: 380px;
          text-align: center;
          animation: fadeIn 0.8s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .auth-card h2 {
          margin-bottom: 25px;
          color: #333;
          font-size: 28px;
          font-weight: bold;
        }
        .auth-card input {
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 18px;
          border: 1.5px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
          transition: all 0.3s ease;
        }
        .auth-card input:focus {
          border-color: #2575fc;
          box-shadow: 0 0 8px rgba(37,117,252,0.3);
          outline: none;
        }
        .auth-card button {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #6a11cb, #2575fc);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .auth-card button:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 15px rgba(0,0,0,0.2);
        }
        .switch-link {
          margin-top: 18px;
          font-size: 14px;
          color: #555;
        }
        .switch-link a {
          color: #2575fc;
          text-decoration: none;
          font-weight: 600;
        }
        .switch-link a:hover {
          text-decoration: underline;
        }
        .error-message {
          color: red;
          font-size: 14px;
          margin-bottom: 12px;
        }
      `}</style>

      <div className="login-wrapper">
        <div className="auth-card">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          <p className="switch-link">
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </>
  );
}

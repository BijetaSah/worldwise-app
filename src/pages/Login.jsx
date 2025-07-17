import { useEffect, useState } from "react";

import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuthentication } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const navigate = useNavigate();

  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { loggedIn, isAuthenticated } = useAuthentication();

  function handleLoggin(e) {
    e.preventDefault();
    if (!email && !password) return;
    loggedIn(email, password);
    console.log("loggedIn");
  }
  useEffect(
    function () {
      console.log(isAuthenticated);
      if (isAuthenticated) return navigate("/app", { replac: true });
    },
    [isAuthenticated, navigate]
  );
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type={"primary"} onClick={handleLoggin}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}

import { useState } from "react";

const SIGNIN_URL = "https://api.schoolzy.com.ng/api/v1/auth/signin/";

export default function LoginTestPage() {
  const [tenantDomain, setTenantDomain] = useState("mavin.schoolzy.com.ng");
  const [user, setUser] = useState("markorrente@gmail.com");
  const [password, setPassword] = useState("Freelance_board_2005");
  const [status, setStatus] = useState<string>("Idle");
  const [result, setResult] = useState<string>("");

  const runTest = async () => {
    setStatus("Sending...");
    setResult("");

    const payload = { user, password };

    try {
      const res = await fetch(SIGNIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Tenant-Domain": tenantDomain,
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text(); // raw text first, so we see it even if not valid JSON
      setStatus(`${res.status} ${res.statusText}`);
      setResult(text);
      console.log(status)
    } catch (err) {
      setStatus("Network/Fetch Error");
      setResult(String(err));
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: "monospace", maxWidth: 600 }}>
      <h2>Login Test</h2>

      <div style={{ marginBottom: 12 }}>
        <label>X-Tenant-Domain</label>
        <br />
        <input
          style={{ width: "100%", padding: 8 }}
          value={tenantDomain}
          onChange={(e) => setTenantDomain(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>user</label>
        <br />
        <input
          style={{ width: "100%", padding: 8 }}
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>password</label>
        <br />
        <input
          style={{ width: "100%", padding: 8 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={runTest} style={{ padding: "8px 16px", marginBottom: 20 }}>
        Send Request
      </button>

      <div>
        <strong>Status:</strong> {status}
      </div>
      <pre style={{ background: "#f0f0f0", padding: 12, whiteSpace: "pre-wrap" }}>
        {result}
      </pre>
    </div>
  );
}
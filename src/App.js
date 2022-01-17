import './App.css';
import crypto from "crypto-js";

function App() {
  const header = {
    "alg": "HS256",
    "typ": "JWT"
  }

  const payload = {
    "sub": "1234567890",
    "name": "John Doe",
    "iat": 1516239022
  }

  const secret = "secret123";

  const replaceCode = {
    "+": "-",
    "/": "-",
    "=": ""
  }

  const cleanHeaders = encoded => {
    return encoded.replace(/[+/=]/g, match => replaceCode[match])
  }

  const encode = obj => {
    const encoded = btoa(
      JSON.stringify(obj)
    )
    return cleanHeaders(encoded)
  }

  const signature = (header, payload, secret) => {
    const hashed = crypto.HmacSHA256(encode(header) + '.' + encode(payload), secret);
    const decode = crypto.enc.Base64.stringify(hashed);

    return cleanHeaders(decode);
  }

  const jwtToken = (header, payload, secret) => {
    return `${encode(header)}.${encode(payload)}.${signature(header, payload, secret)}`
  }

  return (
    <div className="App">
      <p>Expected: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.y3kjst36zujMF4HssVk3Uqxf_3bzumNAvOB9N0_uRV4</p>
      <h1>{encode(header)}</h1>
      <h1>{encode(payload)}</h1>
      <h1>{signature(header, payload, secret)}</h1>
      <h4>Token: {jwtToken(header, payload, secret)}</h4>
    </div>
  );
}

export default App;

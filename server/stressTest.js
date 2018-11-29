import http from "k6/http";

export default function() {
  let response = http.get(
    `http://localhost:3002/${Math.floor(Math.random() * 9999990)}`
  );
}

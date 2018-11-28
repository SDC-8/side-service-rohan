import http from "k6/http";

export default function() {
  let response = http.get(
    `http://localhost:3002/api/sidebar/${Math.floor(Math.random() * 9999999)}`
  );
}

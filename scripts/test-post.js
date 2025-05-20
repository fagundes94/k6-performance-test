import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 20 },  // 0 → 20
        { duration: '2m', target: 20 },  // mantém 20
        { duration: '1m', target: 50 },  // 20 → 50
        { duration: '2m', target: 50 },  // mantém 50
        { duration: '1m', target: 0 },   // finaliza
      ]
};

function randomId() {
    return Math.floor(Math.random() * 10000); // número entre 0 e 9999
}

function randomPrice() {
    return parseFloat((Math.random() * (500 - 1) + 1).toFixed(2));
  }

export default function () {
  const url = 'https://fakestoreapi.com/products';
  
  const payload = JSON.stringify({
    id: randomId(),
    title: 'Teste',
    price: randomPrice(),
    description: 'Teste',
    category: "Games",
    image: "http://example.com"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  console.log('Resposta da API:', res.body);

  check(res, {
    'status é 200': (r) => r.status === 200,
  });

  sleep(1);
}

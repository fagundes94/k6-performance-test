import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 10 }, // sobe para 10 usuários em 30s
        { duration: '1m', target: 10 },  // mantém 10 usuários por 1 minuto
        { duration: '30s', target: 0 },  // reduz para 0 usuários em 30s
      ],
};

export default function () {
  const res = http.get('https://test-api.k6.io/public/crocodiles/');
  
  check(res, {
    'status é 200': (r) => r.status === 200,
  });

  sleep(1); // espera 1 segundo entre as requisições
}
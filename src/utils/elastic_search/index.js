import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200',
});

async function bootstrap() {
  try {
    client.ping();
    console.log('9200번 포트 연결');
  } catch (e) {
    console.log('aaa');
    console.log(e);
  }
}
bootstrap();

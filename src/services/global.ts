const baseURL = `http://172.20.5.133:5000/api/v1/`;
const testURL = `http://222.204.28.253:8002/api/v1/`;

// port 的配置文件
export default function getPort(e: string) {
  return `${testURL}${e}`;
}

const baseURL = `http://172.20.5.133:5000/api/v1/`;
// const testURL = `http://120.78.82.169:5000/api/v1/`

// port 的配置文件
export default function getPort(e: string) {
  return `${baseURL}${e}`;
}

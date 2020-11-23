// port 的配置文件

const baseURL = `http://172.20.5.133:5000/api/v1/`

export default function getPort(e: string) {
  return `${baseURL}${e}`
}
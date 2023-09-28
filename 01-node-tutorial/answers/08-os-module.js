const os = require('os')

const user = os.userInfo()
console.log(user)


const memoryOS = {
  totalMemory: `${os.totalmem() / (1024*1024*1024)} GB`,
  freeMemory: `${os.freemem() / (1024*1024*1024)} GB`,
}
console.log(memoryOS)

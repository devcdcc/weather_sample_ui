let apiServer = "localhost:9000"
let httpServer = "http://" + apiServer + "/"
let wsServer = "ws://" + apiServer + "/"
const Config = {
    url: {
        login: httpServer + "user/login",
        register: httpServer + "user/create"
    }
}
export default Config;

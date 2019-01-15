let apiServer = "localhost:9000"
let httpServer = "http://" + apiServer + "/"
let wsServer = "ws://" + apiServer + "/"
const Config = {
    url: {
        login: httpServer + "user/login",
        register: httpServer + "user/create",
        session: httpServer + "user/session",
        findCities: httpServer + "weather/findCities",
        addToBoard:httpServer + "user/addToBoard",
        removeFromBoard:httpServer + "user/removeFromBoard"
    }
}
export default Config;

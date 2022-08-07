"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const socket_io_1 = require("socket.io");
const socket_1 = tslib_1.__importDefault(require("./socket"));
const http_1 = tslib_1.__importDefault(require("http"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const socketIo = new socket_io_1.Server(server, { cors: { credentials: true } });
app.use(require("cors")({ credentials: true }));
(0, socket_1.default)(socketIo);
server.listen(2134, () => {
    console.log("Server listen : http://localhost:2134");
});
//# sourceMappingURL=Server.js.map
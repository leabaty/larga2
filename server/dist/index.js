"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./routes/router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const mongoDbUrl = process.env.CONNECTION_URL;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', router_1.default);
if (!mongoDbUrl) {
    console.error('⚡️ MongoDB URL is not defined. Please check your environment variables.');
    process.exit(1);
}
mongoose_1.default
    .connect(mongoDbUrl)
    .then(() => app.listen(port || 3000, () => console.log(`⚡️ Server is running at http://localhost:${port}`)))
    .catch((error) => console.log(`⚡️ ${error} did not connect`));

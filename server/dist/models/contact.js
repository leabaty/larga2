"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contactSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    message: String,
    requestDate: Date,
}, { collection: 'Contact' });
const ContactModel = mongoose_1.default.model('Contact', contactSchema);
exports.default = ContactModel;

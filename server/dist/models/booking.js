"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const additionalPaxSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
});
const bookingSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    additionalPax: [additionalPaxSchema],
    counter: Number,
    selectedDate: Date,
    requestDate: Date,
}, { collection: 'Booking' });
const BookingModel = mongoose_1.default.model('Booking', bookingSchema);
exports.default = BookingModel;

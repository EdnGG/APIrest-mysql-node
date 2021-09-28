"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    res.json({
        // ok: true,
        msg: 'getUsers',
        users
    });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (user) {
        res.json({ user });
    }
    res.status(404).json({
        msg: `User with id:${id} not found`
    });
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const emailExist = yield user_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (emailExist) {
            return res.status(400).json({
                msg: `User with email: ${body.email} already exist!! `
            });
        }
        // Pendiente
        const user = yield user_1.default.create(body);
        yield user.save();
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: `Ask with Administrator: ${err}`
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: `User with id: ${id} not found`
            });
        }
        yield user.update(body);
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: `Please contact to your Administrator: ${err}`
        });
    }
    res.json({
        body,
        msg: 'putUser'
    });
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: `User with id: ${id} not found`
            });
        }
        // Deleting phisically
        // await user.destroy();
        // Deleting logically
        yield user.update({ state: false });
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: `Please contact to your Administrator: ${err}`
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map
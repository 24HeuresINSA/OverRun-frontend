"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pascalCase = void 0;
const camelCase_1 = __importDefault(require("lodash/camelCase"));
const startCase_1 = __importDefault(require("lodash/startCase"));
const pascalCase = (str) => (0, startCase_1.default)((0, camelCase_1.default)(str)).replace(/ /g, '');
exports.pascalCase = pascalCase;
//# sourceMappingURL=utils.js.map
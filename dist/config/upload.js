"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var crypto_1 = __importDefault(require("crypto"));
var tmpFolder = path_1.default.resolve(__dirname, '..', '..', 'tmp');
function nameFile(fileName) {
    var fileHash = crypto_1.default.randomBytes(10).toString('hex');
    var nameSemEspaços = fileName.toLowerCase().split(' ').join('-');
    var nameFinal = fileHash + "-" + nameSemEspaços;
    return nameFinal;
}
exports.default = {
    tmpFolder: tmpFolder,
    uploadsFolder: path_1.default.resolve(tmpFolder, 'uploads'),
    storage: multer_1.default.diskStorage({
        destination: tmpFolder,
        filename: function (request, file, callback) {
            var fileName = nameFile(file.originalname);
            return callback(null, fileName);
        },
    }),
};
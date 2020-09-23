import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

function nameFile(fileName: string) {
  const fileHash = crypto.randomBytes(10).toString('hex');
  const nameSemEspaços = fileName.toLowerCase().split(' ').join('-');
  const nameFinal = `${fileHash}-${nameSemEspaços}`;
  return nameFinal;
}

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileName = nameFile(file.originalname);

      return callback(null, fileName);
    },
  }),
};

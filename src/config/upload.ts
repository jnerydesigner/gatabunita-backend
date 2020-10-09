import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import User from '@modules/users/infra/typeorm/entities/User';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.DRIVER_STORAGE,

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        // const user = new User();
        // const { name } = user;
        // console.log(name);
        const fileName = file.originalname;

        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileNameSemEspaços = fileName.toLowerCase().split(' ').join('-');
        // const nameSemEspaços = name.toLowerCase().split(' ').join('-');
        const nameFinal = `${fileHash}-${fileNameSemEspaços}`;

        return callback(null, nameFinal);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'app-gobarber-caneca',
    },
  },
} as IUploadConfig;

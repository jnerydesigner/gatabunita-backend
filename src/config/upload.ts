import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..','tmp');


function nameFile(fileName:string){
    const fileHash = crypto.randomBytes(10).toString('hex');
    const nameSemEspaços = fileName.toLowerCase().split(" ").join("-");

    return  fileName = `${fileHash}-${nameSemEspaços}`;
    
}


export default {
    directory: tmpFolder,

    storage: multer.diskStorage({
        destination: tmpFolder,
        filename: (request, file, callback) => {
            //Código antigo
            //const fileHash = crypto.randomBytes(10).toString('hex');
            //const fileName = `${fileHash}-${file.originalname}`;

            //Código Novo
            const fileName = nameFile(file.originalname);            

            return callback(null, fileName);
        },
    })
}
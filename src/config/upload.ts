import multer from "multer";
import path from "path"
import crypto from 'crypto'

/**
 *@description Configuração de upload de arquivos
 */
const uploadFolder = path.resolve(__dirname,'..','..','uploads');

export default {
    directory:uploadFolder,
    storage:multer.diskStorage({
      destination:uploadFolder,
      filename(request,file,callback){//define como vai ser composto o nome do arquivo
        const filehash = crypto.randomBytes(10).toString('hex');
        const filename = `${filehash}-${file.originalname}`;

        callback(null,filename);
      }
    })
}

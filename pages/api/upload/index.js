import multer from "multer"
import moment from 'moment'
import fs from 'fs';
import nc from 'next-connect';
import { ErrorAsync } from "../../../api/ErrorAsync";
import { connection } from "../helper/database";

export const config = {
  api: {
      bodyParser: false,
  }
}

const date = new Date().getTime();
const UploadImageDir = 'public/uploads/images/';
const path = UploadImageDir + moment(date).format('YYYY/M');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      fs.mkdirSync(path, { recursive: true })
      callback(null, path);
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
});

const fileFilter = (req, file, callback) => {    
    // Check mime
    const mimetype = file.mimetype;
  
   if(  mimetype === 'image/png' ||
        mimetype === 'image/jpg' ||
        mimetype === 'image/jpeg'){
       return callback(null,true);
   } else {
      callback('Error: Images Only!');
   }
} 

const uploader = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

const handler = nc(ErrorAsync);

let UploadFile = uploader.single('file');

handler.use(UploadFile);

handler.get( async (req, res) => {
    try {
        let result = await connection.promise().query('SELECT * FROM `media`;', 
        [ fileName, path + fileName ],
        function(err, response) {
          if(err){
            console.log(err);
          }
            return res.send(response)
        });
        return res.send(result)
      } catch (error) {
        console.log(error)
      }
});

handler.post( async (req, res) => {
    if (!req.file) {
        return res.send({
          success: false
        });
      } else {
        let fileName = req.file.filename;
        try {
          let result = await connection.promise().query('INSERT INTO `media` (`title`, `name`) VALUES ( ?, ? );', 
          [ fileName, path + fileName ],
          function(err, response) {
            if(err){
              console.log(err);
            }
              return res.send(response)
          });
          return res.send(result)
        } catch (error) {
          console.log(error)
        }
    }
});

handler.put( async( req, res) => {
    try {
        let result = await connection.promise().query('UPDATE `media` SET `title` = ?, `name` = ? WHERE `id` = ?;', 
        [ fileName, path + fileName ],
        function(err, response) {
          if(err){
            console.log(err);
          }
            return res.send(response)
        });
        return res.send(result)
      } catch (error) {
        console.log(error)
     }
})

handler.delete( async(req, res) => {
    try {
        let result = await connection.promise().query('DELETE FROM media WHERE `id` = ?', 
        [ req.id ],
        function(err, response) {
          if(err){
            console.log(err);
          }
            return res.send(response)
        });
        return res.send(result)
      } catch (error) {
        console.log(error)
     }
})

export default handler
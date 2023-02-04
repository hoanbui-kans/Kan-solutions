import { ErrorAsync } from '../helper/ErrorAsync';
import nc from 'next-connect';
import JwtMiddleWare from '../helper/jwt';
import connection from '../helper/connection';

const handler = nc(ErrorAsync);

handler.get( async (req, res) => {
    try {
        const response = await connection.promise().query('SELECT * FROM `posts`');
        if(Array.isArray(response) && response.length){
            res.status(200).send(response[0]);
        } else {
            res.status(201).send([]);
        }
    } catch (error){
        console.log(error)
    }
});

handler.post(async (req, res) => {
    const { 
        title,
        name,
        content,
        thumbnail
     } = req.body;
    try {
        const query = 'INSERT INTO `posts` (`title`, `name`, `content`, `thumbnail`) VALUES (?, ?, ?, ?)';
        const response = await connection.promise().query(query, [
            title,
            name,
            content,
            thumbnail
        ]);
        if(Array.isArray(response) && response.length){
            res.status(200).send(response[0]);
        } else {
            res.status(201).send([]);
        }
    } catch (error){
        console.log(error)
    }
});

export default handler
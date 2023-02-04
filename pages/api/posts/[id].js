import { ErrorAsync } from '../helper/ErrorAsync';
import nc from 'next-connect';
import JwtMiddleWare from '../helper/jwt';
import connection from '../helper/connection';

const handler = nc(ErrorAsync);

handler.get(async (req, res) => {
    try {
        const { id } = req.query;
        const query = 'SELECT * FROM `posts` WHERE `id` = ?';
        const response = await connection.promise().query(query, [id]);
        if(Array.isArray(response) && response.length){
            res.status(200).send(response[0][0]);
        } else {
            res.status(201).send([]);
        }
    } catch (error){
        console.log(error)
    }
});

handler.put(async (req, res) => {
    const { 
        title,
        name,
        content,
        thumbnail
     } = req.body;
    
    const { id } = req.query;
    try {
        const query = 'UPDATE `posts` SET `title` = ?, `name` = ?, `content` = ?, `thumbnail` = ? WHERE `id` = ?';
        const response = await connection.promise().query(query, [
            title,
            name,
            content,
            thumbnail,
            id
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

handler.delete(async(req, res) => {
    const { id } = req.query;
    try {
        const query = 'DELETE FROM `posts` WHERE `id` = ?';
        const response = await connection.promise().query(query, [id]);
        if(Array.isArray(response) && response.length){
            res.status(200).send(response[0]);
        } else {
            res.status(201).send([]);
        }
    } catch (error){
        console.log(error)
    }
})


export default handler
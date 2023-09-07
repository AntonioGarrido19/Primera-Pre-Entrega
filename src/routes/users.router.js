import { Router} from 'express'
import { usersManager } from '../dao/managers/session/UsersMongo.js'
import { hashData } from "../utils.js"

const router = Router()

router.post('/signup', async(req, res)=>{
const {first_name,last_name,username,password} = req.body
    if(!first_name || !last_name || !username || !password){
        res.status(400).json({mensaje: 'Some data is missing'})
    }
    const userDB = await usersManager.findUser(username)
    if(userDB){
        return res.status(400).json({message: 'Username already in use'})
    }
    const hashPassword = await hashData(password)
    const newUser = await usersManager.create({...req.body, password:hashPassword})
    res.status(200).json({message: 'User created', user: newUser})
})


export default router
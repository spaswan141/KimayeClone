const {newuser,loginUser,users}=require('../controllers/user')
const router=require('express').Router()


router.post('/signup',newuser)
router.post('/login',loginUser)
router.get('/users',users)
module.exports=router
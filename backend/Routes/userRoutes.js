const express = require('express')
const router = express.Router()
const { getUsersData,createUser, updateUser, deleteUser, getSingleUser } = require('../Controllers/userController')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});



const upload = multer({ storage: storage });

router.get('/', getUsersData)
router.post('/', upload.single('profileImage'), createUser)
router.get('/:id', getSingleUser)
router.put('/:id', upload.single('profileImage'), updateUser)
router.delete('/:id', deleteUser)

module.exports = router
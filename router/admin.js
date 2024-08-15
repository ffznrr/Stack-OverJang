
const express = require('express')
const router = express.Router()
const { adminPage, addProfile, deleteProfile, details, deletePost, handleLogout } = require('../controllers/adminControllers')


router.get('/admin', adminPage)
router.post('/admin/add', addProfile)
router.get('/admin/:id/delete', deleteProfile);
router.get('/admin/:id/details', details)
router.get('/admin/:id/post/:profileId', deletePost)
router.get('/admin/logout', handleLogout)

module.exports = router


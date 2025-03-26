import express from "express"
import {
    postUser,
    getUser,
    getUserDetail,
    deleteUser,
    updateUser,
    loginUser,
    logoutUser
} from "../controllers/UserController.js"

const router = express.Router()

router.route("/").post(postUser).get(getUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/:id").get(getUserDetail).put(updateUser).delete(deleteUser)

export default router
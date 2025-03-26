import express from "express"
import {
    postProduct,
    getProduct,
    getProductDetail,
    deleteProduct,
    updateProduct
} from "../controllers/productController.js"
import {
    requireAdmin,
    requireUser
} from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").post(requireAdmin, postProduct).get(getProduct)
router.route("/:id").get(getProductDetail).put(updateProduct).delete(requireAdmin, deleteProduct)


export default router
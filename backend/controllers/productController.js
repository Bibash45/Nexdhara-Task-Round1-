import Product from "../models/productModel.js";

export const postProduct = async (req, res) => {
    const {
        name,
        description,
        price,
        stock
    } = req.body;
    try {
        let newProduct = await Product.create({
            name,
            price,
            description,
            stock
        })
        if (!newProduct) {
            return res.status(400).json({
                message: "Error creating product"
            })
        }
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}

export const getProduct = async (req, res) => {
    try {
        const pageNumber = Number(req.query.pageNumber) || 1;
        const pageSize = process.env.PAGE_LIMIT_SIZE;
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: "i"
            }
        } : {};

        const count = await Product.countDocuments(keyword);

        let products = await Product.find(keyword)
            .sort({
                createdAt: -1
            })
            .limit(pageSize)
            .skip(pageSize * (pageNumber - 1))

        if (!products) {
            return res.status(404).json({
                success: false,
                message: "No products found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Products found",
            data: products,
            meta: {
                page: pageNumber,
                pages: Math.ceil(count / pageSize),
                keyword: req.query.keyword
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}

export const getProductDetail = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        let product = await Product.findById(
            id
        )
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Product found",
            data: product
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}
export const deleteProduct = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        let product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            })

        }
        return res.status(200).json({
            success: true,
            message: "Product deleted",
            data: product
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}
export const updateProduct = async (req, res) => {
    const {
        id
    } = req.params
    const {
        name,
        price,
        description,
        stock
    } = req.body;
    try {
        let product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            })

        }
        product.name = name
        product.price = price
        product.description = description
        product.stock = stock

        await product.save()


        res.status(201).json({
            success: true,
            message: "Product updated successfully",
            data: product
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        })
    }
}
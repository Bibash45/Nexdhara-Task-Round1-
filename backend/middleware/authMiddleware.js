import {
    expressjwt
} from "express-jwt";
import dotenv from "dotenv"
dotenv.config()

console.log(process.env.JWT_SECRET);

export const requireUser = async (req, res, next) => {


    if (req.cookies.jwt) {

        await expressjwt({
            secret: process.env.JWT_SECRET,
            algorithms: ["HS256"],
            requestProperty: "user",
        })(req, res, (err) => {
            console.log(req.user);
            
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "you are not authorized to access"
                })
            }
            // Check the role
            if (req.user.role === "user") {
                next()
            } else {
                return res.status(400).json({
                    success: false,
                    message: "you are not authorized to access"
                })
            }
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "you are not authorized to access"
        })
    }


}

export const requireAdmin = async (req, res, next) => {
    await expressjwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
        requestProperty: "auth",
    })(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: "you are not authorized to access"
            })
        }
        // Check the role
        if (req.auth.role === "admin") {
            req.user = req.auth;
            next()
        } else {
            return res.status(400).json({
                success: false,
                message: "you are not authorized to access"
            })
        }
    })
}
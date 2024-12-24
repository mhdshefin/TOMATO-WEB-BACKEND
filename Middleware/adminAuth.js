import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {


    try {

        const { token } = req.headers;

        if (!token) {
            res.json({ success: false, message: "Not authorized login again" })
        }

        const token_decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            res.json({ success: false, message: "Incorrect email or password" })
        }
        next()
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error })
    }

}

export default adminAuth
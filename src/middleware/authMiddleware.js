const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()



const authMiddleware = (req, res, next) => {
    console.log(req.headers.token);

    const token = req.headers.token?.split(' ')[1];

    // Đảm bảo rằng token tồn tại
    if (!token) {
        return res.status(401).json({ // 401 Unauthorized
            status: 'Err',
            message: 'Token không hợp lệ'
        });
    }

    // Xác thực token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).json({ // 403 Forbidden
                status: 'Err',
                message: 'Bạn chưa đủ quyền truy nhập'
            });
        }


        if (decoded?.role === 1) {
            req.user_id = decoded.id;
            req.role = decoded.role;
            next();
        } else {
            return res.status(403).json({
                status: 'Err',
                message: 'Bạn chưa đủ quyền truy nhập'
            });
        }
    });
}

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 'Err',
            message: 'Token không hợp lệ'
        });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).json({
                status: 'Err',
                message: 'Bạn chưa đủ quyền truy nhập'
            });
        }

        if (decoded?.Role === 1 || decoded?.id !== null) {
            //account.id
            req.user_id = decoded.id;
            req.role = decoded.role;
            next(); // Người dùng có quyền truy cập
        } else {
            return res.status(403).json({ // 403 Forbidden
                status: 'Err',
                message: 'Bạn chưa đủ quyền truy nhập'
            });
        }
    });
}

module.exports = {
    authUserMiddleware,
    authMiddleware
}
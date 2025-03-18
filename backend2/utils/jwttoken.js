import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // time in milliseconds
        httpOnly: true, // prevent XSS attack (cross-site scripting attack)
        sameSite: "strict", // prevent CSRF attack (cross-site request forgery attack)
        secure: process.env.NODE_ENV !== "development" // use secure cookies in production
    });
};

export default generateToken;

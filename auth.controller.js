import { PrismaClient } from "@prisma/client";
import md5 from 'md5'

const prisma = new PrismaClient();
const secretKey = "sesionVerf";

export const LogIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        const check = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        const token = jwt.sign(payload, secretKey);
        const userSafe = { ...check }
        delete userSafe.password

        res.status(200).json({
            Message: "SUCCESFULLY LOG IN",
            Status: true,
            Succes: true,
            Token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            Message: "Error ->",
            Information: error.message,
        });
    }
};

export const Authorize = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            const verifiedUser = jwt.verify(token, secretKey);

            if (!verifiedUser) {
                res.json({
                    succes: false,
                    auth: false,
                    message: "cannot permission to acces",
                });
            } else {
                const user = Array.isArray(verifiedUser)
                    ? verifiedUser[0]
                    : verifiedUser;
                req.user = user;
                next();
            }
        } else {
            res.json({
                succes: false,
                message: "can't permission access",
            });
        }
    } catch (error) {
        console.log(error);
    }
};
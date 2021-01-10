import jsonwebtoken from 'jsonwebtoken';
import {JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET} from 'loaders/config';
import {JWT_ACCESS_TOKEN_EXPIRY_TIME, JWT_REFRESH_TOKEN_EXPIRY_TIME} from 'loaders/config';
import logger from 'logger';

function generateJWT(payload: object, expiresIn: number, secret: string): string {
    return jsonwebtoken.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn,
    });
}

export function generateAccessToken(payload: object, expiresIn: number = JWT_ACCESS_TOKEN_EXPIRY_TIME)
    : string {
    try {
        return generateJWT(payload, expiresIn, JWT_ACCESS_TOKEN_SECRET);
    } catch (e) {
        logger.error(`ERROR in login generateAccessToken() => ${e}`);
    }
}

export function generateRefreshToken(payload: object, expiresIn: number = JWT_REFRESH_TOKEN_EXPIRY_TIME)
    : string {
    try {
        return generateJWT(payload, expiresIn, JWT_REFRESH_TOKEN_SECRET);
    } catch (e) {
        logger.error(`ERROR in login generateRefreshToken() => ${e}`);
    }
}

export function verifyAccessToken(token: string): any {
    return jsonwebtoken.verify(token, JWT_ACCESS_TOKEN_SECRET);
}

export function verifyRefreshToken(token: string): any {
    return jsonwebtoken.verify(token, JWT_REFRESH_TOKEN_SECRET);
}

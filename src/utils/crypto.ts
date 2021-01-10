import * as crypto from 'crypto'

export function getSha512(data) {
    const hash = crypto.createHash('sha512')
        .update(data)
        .digest('hex');
    return hash;
}

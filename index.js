const { log } = require('console');
const crypto = require('crypto');
const rawPassword = 'nangngu';
const key = crypto.generateKeyPairSync(
    'rsa',
    {modulusLength: 2048},
)
const publicKey = key.publicKey;
const privateKey = key.privateKey;
const encryptedData = crypto.publicEncrypt(
    {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
    },
    Buffer.from(rawPassword)
).toString('base64');
const decryptedData = crypto.privateDecrypt(
    {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
    },
    Buffer.from(encryptedData,'base64')
).toString('utf-8');
console.log({encryptedData});
console.log({decryptedData});
function hashWithSHA512(input){
    const output = crypto.createHash('sha512')
                   .update(input)
                   .digest('hex');
    return output;
}
function hashWithSHA512WithSalt(input){
    const saltRandom = crypto.randomBytes(16).toString('hex');
    // const inputWithSalt = input + saltRandom;
    const output = crypto.pbkdf2Sync(
        input,
        saltRandom,
        1000,
        64,
        'sha512',
    ).toString('hex');
    return output;
}
// console.log(hashWithSHA512WithSalt(rawPassword));
const forge = require('node-forge')

const PKI = forge.pki
const RANDOM = forge.random
const RSA = forge.pki.rsa
const MD = forge.md

var LocalStorage = require('node-localstorage').LocalStorage;
LocalStorage = new LocalStorage('./scratch')

const makeKeyPair = () => generateKeyPair({ bits: 2048 })

const makePublicKeyPem = (publicKey) => PKI.publicKeyToPem(publicKey)

const makePrivateKeyPem = (publicKey) => PKI.privateKeyToPem(publicKey)

const getPublicKeyFromPem = (pemPublicKey) => PKI.publicKeyFromPem(pemPublicKey)

const encryptPrivateKey = (privateKey, secret) => PKI.encryptRsaPrivateKey(privateKey, secret)

const decryptPrivateKey = (pemPrivateKey, secret) => PKI.decryptRsaPrivateKey(pemPrivateKey, secret)


const generateKeyPair = (opts) => new Promise((resolve, reject) => {
    RSA.generateKeyPair(opts, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })

const makeAuthSignature = async (privateKey, secret) => {
    const message = 'Login Request ' + Date.now()
    const md = MD.sha1.create();
    md.update(message, 'utf8');
    const signature = privateKey.sign(md);
    return [message, signature]
  
  }

const verifyAuthSignature = async (publicKey, message, signature) => {
    const md = MD.sha1.create();
    md.update(message, 'utf8');
    const verification = publicKey.verify(md.digest().getBytes(), signature);
    return verification
  }

const genPair = async() => {

    const { publicKey, privateKey } = await makeKeyPair()

    console.log("publicKey ", publicKey)
    console.log("privateKey ", privateKey)

    const publicKeyPem = makePublicKeyPem(publicKey)
    const privateKeyPem = makePrivateKeyPem(privateKey)

    console.log("publicKeyPem ", publicKeyPem)
    console.log("privateKeyPem ", privateKeyPem)

}


const register = async() => {

    const _password = Math.floor((Math.random() * 10000000) + 1);
    //var password = 100;
    const { publicKey, privateKey } = await makeKeyPair()
    console.log("privateKey", privateKey)
    const publicKeyPem = makePublicKeyPem(publicKey)
    const encryptedPrivateKey = encryptPrivateKey(privateKey, _password.toString())

    console.log("encryptedPrivateKey", encryptedPrivateKey)
    LocalStorage.setItem(_password, encryptedPrivateKey);

    return _password;

}


const login = async(password) => {
    
    console.log("login zkp ", password)

    try {

      const encryptedPrivateKey = LocalStorage.getItem(password)
      console.log("encryptedPrivateKey ", encryptedPrivateKey)
      const privateKey = decryptPrivateKey(encryptedPrivateKey, password.toString())
  
      if (!privateKey) {
          return null
      }
  
      const [message, signature] = await makeAuthSignature(privateKey, password)
  
      return [password, message, signature]

    } catch(e) {

      return null

    }

}



module.exports = {
  login,
  register
}




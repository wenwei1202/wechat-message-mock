import * as crypto from 'crypto'
import * as ejs from 'ejs'

const encryptedTpl = '<xml><Encrypt><![CDATA[<%-encrypt%>]]></Encrypt></xml>'
const compiledTpl = ejs.compile(encryptedTpl)

export class MessageHelper {
  public static generateSignature(token, nonce, timestamp) {
    const shasum = crypto.createHash('sha1')
    const arr = [token, timestamp, nonce].sort()
    shasum.update(arr.join(''))
    const signature = shasum.digest('hex')
    return signature
  }

  public static generateNonce() {
    const regex = /[1-9]\d{9}/
    let match
    while (!match) {
      match = regex.exec(Math.random().toString())
    }
    return match[0]

  }
  public static getTimestamp() {
    return Math.floor(Date.now() / 1000)
  }
  public static encryptMessage(wechatEncryptor: any, content: string) {
    const encryptMessage = wechatEncryptor.encrypt(content)
    const encryptXml = compiledTpl({
      encrypt: encryptMessage
    })
    return encryptXml
  }
}

export default MessageHelper

import * as utils from './utils.js'

utils.create()

export class AV64X4 {

    constructor(key) {
        this._key = key
    }

    encode(str) {

        try {

            let key = utils.create_key(this._key)
            let buffer = utils.create_buffer(key)
            let value = utils.encode64(str)
            key = utils.define_key(key, value)
            return utils.apply(key, value, buffer, 'encode')

        } catch (err) {

            throw new Error('Encode failed.')

        }

    }

    decode(str) {

        try {

            let key = utils.create_key(this._key)
            let value = str
            let buffer = utils.create_buffer(key)
            key = utils.define_key(key, value)
            let final = utils.apply(key, value, buffer, 'decode')
            return utils.decode64(final)

        } catch (err) {

            throw new Error('Decode failed. Thats probably because the given string is not a valid hash or the given key is wrong.')

        }

    }

    hash(str) {

    }

}
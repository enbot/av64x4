import { av_core } from './core.js'

av_core.start()

export class AV64X4 {

    constructor(key) {
        this._key = key
    }

    encode(str) {
        try {

            let key = av_core.create_key(this._key)
            let buffer = av_core.create_buffer(key)
            let value = av_core.encode64(str)
            key = av_core.define_key(key, value)
            return av_core.apply(key, value, buffer, 'encode')

        } catch (err) {
            throw new Error('Encode failed.')
        }
    }

    decode(str) {
        try {

            let key = av_core.create_key(this._key)
            let value = str
            let buffer = av_core.create_buffer(key)
            key = av_core.define_key(key, value)
            let final = av_core.apply(key, value, buffer, 'decode')
            return av_core.decode64(final)

        } catch (err) {
            throw new Error('Decode failed. Thats probably because the given string is not a valid hash or the given key is wrong.')
        }
    }

    hash(str) {

    }

}
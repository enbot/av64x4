import { av_core } from './core.js'

export class AV64X4 {

    constructor(key) {
        if (key)
            this.init(key)
    }

    init(key) {
        const av_key = av_core.create_key(key)
        const av_buffer = av_core.create_buffer(av_key)
        const av_date = av_core.create_key('timestamp')
        this['[[av_key]]'] = av_key
        this['[[av_date]]'] = av_date
        av_core.start(av_buffer)
    }

    encode(str, timestamp = null) {
        this._doCheck('encode')

        try {
            let value = av_core.encode64(str)
            let date = !timestamp ?
                av_core.get_date() :
                av_core.fake_date(timestamp)
            let value_key = av_core.define_key(this['[[av_key]]'], value)
            let date_key = av_core.define_key(this['[[av_date]]'], date)
            return av_core.mix(
                av_core.apply(value_key, value, 'encode'),
                av_core.apply(date_key, date, 'encode'))
        } catch (err) {
            throw new Error('Encode failed.')
        }
    }

    decode(str) {
        this._doCheck('decode')

        try {
            let value = av_core.split(str)[0]
            let key = av_core.define_key(this['[[av_key]]'], value)
            let final = av_core.apply(key, value, 'decode')
            return av_core.decode64(final)
        } catch (err) {
            throw new Error('Encode failed.')
        }
    }

    when(str) {
        this._doCheck('check when')

        try {
            let date = av_core.split(str)[1]
            let key = av_core.define_key(this['[[av_date]]'], date)
            let final = av_core.apply(key, date, 'decode')
            return av_core.parse_date(final)
        } catch (err) {
            throw new Error('When failed.')
        }
    }

    _doCheck(str) {
        if (!this['[[av_key]]'])
            throw new Error(`Cannot ${str} before initiation. Call AV64X4.init("your_key")`)
    }

}

export const encode64 = str => av_core.encode64(str)
export const decode64 = str => av_core.decode64(str)
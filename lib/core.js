import { AvCustom64 } from './custom64.js'

export const
    av_char_uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    av_char_lowercase = 'abcdefghijklmnopqrstuvwxyz',
    av_char_numbers = '0123456789',
    av_char_symbols = '%/&',
    av_char_64 =
        av_char_uppercase +
        av_char_lowercase +
        av_char_numbers +
        av_char_symbols,
    avCustom64 = new AvCustom64(av_char_64),
    av_tables = [
        b => {
            let t = []
            for (let i = 0; i < b.length; i++)
                for (let j = 0; j < b[i].length; j++)
                    t.push(av_char_64[b[i][j]])
            return t
        },
        b => {
            let t = []
            for (let i = b.length - 1; i >= 0; i--)
                for (let j = b[i].length - 1; j >= 0; j--)
                    t.push(av_char_64[b[i][j]])
            return t
        },
        b => {
            let odd = [], even = []
            for (let i = 0; i < b.length; i++)
                for (let j = 0; j < b[i].length; j++)
                    b[i][j] % 2 === 0 ?
                        even.push(av_char_64[b[i][j]]) :
                        odd.push(av_char_64[b[i][j]])
            return odd.concat(even)
        },
        b => {
            let even = [], odd = []
            for (let i = 0; i < b.length; i++)
                for (let j = 0; j < b[i].length; j++)
                    b[i][j] % 2 === 0 ?
                        even.push(av_char_64[b[i][j]]) :
                        odd.push(av_char_64[b[i][j]])
            return even.concat(odd)
        },
    ],
    av_enc_functions = [
        (k, v, b) => av_tables[0](b)[av_fetch_index(k, v, '+', av_char_64.split(''))],
        (k, v, b) => av_tables[1](b)[av_fetch_index(k, v, '+', av_char_64.split(''))],
        (k, v, b) => av_tables[2](b)[av_fetch_index(k, v, '+', av_char_64.split(''))],
        (k, v, b) => av_tables[3](b)[av_fetch_index(k, v, '+', av_char_64.split(''))],
    ],
    av_dec_functions = [
        (k, v, b) => av_char_64.split('')[av_fetch_index(k, v, '-', av_tables[0](b))],
        (k, v, b) => av_char_64.split('')[av_fetch_index(k, v, '-', av_tables[1](b))],
        (k, v, b) => av_char_64.split('')[av_fetch_index(k, v, '-', av_tables[2](b))],
        (k, v, b) => av_char_64.split('')[av_fetch_index(k, v, '-', av_tables[3](b))],
    ]

export const av_fetch_index = (k, v, o, l) => {
    let
        i = parseInt(l.indexOf(v)),
        j = parseInt(k),
        w = o === '+' ?
            i + j :
            i - j
    if (w < 0) w += 64
    if (w > 64) w -= 64
    return w
}

export function av_mtx(l, el) {
    var m = [], i, k
    for (i = 0, k = -1; i < l.length; i++) {
        if (i % el === 0)
            m[++k] = []
        m[k].push(l[i])
    }
    return m
}

export function av_create_buffer(k) {

    let pos = new Array(65),
        add = [],
        odd = [],
        even = [],
        keys = []

    for (let i = 0, p = k.split(''); i < p.length; i++) {
        if (i !== 0) {
            let t = null
            if (i % 4 !== 0)
                t = '' + p[i] + p[i - 1]
            else
                t = '' + p[i]
            if (keys.indexOf(t) === -1)
                keys.push(t)
        }
    }

    for (let i = 0; i < pos.length; i++) {
        pos[i] = i
        keys.indexOf(JSON.stringify(pos[i])) === -1 ?
            parseInt(pos[i]) % 2 === 0 ?
                even.push(pos[i]) :
                odd.push(pos[i]) :
            add.push(pos[i])
    }

    return av_mtx([].concat(add, odd, even), 8)
}

export const av_pr = (k) => {
    let p = parseInt(k) * parseInt(k)
    while (p > Number.MAX_SAFE_INTEGER)
        p /= 2
    p = p.toString()
    if (p.length > 5) p = p.substring(
        (p.length / 2) - 3,
        (p.length / 2) + 1)
    return p
}

export const av_core = {

    start: () => {
        if (!String.prototype.includes)
            String.prototype.includes = function (search, start) {
                'use strict';

                if (typeof start !== 'number')
                    start = 0;

                return start + search.length > this.length ?
                    false : this.indexOf(search, start) !== -1
            }
    },

    create_key: (k) => avCustom64
        .encode(k)
        .split('')
        .map(char => av_char_64.indexOf(char))
        .join(''),

    create_buffer: (k) => av_create_buffer(k),

    encode64: (str) => avCustom64.encode(str),

    decode64: (str) => avCustom64.decode(str),

    define_key: (k, v) => {

        while (k.length < v.length)
            k += av_pr(k)

        return k
    },

    apply: (k, v, b, t) => {

        let
            final = '',
            parsed_value = v.split(''),
            parsed_key = k.split('')

        for (let i = 1; i <= v.length; i++)
            final += t === 'encode' ?
                av_enc_functions[i % 4](parsed_key[i - 1], parsed_value[i - 1], b) :
                av_dec_functions[i % 4](parsed_key[i - 1], parsed_value[i - 1], b)

        return final
    },

    throw: str => {
        throw new Error(str)
    }


}
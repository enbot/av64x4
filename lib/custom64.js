export class AvCustom64 {

    constructor(char_64_bytes) {

        if (char_64_bytes.length !== 65)
            throw new Error('Encode str must have 65 bytes')

        this.map = char_64_bytes

    }

    encode(input) {

        input = this._utf8_encode(input)

        var output = "", a, b, c, d, e, f, g, i = 0;

        while (i < input.length) {
            a = input.charCodeAt(i++);
            b = input.charCodeAt(i++);
            c = input.charCodeAt(i++);
            d = a >> 2;
            e = ((a & 3) << 4) | (b >> 4);
            f = ((b & 15) << 2) | (c >> 6);
            g = c & 63;

            if (isNaN(b))
                f = g = 64;
            else if (isNaN(c))
                g = 64;

            output += this.map.charAt(d) +
                this.map.charAt(e) +
                this.map.charAt(f) +
                this.map.charAt(g);
        }

        return output;
    }

    decode(input) {
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "")
        var output = "", a, b, c, d, e, f, g, i = 0

        while (i < input.length) {
            d = this.map.indexOf(input.charAt(i++))
            e = this.map.indexOf(input.charAt(i++))
            f = this.map.indexOf(input.charAt(i++))
            g = this.map.indexOf(input.charAt(i++))

            a = (d << 2) | (e >> 4)
            b = ((e & 15) << 4) | (f >> 2)
            c = ((f & 3) << 6) | g

            output += String.fromCharCode(a)
            if (f != 64) output += String.fromCharCode(b)
            if (g != 64) output += String.fromCharCode(c)
        }

        return this._utf8_decode(output)
            .replace(/[\u0000-\u0019]+/g, "")
            .replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f")

    }

    _utf8_encode(string) {
        string = string.replace(/\r\n/g, "\n")
        var output = "", i = 0, charCode

        for (i; i < string.length; i++) {
            charCode = string.charCodeAt(i)
            if (charCode < 128)
                output += String.fromCharCode(charCode)
            else if ((charCode > 127) && (charCode < 2048)) {
                output += String.fromCharCode((charCode >> 6) | 192)
                output += String.fromCharCode((charCode & 63) | 128)
            } else {
                output += String.fromCharCode((charCode >> 12) | 224)
                output += String.fromCharCode(((charCode >> 6) & 63) | 128)
                output += String.fromCharCode((charCode & 63) | 128)
            }
        }

        return output;
    }

    _utf8_decode(string) {
        var output = "", i = 0, charCode = 0;

        while (i < string.length) {
            charCode = string.charCodeAt(i);
            if (charCode < 128) {
                output += String.fromCharCode(charCode)
                i++
            } else if ((charCode > 191) && (charCode < 224)) {
                output += String.fromCharCode(((charCode & 31) << 6) | (string.charCodeAt(i + 1) & 63))
                i += 2
            } else {
                output += String.fromCharCode(((charCode & 15) << 12) | ((string.charCodeAt(i + 1) & 63) << 6) | (string.charCodeAt(i + 2) & 63))
                i += 3
            }
        }

        return output
    }
}
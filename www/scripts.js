import { AV64X4 } from '../index.js'

function main() {

    tests()

    let body = document.querySelector('body')
    let js = document.createElement('div')
    js.id = "js"
    js.innerHTML = "js"
    body.appendChild(js)

}

function tests() {

    let key = 'mysupersecretkey'
    let value = 'my super secret message'

    console.log('/==========================================================================/');

    let av64x4 = new AV64X4(key)
    console.log(key)
    console.log(value)

    // let encoded = av64x4.encode(value)
    // console.log('encoded:')
    // console.log(encoded)

    // let decoded = av64x4.decode(encoded)
    // console.log('decoded:')
    // console.log(decoded)

    // let when = av64x4.when(encoded)
    // console.log('when:')
    // console.log(when)

    console.log('/==========================================================================/');

    let myjson = {
        test: true,
        value: 2,
        myarray: [1, 2, 3, 4, 5, 6],
        a: '( ͡° ͜ʖ ͡°)'
    }
    console.log(myjson);

    let stringfied = JSON.stringify(myjson)
    console.log(stringfied);

    let jsonencoded = av64x4.encode(stringfied)
    console.log(jsonencoded);

    let jsondecoded = av64x4.decode(jsonencoded)
    console.log(jsondecoded);

    let jsonparsed = JSON.parse(jsondecoded)
    console.log(jsonparsed);

    console.log('/==========================================================================/');

}

main()
import { AV64X4 } from '../index.js';

function main() {

    tests()

    let body = document.querySelector('body')
    let js = document.createElement('div')
    js.id = "js"
    js.innerHTML = "js"
    body.appendChild(js)

}

function tests() {

    let key = 'chavesecreta'
    let value = '{ teste: true }{ teste: true }{ teste: true }{ teste: true }{ teste: true }{ teste: true }'

    let av64x4 = new AV64X4(key)
    let encoded = av64x4.encode(value)
    let decoded = av64x4.decode(encoded)

    console.log('/==========================================================================/');

    console.log(key);
    console.log(value);

    console.log('encoded:');
    console.log(encoded);

    console.log('decoded:');
    console.log(decoded);

    console.log('/==========================================================================/');

}

main()
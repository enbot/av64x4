# AV64X4 Encryption

AV64X4 is simple encryption created with javascript to store information on front-end. It uses a custom base 64 type and 4 indexing tables created at run time based on the provided key.

It is not finished yet.

## Installation and testing

Clone the project and serve it with [http-server](https://www.npmjs.com/package/http-server).
Use [npm](https://www.npmjs.com/) to install it globally.

```bash
git clone https://github.com/enbot/av64x4.git
cd ./av64x4/
npm i -g http-server
http-server
```

Then go to http://localhost:8080/www/

## Usage

```javacript
import { AV64X4 } from './index.js'

let av64x4 = new AV64X4('mysupersecretkey')
let encoded = av64x4.encode('my super secret message') // av64x4 encoded hash
let decoded = av64x4.decode(encoded) // regular decoded string
let when = av64x4.when(encoded) // JS date object
```
### Key start

It is not necessary to pass the key in class constructor. Call the init() then pass it:

```javacript
import { AV64X4 } from './index.js'

let av64x4 = new AV64X4()
av64x4.init('mysupersecretkey')
```

### Key restart

You do not need to create a new object to sign a new key. Just use the init() function again:

```javacript
import { AV64X4 } from './index.js'

let av64x4 = new AV64X4()
av64x4.init('mysupersecretkey')
av64x4.init('anothersupersecretkey')
```

## Contributing
Pull requests are welcome. The project will always be open to both logic and performance improvements. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://github.com/enbot/av64x4/blob/master/LICENSE)
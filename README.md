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
let encoded = av64x4.encode('my super secret message')
let decoded = av64x4.decode(encoded)
```

## License
[MIT](https://github.com/enbot/av64x4/blob/master/LICENSE)
# bloks-parser

Npm package for parsing Instagram's BLOCKS format.

Uses peggy to generate a parser from the grammar in `src/blok-parser.peggy`.

## Usage

Install the package:

```sh
yarn add bloks-parser
```

```ts
import {parseBloks, visitBloks} from "blok-parser";

const bloks = parseBloks(rawBloks);

visitBloks(bloks, (blok) => {
    const [funcName, ...args] = blok;

    console.log({
        funcName,
        args,
    });

    return false;
});
```

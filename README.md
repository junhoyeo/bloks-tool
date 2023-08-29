# bloks-tool

Npm package for parsing Instagram's BLOCKS format.

Uses peggy to generate a parser from the grammar in `src/bloks-tool.peggy`.

## Usage

Install the package:

```sh
yarn add bloks-tool
```

```ts
import {parseBloks, visitBloks} from "bloks-tool";

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

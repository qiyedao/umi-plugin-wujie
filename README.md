# umi-plugin-wujie

[![NPM version](https://img.shields.io/npm/v/umi-plugin-wujie.svg?style=flat)](https://npmjs.org/package/umi-plugin-wujie)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-wujie.svg?style=flat)](https://npmjs.org/package/umi-plugin-wujie)

## install

pnpm add umi-plugin-wujie -D

## Options

```js
export default defineConfig({
    wujie: {
        master: {
            apps: [
                {
                    name: 'app1',
                    entry: '//localhost:8001' // html entry
                },
                {
                    name: 'app2',
                    entry: '//localhost:5173', // html entry
                    alive: true,
                    credentials: true
                }
            ]
        }
    }
});
```

## devlop

```bash
$ pnpm i
```

```bash
$ pnpm run dev
$ pnpm run build
```

## LICENSE

MIT

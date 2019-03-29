# React Kabocha

> Another lightweight alternative for react-helmet

**Requires `react` & `react-dom` @ `v16.8` or newer.**

## Installation

```bash
npm install --save react-kabocha
```

or with [Yarn](https://yarnpkg.com/):

```bash
yarn add react-kabocha
```

## FAQ

> How do I write styles?

You can write as escaped string

```jsx
<Head>
  <style>
    {`
      body { background: gray; }
    `}
  </style>
</Head>
```

**Notice**: But it is still preferable to use some other library for managing styles.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

(and [Beerware](https://en.wikipedia.org/wiki/Beerware) as informal license)

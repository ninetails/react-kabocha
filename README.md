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

## Usage

@todo

## API

### HeadProvider

This component will manage your Head tags

```jsx
import { HeadProvider } from 'react-kabocha'

function App() {
  return <HeadProvider>(...)</HeadProvider>
}
```

Remember to add it near to your App Root.

### Registry

This contains all tags controlled by application. You will need it if you do SSR.

```jsx
import { Registry } from 'react-kabocha'
import { renderToString } from 'react-dom/server'

// ...
const registry = new Registry()

const content = renderToString(
  <HeadProvider registry={registry}>
    <App />
  </HeadProvider>
)

// now registry have all entries used inside your application
```

For client, you can omit registry

```jsx
import { render } from 'react-dom'

render(
  <HeadProvider>
    <App />
  </HeadProvider>,
  document.getElementById('root')
)
```

When `client` attribute was not provided, it will assume that it's on server if registry was passed.

#### Passing tags to constructor

It's possible to pass static tags to constructor if you want to always have them on server rendering.

```jsx
import { Registry } from 'react-kabocha'
import { renderToString } from 'react-dom/server'

// ...
const registry = new Registry([
  <title>My Title</title>,
  <meta charSet="utf-8" />
])

const content = renderToString(
  <HeadProvider registry={registry}>
    <App />
  </HeadProvider>
)
```

#### Unique tags

Just provide an unique key to identify your tag.

```jsx
import { Registry } from 'react-kabocha'
import { renderToString } from 'react-dom/server'

// ...
const registry = new Registry([
  <title key="title">My Title</title>,
  <meta charSet="utf-8" />
])

// on a children
registry.add(<title key="title">My Other Title</title>)
```

It will stay with latest added to registry.

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

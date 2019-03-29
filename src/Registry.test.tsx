/* eslint-disable react/jsx-key */
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { render } from 'react-testing-library'
import Registry from './Registry'

describe('Registry', () => {
  describe('constructor', () => {
    it('should accept single element', () => {
      const registry = new Registry(<title>foo</title>)
      const { container } = render(<div>{registry.getAsReactNodes()}</div>)
      const expected = `
<div>
  <title>
    foo
  </title>
</div>
`
      expect(container.firstChild).toMatchInlineSnapshot(expected)
    })

    it('should accept an array of elements', () => {
      const registry = new Registry([
        <title>foo</title>,
        <meta charSet="utf-8" />
      ])
      const { container } = render(<div>{registry.getAsReactNodes()}</div>)
      const expected = `
<div>
  <title>
    foo
  </title>
  <meta
    charset="utf-8"
  />
</div>
`
      expect(container.firstChild).toMatchInlineSnapshot(expected)
    })

    it('should return an empty array if nothing was provided', () => {
      const registry = new Registry()
      const { container } = render(<div>{registry.getAsReactNodes()}</div>)
      expect(container.firstChild).toMatchInlineSnapshot('<div />')
    })

    it('should be possible to add new elements', () => {
      const registry = new Registry(<title>foo</title>)
      registry.add(<meta charSet="utf-8" />)
      const { container } = render(<div>{registry.getAsReactNodes()}</div>)
      const expected = `
<div>
  <title>
    foo
  </title>
  <meta
    charset="utf-8"
  />
</div>
`
      expect(container.firstChild).toMatchInlineSnapshot(expected)
    })
  })

  it('should be possible to add new array of elements', () => {
    const registry = new Registry([
      <title>foo</title>,
      <meta charSet="utf-8" />
    ])
    registry.add([
      <meta name="viewport" content="width=device-width, initial-scale=1" />,
      <meta name="description" content="meta description tag" />
    ])
    const { container } = render(<div>{registry.getAsReactNodes()}</div>)
    const expected = `
<div>
  <title>
    foo
  </title>
  <meta
    charset="utf-8"
  />
  <meta
    content="width=device-width, initial-scale=1"
    name="viewport"
  />
  <meta
    content="meta description tag"
    name="description"
  />
</div>
`
    expect(container.firstChild).toMatchInlineSnapshot(expected)
  })

  it('should be possible to remove single element with same reference', () => {
    const registry = new Registry([<title>foo</title>])
    const mockElementRef = <meta charSet="utf-8" />
    registry.add(mockElementRef)
    registry.add(
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    )
    const firstRender = render(<div>{registry.getAsReactNodes()}</div>)
    const firstRenderExpected = `
<div>
  <title>
    foo
  </title>
  <meta
    charset="utf-8"
  />
  <meta
    content="width=device-width, initial-scale=1"
    name="viewport"
  />
</div>
`
    expect(firstRender.container.firstChild).toMatchInlineSnapshot(
      firstRenderExpected
    )

    registry.remove(mockElementRef)
    const secondRender = render(<div>{registry.getAsReactNodes()}</div>)
    const secondRenderExpected = `
<div>
  <title>
    foo
  </title>
  <meta
    content="width=device-width, initial-scale=1"
    name="viewport"
  />
</div>
`
    expect(secondRender.container.firstChild).toMatchInlineSnapshot(
      secondRenderExpected
    )
  })

  it('should be possible to remove array of elements with same reference', () => {
    const registry = new Registry([<title>foo</title>])
    const mockElementsRef = [
      <meta charSet="utf-8" />,
      <meta name="description" content="meta description tag" />
    ]
    registry.add(mockElementsRef)
    registry.add(
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    )
    const firstRender = render(<div>{registry.getAsReactNodes()}</div>)
    const firstRenderExpected = `
<div>
  <title>
    foo
  </title>
  <meta
    charset="utf-8"
  />
  <meta
    content="meta description tag"
    name="description"
  />
  <meta
    content="width=device-width, initial-scale=1"
    name="viewport"
  />
</div>
`
    expect(firstRender.container.firstChild).toMatchInlineSnapshot(
      firstRenderExpected
    )

    registry.remove(mockElementsRef)
    const secondRender = render(<div>{registry.getAsReactNodes()}</div>)
    const secondRenderExpected = `
<div>
  <title>
    foo
  </title>
  <meta
    content="width=device-width, initial-scale=1"
    name="viewport"
  />
</div>
`
    expect(secondRender.container.firstChild).toMatchInlineSnapshot(
      secondRenderExpected
    )
  })

  it('should stay with the last one of duplicated keys', () => {
    const registry = new Registry([
      <title key="title">foo</title>,
      <title key="title">bar</title>,
      <meta charSet="utf-8" />,
      <title key="title">baz</title>
    ])
    const { container } = render(<div>{registry.getAsReactNodes()}</div>)
    const expected = `
<div>
  <meta
    charset="utf-8"
  />
  <title>
    baz
  </title>
</div>
`
    expect(container.firstChild).toMatchInlineSnapshot(expected)
  })

  describe('getTransformed', () => {
    it('should be possible to pass react-dom/server: renderToString', () => {
      const registry = new Registry(<title>foo</title>)
      const expected = ['<title>foo</title>']
      expect(registry.getTransformed<string>(renderToStaticMarkup)).toEqual(
        expected
      )
    })
  })
})

import React, { Fragment, useContext, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { render, fireEvent } from 'react-testing-library'
import HeadProvider from './HeadProvider'
import ctx from './context'

describe('HeadProvider', () => {
  describe('server (ssr)', function() {
    it('should render', () => {
      expect(
        renderToStaticMarkup(
          <HeadProvider>
            <span>children</span>
          </HeadProvider>
        )
      ).toBe('<span>children</span>')
    })

    describe('client attribute', () => {
      describe('passing false', () => {
        it('should repass to context', () => {
          const MockComponent = jest.fn().mockImplementation(() => {
            const { client } = useContext(ctx)

            return <Fragment>{client ? 'true' : 'false'}</Fragment>
          })
          const mockValue = false
          const result = renderToStaticMarkup(
            <HeadProvider client={mockValue}>
              <MockComponent />
            </HeadProvider>
          )

          expect(result).toBe(`${mockValue}`)
        })
      })

      describe('passing true', () => {
        it('should repass to context', () => {
          const MockComponent = jest.fn().mockImplementation(() => {
            const { client } = useContext(ctx)

            return <Fragment>{client ? 'true' : 'false'}</Fragment>
          })
          const mockValue = false
          const result = renderToStaticMarkup(
            <HeadProvider client={mockValue}>
              <MockComponent />
            </HeadProvider>
          )

          expect(result).toBe(`${mockValue}`)
        })
      })

      describe('passing nothing', () => {
        it('should repass "undefined" to context', () => {
          const MockComponent = jest.fn().mockImplementation(() => {
            const { client } = useContext(ctx)

            return <Fragment>{typeof client}</Fragment>
          })
          const result = renderToStaticMarkup(
            <HeadProvider>
              <MockComponent />
            </HeadProvider>
          )

          expect(result).toBe('undefined')
        })
      })
    })
  })

  describe('browser', function() {
    it('should render', () => {
      const { container } = render(
        <HeadProvider>
          <span>children</span>
        </HeadProvider>
      )

      const expected = `
<span>
  children
</span>
`

      expect(container.firstChild).toMatchInlineSnapshot(expected)
    })

    it('should not render HeadProvider on changing child', () => {
      function MockComponent(): React.ReactElement {
        const [counter, setCounter] = useState(0)

        return (
          <button data-testid="button" onClick={() => setCounter(c => c + 1)}>
            {counter}
          </button>
        )
      }

      const MockedHeadProvider = jest.fn().mockImplementation(HeadProvider)

      const { getByTestId } = render(
        <MockedHeadProvider>
          <MockComponent />
        </MockedHeadProvider>
      )

      expect(getByTestId('button').innerHTML).toBe('0')
      expect(MockedHeadProvider).toHaveBeenCalledTimes(1)
      fireEvent.click(getByTestId('button'))
      expect(getByTestId('button').innerHTML).toBe('1')
      expect(MockedHeadProvider).toHaveBeenCalledTimes(1)
    })

    describe('client attribute', () => {
      describe('passing false', () => {
        it('should repass to context', () => {
          const MockComponent = jest.fn().mockImplementation(() => {
            const { client } = useContext(ctx)

            return client ? 'true' : 'false'
          })
          const mockValue = false
          const { container } = render(
            <HeadProvider client={mockValue}>
              <MockComponent />
            </HeadProvider>
          )

          expect(container.innerHTML).toBe(`${mockValue}`)
        })
      })

      describe('passing true', () => {
        it('should repass to context', () => {
          const MockComponent = jest.fn().mockImplementation(() => {
            const { client } = useContext(ctx)

            return client ? 'true' : 'false'
          })
          const mockValue = false
          const { container } = render(
            <HeadProvider client={mockValue}>
              <MockComponent />
            </HeadProvider>
          )

          expect(container.innerHTML).toBe(`${mockValue}`)
        })
      })

      describe('passing nothing', () => {
        it('should repass "undefined" to context', () => {
          const MockComponent = jest.fn().mockImplementation(() => {
            const { client } = useContext(ctx)

            return typeof client
          })
          const { container } = render(
            <HeadProvider>
              <MockComponent />
            </HeadProvider>
          )

          expect(container.innerHTML).toBe('undefined')
        })
      })
    })
  })
})

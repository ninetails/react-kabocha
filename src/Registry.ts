import React from 'react'

interface ReactKabochaRegistryInterface {
  add(nodes?: React.ReactNode): void;
  remove(nodes?: React.ReactNode): void;
  getAsReactNodes(): React.ReactNodeArray;
  getTransformed<T = string>(
    transformationFunction: TransformationFunction<T>
  ): (T | undefined)[];
}

type TransformationFunction<T = string> = (
  node: React.ReactElement,
  index?: number,
  arr?: React.ReactElement[]
) => T

function defaultFilter(elements: React.ReactElement[]): React.ReactElement[] {
  return elements
    .reverse()
    .filter(
      (
        element: React.ReactElement,
        index: number,
        self: React.ReactElement[]
      ): boolean =>
        !element.key ||
        self.findIndex(
          (found: React.ReactElement): boolean => found.key === element.key
        ) === index
    )
    .reverse()
}

export default class ReactKabochaRegistry
implements ReactKabochaRegistryInterface {
  protected entries: (React.ReactElement[] | React.ReactElement)[] = []
  protected filter: (element: React.ReactElement[]) => React.ReactElement[]

  public constructor(
    initialEntries?: React.ReactElement | React.ReactElement[],
    filter?: (elements: React.ReactElement[]) => React.ReactElement[]
  ) {
    if (Array.isArray(initialEntries)) {
      this.entries = [...this.entries, initialEntries]
    } else if (initialEntries) {
      this.entries = [...this.entries, [initialEntries]]
    }

    this.filter = filter || defaultFilter
  }

  public add(nodes?: React.ReactElement | React.ReactElement[]): void {
    if (nodes && this.entries.indexOf(nodes) === -1) {
      this.entries = [...this.entries, nodes]
    }
  }

  public remove(nodes?: React.ReactElement | React.ReactElement[]): void {
    if (nodes && this.entries.indexOf(nodes) > -1) {
      const nextEntries = this.entries.slice()
      nextEntries.splice(this.entries.indexOf(nodes), 1)
      this.entries = nextEntries
    }
  }

  public getAsReactNodes(): React.ReactElement[] {
    return this.filter(this.entries.flat()).map(
      (element: React.ReactElement, index: number): React.ReactElement => ({
        ...element,
        key: element.key || `${index}`
      })
    )
  }

  public getTransformed<T>(
    transformationFunction: TransformationFunction<T>
  ): T[] {
    return this.getAsReactNodes().map(transformationFunction)
  }
}

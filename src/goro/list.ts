export class Stack<T> {
  data: T[] = []

  push(item: T) {
    this.data.unshift(item)
  }

  pop(): T {
    return this.data.shift()
  }

  peek(): T | null {
    return this.data[0] ?? null
  }

  get size() {
    return this.data.length
  }
}

export class Queue<T> {
  data: T[] = []

  push(item: T) {
    this.data.push(item)
  }

  pop(): T {
    return this.data.shift()
  }

  peek(): T | null {
    return this.data[0] ?? null
  }

  get size() {
    return this.data.length
  }
}

const { normalizeURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL TrailingSlashes', () =>{
    const url = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(url)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL UpperCase', () =>{
    const url = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(url)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL strip http', () =>{
    const url = 'https://blog.boot.dev/path'
    const actual = normalizeURL(url)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

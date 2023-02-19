const { normalizeURL, getURLfromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL TrailingSlashes', () => {
    const url = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(url)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL UpperCase', () => {
    const url = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(url)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL strip http', () => {
    const url = 'https://blog.boot.dev/path'
    const actual = normalizeURL(url)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLfromHTML', () => {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=la, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <a href="https://blog.boot.dev/">
            boot.dev Blog
        </a>
    </body>
    </html>`
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLfromHTML(html, baseURL)
    const expected = ['https://blog.boot.dev/']
    expect(actual).toEqual(expected)
})

test('getURLfromHTML relative', () => {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=la, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <a href="/path/">
            boot.dev Blog
        </a>
    </body>
    </html>`
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLfromHTML(html, baseURL)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLfromHTML bothRelativeandAbsolute', () => {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=la, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <a href="https://blog.boot.dev/">
            boot.dev Blog
        </a>
        <a href="/path/">
        boot.dev Blog
    </a>
    </body>
    </html>`
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLfromHTML(html, baseURL)
    const expected = ['https://blog.boot.dev/', 'https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLfromHTML invalidURL', () => {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=la, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <a href="invalid">
        boot.dev Blog
        </a>
    </body>
    </html>`
    const baseURL = 'https://blog.boot.dev'
    const actual = getURLfromHTML(html, baseURL)
    const expected = []
    expect(actual).toEqual(expected)
})

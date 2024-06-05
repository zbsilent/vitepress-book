# Fetch 



- 浏览器直接使用
- 跟xhr同级





```js
fetch(url, options).then(function(response) {
  // handle HTTP response
}, function(error) {
  // handle network error
})
```

```jsx
fetch(url, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "same-origin"
}).then(function(response) {
  response.status     //=> number 100–599
  response.statusText //=> String
  response.headers    //=> Headers
  response.url        //=> String

  return response.text()
}, function(error) {
  error.message //=> String
})
```

### Properties

- `status` (number) - HTTP response code in the 100–599 range
- `statusText` (String) - Status text as reported by the server, e.g. "Unauthorized"
- `ok` (boolean) - True if `status` is HTTP 2xx
- `headers` ([Headers](https://github.github.io/fetch/#Headers))
- `url` (String)

### Body methods

Each of the methods to access the response body returns a Promise that will be resolved when the associated data type is ready.

- `text()` - yields the response text as String
- `json()` - yields the result of `JSON.parse(responseText)`
- `blob()` - yields a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
- `arrayBuffer()` - yields an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
- `formData()` - yields [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) that can be forwarded to another request

### Other response methods

- `clone()`
- `Response.error()`
- `Response.redirect()`
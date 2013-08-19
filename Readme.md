# bund-cake

A JavaScript bundler and minifier for express.

The JavaScript outputs to /assets/bundle/[bundled-file].js

## Usage
In app.js, 
```
GLOBAL.bund = require('bund-cake')(app)
```

And this snippet of EJS in your view,

```
<%- bund.js('./public/javascripts/annoying-popups.js', './public/javascripts/one-weird-tip.js') %>
```

## Issues/Concerns
I haven't tested this with JS files from another domain or CDN.
The very first hit to the server is slow, but is okay after that.
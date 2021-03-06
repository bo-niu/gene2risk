import serialize from 'serialize-javascript';

export default function template(body, initialData, userData) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="shortcut icon" href="/icon.png">

      <title>Gene2Risk</title>
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <script src="https://apis.google.com/js/api:client.js"></script>
      <div id="root">${body}</div>
      <script>
        window.__INITIAL_DATA__ = ${serialize(initialData)}
        window.__USER_DATA__ = ${serialize(userData)}
      </script>
      <script src="/env.js"></script>
      <script src="/vendor.bundle.js"></script>
      <script src="/app.bundle.js"></script>

    </body>
  </html>
`;
}

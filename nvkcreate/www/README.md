# DESCRIPTION

Simple authentication bypass for the nvk_CREATE Reaper toolkit that uses a localhost https server, with a self-signed certificate, to send a validated response JSON payload.

The application script, inside of Reaper, uses bytecode from a pre-compiled Lua script to execute this procedure, however, the bytecode can be easily decompiled into a workable state
for analysis using this decompiler: 'https://github.com/viruscamp/luadec'.

For the authentication process, internally, the script defers a curl POST request, with flag 'k' enabled, to the operating system in order to
verify that the user's authentication key is valid. The authentication API endpoint is 'https://api.gumroad.com/v2/licenses/verify'.

The JSON payload returned from the authentication API must have the following keys and values:

- success:       true
- refunded:      false
- disputed:      false
- chargebacked:  false
- uses:          0
- quantity:      1
- message:       'anystringhere'

Inside of the product key prompt, the user can insert any value that is longer than 25 characters, since the localhost server will always return a successful result, however, the local key verification procedure will be skipped when the user's key is longer than 25 and the API returns a successful. If the user inserts a key less than 25 characters, the key will still be successfully authenticated, but will be verified remotely everytime the user starts the extension - which displays the annoying 'Thank You' pop-up dialog.

___

# Synopsis

1. Configure /etc/hosts to resolve requests to api.gumroad.com to the localhost.

```
127.0.0.1   api.gumroad.com
```

2. Prepare a self-signed server certificate.

```
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

3. Script a simple https web server that has a POST endpoint to '/v2/licenses/verify' and uses the self-signed certificate

4. Respond to requests with a successful JSON payload.

```json
{
    "success": true,
    "refunded": false,
    "disputed": false,
    "chargebacked": false,
    "uses": 0,
    "quantity": 1,
    "message": "opensourceftw"
}
```

4. Run the server on localhost, port 443.

___
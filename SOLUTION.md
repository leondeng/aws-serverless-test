#### Local CA setup
- install [mkcert](https://github.com/FiloSottile/mkcert)
```
$ brew install mkcert
```
- install rootCA
```
$ mkcert -install -cert-file dev-certs/cert.pem -key-file dev-certs/key.pem localhost 127.0.0.1 ::1
```
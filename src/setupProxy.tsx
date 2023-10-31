import express from 'express';
import { createProxyMiddleware} from 'http-proxy-middleware';

const app = express();

app.use('/DATA', createProxyMiddleware({ target: 'http://dev.aait.com.sa/CojectAuth/Security/Developer/Login', changeOrigin: true }));
app.listen(3000);
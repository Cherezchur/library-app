import fs from 'fs';
import os from 'os';

export default (req, res, next) => {
    const now = Date.now();
    const {url, method} = req;
    const data = `${new Date(now)} ${method} ${url}`;

    console.log(data);

    fs.appendFile('server.log', data + os.EOL, (err) => {
        if (err) throw err;
    })

    next();
}
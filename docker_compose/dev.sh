  
#!/bin/bash
cd /usr/app
npm install nodemon --global
npm install
nodemon -L --inspect=0.0.0.0 start.js

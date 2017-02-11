# uca_project
1. Install Node

	a. $sudo apt-get install nodejs
	
	b. $sudo ln -s /usr/bin/nodejs /usr/bin/node
	
	c. $sudo apt-get install npm

    d.$sudo apt-get install nginx

2. Install nodemon - $sudo npm install -g nodemon

3. run $npm install   - it will install required packages automatically (express and json body parser)
    OR try npm install --no-bin-links  if you get symlink error

4. run $node app.js and open browser http://localhost:8080/test 


#Benchmarking a web service
1. sudo apt-get apache2-utils
2. GET : $ab -c 10 -n 100 http://localhost:9090/student/
3. POST : $ab -T 'application/json'  -n 10 -p post.data http://localhost:8080/


#load balancing usin Enginx
1. apt-get install nginx
2. add below lines in /etc/nginx/sites-available/default
	upstream web_backend {
		server 10.11.12.51;
		server 10.11.12.52;
	}

	server {
		listen 80;
		location / {
			proxy_set_header X­Forwarded­For $proxy_add_x_forwarded_for;
			proxy_pass http://web_backend;
		}

	}

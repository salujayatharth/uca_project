# uca_project
1. Install Node

	a. $sudo apt-get install nodejs
	
	b. $sudo ln -s /usr/bin/nodejs /usr/bin/node
	
	c. $sudo apt-get install npm

    d.$sudo apt-get install nginx

2. Install nodemon - $sudo npm install -g nodemon

3. run $npm install   - it will install required packages automatically (express and json body parser)
    OR try npm install --no-bin-links  if you get symlink error

4. setup load balancing -
	Run following commands in your system
	$sudo apt-get install nginx
	$sudo cp /etc/nginx/sites-available/default cp /etc/nginx/sites-available/default_backup
	replace the contents of /etc/nginx/sites-available/default with this ->


upstream backend {
server localhost:8081;
server localhost:8082;
}
server {
listen 8080 default_server;
listen [::]:8080 default_server;
root /var/www/html;
# Add index.php to the list if you are using PHP
index index.html index.htm index.nginx-debian.html;

server_name main;

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		#try_files $uri $uri/ =404;
		proxy_pass http://backend;
	}
}


------------------------------------------------------------
5. run $sh ./run and open browser http://localhost:8080/test
	*changes will be automatically reflected - server is autorestart


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

# docker-dangling-http
A small node webservice to be used under HTTP load test. Use querystring parameters to modify how quickly (or not) the service responds.

### Usage
1. Clone repo, `cd docker-dangling-http`
1. Install dependencies, `npm i`
1. Run the app `./bin/start` or `node ./bin/start`
1. Make HTTP requests against the live service with the following querystring variables, which may be combined:

Querystring | Name | Example | Default | Description
--- | --- | --- | ---
d | Delay | /?d=30 | 0 | Seconds to delay before HTTP response is sent
r | Random | /?r=30 | 0 | Adds time to delay, randomly, up to provided value
e | Empty | /?e=1 | 0 | Prematurely breaks HTTP connection, with empty response

### Usage (Docker)

- Available on Docker Hub `docker pull bryanlatten/docker-dangling-http:latest`

### Example

Note: service is running locally (on `127.0.0.1:3000`) via `npm start`

- Request completed, immediately
```bash
$ curl 127.0.0.1:3000
[Response from 127.0.0.1]
  - not delayed
```

- Request completed, after 30 seconds delay
```bash
$ curl 127.0.0.1:3000/\?d=30
[Response from 127.0.0.1]
  - delayed 30s
```

- Request completed, minimum 10 seconds delay, with additional random 5 seconds
```bash
$ curl 127.0.0.1:3000/\?d=10\&r=5
[Response from 127.0.0.1]
  - adding 3s random delay (max 5s)
  - delayed 13s
```


- Request ended, broken, after 15 seconds delay
```bash
$ curl 127.0.0.1:3000/\?d=15\&e=1
curl: (52) Empty reply from server
```

Console log from the above request "broken" confirms:
```bash
Request from ::ffff:127.0.0.1, delayed 15s, prematurely breaking connection
```

### Load testing example

```bash
$ ab -c 3 -n 10 127.0.0.1:3000/\?d=1
```

Results:
```
This is ApacheBench, Version 2.3 <$Revision: 1796539 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient).....done


Server Software:
Server Hostname:        127.0.0.1
Server Port:            3000

Document Path:          /?d=1
Document Length:        40 bytes

Concurrency Level:      3
Time taken for tests:   4.009 seconds
Complete requests:      10
Failed requests:        0
Total transferred:      1380 bytes
HTML transferred:       400 bytes
Requests per second:    2.49 [#/sec] (mean)
Time per request:       1202.723 [ms] (mean)
Time per request:       400.908 [ms] (mean, across all concurrent requests)
Transfer rate:          0.34 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       0
Processing:  1002 1002   0.3   1002    1002
Waiting:     1001 1002   0.2   1002    1002
Total:       1002 1002   0.2   1002    1003

Percentage of the requests served within a certain time (ms)
  50%   1002
  66%   1002
  75%   1002
  80%   1002
  90%   1003
  95%   1003
  98%   1003
  99%   1003
 100%   1003 (longest request)
 ```

### Run with DC/OS (Marathon) or Kubernetes

 Responds to HTTP traffic from standard benchmarking tools (`ab`, `jmeter`, `gatling`, `locust.io`)

- `marathon.json`: sample DC/OS application definition
- `manifest.yaml`: sample Kubernetes Pod definition


# docker-dangling-http
A small node webservice to be used under HTTP load test. Use querystring parameters to modify how quickly (or not) the service responds.

### Usage
- Run container with its exposed web port, `docker run -p 3000:3000 bryanlatten/docker-dangling-http`

QS Variable | Example | Default | Description
--- | --- | --- | ---
d | /?d=30 | 0 | Seconds to delay before HTTP response is sent


### Use with DC/OS (Marathon) or Kubernetes

 Responds to HTTP traffic from standard benchmarking tools (`ab`, `jmeter`, `gatling`, `locust.io`)

- `marathon.json`: sample DC/OS application definition
- `manifest.yaml`: sample Kubernetes Pod definition

### Local Development

1. Clone repo, `cd docker-dangling-http`
1. Install dependencies, `npm i`
1. Run the app `./bin/start` or `node ./bin/start`

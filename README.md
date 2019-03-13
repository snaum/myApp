# Generic NodeJS web application

This application is designed to be a boilerplate with special emphasis paid to best practices and sound architecture design principles
Primarily among them: seperation of concerns and isolation of dependencies will allow for easy refactoring and replacing components as needed wth minimal code rewriting required.

The boiler plate application provides a few features:
* Data Backend
  provided by MongoDB and integrated using Mongoose library.
  future: implement ElasticSearch backend as proof of easy DB migration
* authentication
  provided by Passport library using simple local database table of users.
  future: implement oauth2.0 strategy as proof of easy refactoring.
* Cache
  provided by Reddis
* Logging
  TBD
* instrumentation and telemetry
  open zipkin
* Service dicovery
  provided by Consul
* Externalized config
  provided by Vault and Consul
* circuit breaker
  TBD (hystrix?)
* rate limiter
  bottleneck


notes:
12 factor app
https://12factor.net/

progressive web app (PWA)
https://hackernoon.com/object-create-in-javascript-fa8674df6ed2


https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e
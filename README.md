
#Connecting LoopBack to datasources on Rackspace

##MongoDB and LoopBack Node on Rackspace

![image](http://raw.github.com/mschmulen/connecting-nodejs-apps-to-data-on-rackspace/master/screenshots/ObjectRocket4Black2.png)

Data brings mobile applications to life and [MongoDB](http://www.mongodb.org/) is often a preferred choice for mobile first data.  MongoDB's powerful document oriented database combined with [Rackspace's MongoDB as a service platform ObjectRocket](http://www.objectrocket.com/) makes it easy to give your mobile stack a fast and reliable persistent data store in a matter of minutes.

###Standing up your Rackspace Node server

If you already have a LoopBack server running you can skip this section and go to configuring ObjectRocket.

Standing up a rackspace server with StrongLoop Node and Loopback is easy with Rackspace deployments.  You can find a full walk through on the [deploying LoopBack on Rackspace](http://strongloop.com/strongblog/deploying-loopback-mbaas-on-rackspace/) blog post.

Once you have your StrongLoop server running you can start binding your API to a data store.  StrongLoop has supported LoopBack connectors for:

- [Connecting LoopBack to MongoDB](http://)
- [Connecting LoopBack to OracleDB](http://)
- [Connecting LoopBack to MySQL](http://)

For this sample we are going to bind our LoopBack Mobile API tier to the ObjectRocket MongoDB hosted service.

ObjectRocket is the highly available, horizontally scalable, and consistently fast MongoDB service.

MongoDB as a service with ObjectRocket make it fast and simple to provision your MongoDB instance, build on a fast and reliable data platform and automate MongoDB administration.  Giving you an industrial-strength MongoDB platform that delivers performance and scalability for complex mobile data.

###Configuring ObjectRocket MongoDB as a service

Get up and running on the ObjectRocket in 4 steps. Check out their getting [started guide](http://docs.objectrocket.com/getting_started) for more detailed information.

1. Create an ObjectRocket account at [objectRocket.com](http://www.objectrocket.com/)

	![ create instance ](http://raw.github.com/mschmulen/connecting-nodejs-apps-to-data-on-rackspace/master/screenshots/signup.png)

1. Create a instance 

	![ create instance ](http://raw.github.com/mschmulen/connecting-nodejs-apps-to-data-on-rackspace/master/screenshots/createinstance.png)

1. Create a database

	![image](http://raw.github.com/mschmulen/connecting-nodejs-apps-to-data-on-rackspace/master/screenshots/adddatabase.png)

1. Add a ACL

	![ create instance ](http://raw.github.com/mschmulen/connecting-nodejs-apps-to-data-on-rackspace/master/screenshots/addacl.png)
	![image](http://raw.github.com/mschmulen/connecting-nodejs-apps-to-data-on-rackspace/master/screenshots/addacl2.png)

ObjectRocket supports both the [native MongoDB drivers](http://docs.objectrocket.com/native) as well as an [API](http://docs.objectrocket.com/api) so we can configure LoopBack to access the service via [LoopBacks MongoDB connector](http://docs.strongloop.com/loopback-connector-mongodb/).

#### Create your LoopBack API server

Out of the box LoopBack is configured to run with an 'in-memory' data store. If you launched your LoopBack instance from the Rackspace 'Deployments' panel then LoopBack has 3 starter models predefined : 'Products', 'Customers' and 'Locations'.  You can also create a LoopBack application from scratch with the [slc](http://) commands below.  These commands work regardless of a cloud, on-premises or developer machine instantiation.

Creating a LoopBack Node server with the following slc command line :

```
slc lb project loopback-node-server
cd loopback-node-server
slc install

slc lb model product
slc lb model customer
slc lb model location

```

###Connecting LoopBack to MongoDB

Configuring LoopBack to leverage MongoDB as the primary data store in 3 easy steps.

1. Add the MongoDB connector to your loopback app

```
slc install loopback-connector-mongodb --save
```

1. From within your LoopBack project ```~/loopback-node-server``` Configure the data source to connect to MongoDB by modifying the ```~/loopback-node-server/modules/db/index.js``` file.


Update index.js to use the MongoDB datastore configuration defined in you ObjectRocket instance configuration.

```
var loopback = require('loopback');

//module.exports = loopback.createDataSource({
//  connector: loopback.Memory
//});

module.exports = loopback.createDataSource({
  connector: require('loopback-connector-mongodb'),
  host: 'iad-c11-0.objectrocket.com',
  port: 48018,
  database: 'myDatabaseName',
  username: 'myDatabaseUser',
  password: 'myPassword'
});

```

1. restart/run your application.

```
slc run app.js
```

###Verify your connection 

Verifying your connection is simple with Loopback. Open a web browser to the loopback explorer page [http://localhost:3000/explorer](http://localhost:3000/explorer) and create a new instance of the 'product' type by selecting the 'POST' operation under 'Products'.

![image](http://raw.github.com/mschmulen/connecting-nodejs-apps-to-data-on-rackspace/master/screenshots/loopback-post-new-products.png)

{"name": "myProduct" , "price":22.22 , "inventory": 33}

Then click the "Try it out!" button.

You should see the resulting update in the 'Url', 'Body', 'Response' and 'Response Header' fields:

```
Request URL
	http://localhost:3000/products

Response Body

{
  "id": "528552f99bb9f75c45460c09",
  "name": "myProduct",
  "price": 22.22,
  "inventory": 33
}

Response Code
	200

Response Headers
	Access-Control-Allow-Origin: *
	Date: Thu, 14 Nov 2013 22:47:21 GMT
	Connection: keep-alive
	X-Powered-By: Express
	Content-Length: 98
	Content-Type: application/json; charset=utf-8

```

You can verify the data was persisted in the MonogDB Data store by restarting your server and then calling the products endpoint to return all instances of the 'product type'

[http://localhost:3000/products](http://localhost:3000/products)

You will then see the resulting response return your previously posted data from your ObjectRocket MongoDB data store.

```
[
	{
		"id": "528552f99bb9f75c45460c09",
		"name": "myProduct",
		"price": 22.22,
		"inventory": 33,
		"_id": "528552f99bb9f75c45460c09"
	}
]
```

###Mobilize your data

Now that you have a reliable and fast back end data store with a mobile API framework you can integrate your Native Mobile application with the Loopback iOS or Android SDK.  Make sure and check out our other posts on bringing your iOS and Android app to life with the data it needs.

###Conclusion

MongoDB is a great choice for mobile first data that is generated and consumed by the mobile client.  If you need to integrate legacy data from existing data stores sign up for the StrongLoop newsletter for future posts on integrating Oracle and MySQL data into your LoopBack mobile backend.


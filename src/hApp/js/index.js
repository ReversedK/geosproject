var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const HoloGeos = require("./libs/HoloGeos.js");

const hAppConfig = {
    instance_name: "test-instance",
    conductor_endpoint: 'http://localhost:8888'
}

var Geos;

async function init(){
 Geos = new HoloGeos()
 await Geos.setup(hAppConfig);
 
}
init();
// Create application/x-www-form-urlencoded parser
app.use(bodyParser.json({ extended: false }));
var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port   
   console.log("HoloGeos app listening at http://%s:%s", host, port)
})

/* ROUTES */
app.post('/find', async function (req, res) {
let result = await Geos.find(req.body.geohash,req.body.tags,req.body.context);
   res.send(result);
})

app.post('/findbycoords', async function (req, res) {
   let result = await Geos.findByCoords(req.body.coords,req.body.tags,req.body.context);
   res.send(result);
})


async function main() {
    let Geos = new HoloGeos();
    await Geos.setup();
    setTimeout(async () => {
        await Geos.addAService({
            "name": "context1",
            "tags": "tag1,tag2,tag3"
        }, {
            "geohash": "s1z0gs3y0zh7",
            "precision": 12
        });
    }, 1000);
    setTimeout(async () => {
        let r = await Geos.findByCoords({lat:10,lon:10}, ["tag"]);
               console.log("-----------------------------");
        console.log(r);
         console.log("-----------------------------");
    }, 3000);

        setTimeout(async () => {
        let r = await Geos.findByCoords({lat:10,lon:10}, ["tang"]);
         console.log("-----------------------------");
        console.log(r);
         console.log("-----------------------------");
    }, 3000);
}

//main();

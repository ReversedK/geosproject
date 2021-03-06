<<<<<<< HEAD
const HoloJs = require("./holojs.js");

var geohash = require('ngeohash');



/**
 * ContextualizedService {service, context, tags}
 */
class HoloGeos {
    constructor() {
        this.entities = [
          {name : "GeoHashElement", addr : "QmdQyv4kQ74dUeyLKpLP96DZMzEH7VaCqC5oNyFyfqmsCY"},
           {name:"ContextualizedService",addr:"QmPBA3A8fiJxocHsXwJCRQgqBSKUgfLMYTQfnvNMzfRKvR"}];
        this.config = {"min_precision": 5};
    }
    async setup(hAppConfig) {
        return this.entities.forEach(async (entity) => {
            this[entity.name] = new HoloJs(entity, hAppConfig)
            return await this[entity.name].setup();
        })
    }

    buildGeohashArray(geohash) {
    	let arr = [];
    	for(var i =this.config.min_precision;i<=15;i++) arr.push(this.geohashFromCoords(coords,i));
    		return arr;
    }

    geohashFromCoords(coords,precision){
    	console.log("coords",coords)
    	console.log(geohash.encode(coords.lat, coords.lon,precision))
    	return geohash.encode(coords.lat, coords.lon,precision)
    }
    /***
     *  geohash : {geohash,precision}
     *
     */
    async addAService(contextualizedService, geohash) {
      let self = this;
      const  service_promise =  new Promise(async function(resolve, reject) {
        // create service
      var service = await self.ContextualizedService.add(contextualizedService);
console.log("xxxxxxxxxxxxxx",service);
        resolve(service);
      })

      .then(async(service)=>{
            console.log("Fulfilled serviceEntity: ",service);
        // create geohashes and link them
        for (var prec = self.config.min_precision; prec <= geohash.precision; prec++) {
            let geohash_promise = new Promise(async function(resolve, reject) {
                let geoHashAtPrecision = geohash.geohash.substring(0,prec);
                var geoElement = await self.GeoHashElement.add({
                    "geohash": geoHashAtPrecision,
                    "precision": prec
                });
              resolve(geoElement);
          }).then(geoElement => {
          console.log("Fulfilled : ",geoElement);
           self.GeoHashElement.link_bidirectional(geoElement, service, "services", "services");
        }).catch(function (error) {
            console.log(error.message);
        });
      }

          });

        return true;
    }

    async findByCoords(coords, tags = [], context = {}){
    	return this.find(this.geohashFromCoords(coords),tags,context);
    }

    async find(geohash, tags = [], context = {}) {
    	if(typeof geohash == "string") geohash = [geohash];

        // get GeoElement
        var gh = await this.GeoHashElement.find({
            "and": {
                "geohash": {
                    "is": geohash
                }
            }
        });

        let search = {};
        if (tags.length) {
            search = {
                "and": {
                    "tags": { "contains": tags }
                }
            };
        }
        if(gh.items.length)
        return await this.GeoHashElement.findLinkedItems(gh.items[0].addr, "services", search);
    else return false;
    }
}


module.exports = HoloGeos;
=======
const HoloJs = require("./holojs.js");

var geohash = require('ngeohash');


/**
 * ContextualizedService {service, context, tags}
 */
class HoloGeos {
    constructor() {
        this.entities = [
          {name : "GeoHashElement", addr : "QmdQyv4kQ74dUeyLKpLP96DZMzEH7VaCqC5oNyFyfqmsCY"},
           {name:"ContextualizedService",addr:"QmPBA3A8fiJxocHsXwJCRQgqBSKUgfLMYTQfnvNMzfRKvR"}];
        this.config = {"min_precision": 5};
    }
    async setup(hAppConfig) {
        return this.entities.forEach(async (entity) => {
            this[entity.name] = new HoloJs(entity, hAppConfig)
            return await this[entity.name].setup();
        })
    }

    buildGeohashArray(geohash) {
    	let arr = [];
    	for(var i =this.config.min_precision;i<=15;i++) arr.push(this.geohashFromCoords(coords,i));
    		return arr;
    }

    geohashFromCoords(coords,precision){
    	console.log("coords",coords)
    	console.log(geohash.encode(coords.lat, coords.lon,precision))
    	return geohash.encode(coords.lat, coords.lon,precision)
    }
    /***
     *  geohash : {geohash,precision}
     *
     */

    async addAService(contextualizedService, geohash) {
        // create service
        var service = await this.ContextualizedService.add(contextualizedService);
        // create geohashes and link them
        for (var prec = this.config.min_precision; prec <= geohash.precision; prec++) {
            let geoHashAtPrecision = geohash.geohash.substring(0,prec);

            var geoElement = await this.GeoHashElement.add({
                "geohash": geoHashAtPrecision,
                "precision": prec
            });
            await this.GeoHashElement.link_bidirectional(geoElement, service, "services", "services");
        }
        return true;
    }

    async findByCoords(coords, tags = [], context = {}){
    	return this.find(this.geohashFromCoords(coords),tags,context);
    }

    async find(geohash, tags = [], context = {}) {
    	if(typeof geohash == "string") geohash = [geohash];

        // get GeoElement
        var gh = await this.GeoHashElement.find({
            "and": {
                "geohash": {
                    "is": geohash
                }
            }
        });

        let search = {};
        if (tags.length) {
            search = {
                "and": {
                    "tags": { "contains": tags }
                }
            };
        }
        if(gh.items.length)
        return await this.GeoHashElement.findLinkedItems(gh.items[0].addr, "services", search);
    else return false;
    }
}


module.exports = HoloGeos;
>>>>>>> 661b077971913c2df869c41b181d1ffb9bed8b82

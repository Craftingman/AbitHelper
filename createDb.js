const MongoClient = require("mongodb").MongoClient;
const xlsx = require("node-xlsx");
var log = require('./libs/log');
//const app = require("./app");

let vuziXlsx = xlsx.parse(`${__dirname}/db_excel/KONKURS_Universities_red.xlsx`)[0];



const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/abithelper", { useNewUrlParser: true, useUnifiedTopology: true});

//2 fill regions
/*
mongoClient.connect(function(err, client) {

  function fillRegions() {
    const db = client.db("abithelper");
    const regions = db.collection("regions");
    const vuzi = db.collection("vuzi");

    let regionsArr = [];


    vuzi.find().toArray(async function(err, results) {
      if(err) {
        log.error(err);
      } else {
        for (vuz of results) {
          if(!regionsArr.includes(vuz.regionFact)) {
            regionsArr.push(vuz.regionFact);
            await regions.insertOne({ name: vuz.regionFact, codes: [vuz.code]});
          } else {

            let regionObj = await regions.findOne( {name: vuz.regionFact} );
            regionObj.codes.push( vuz.code );
            await regions.updateOne( {name: vuz.regionFact}, { $set: { codes: regionObj.codes }});

          }
        }
        console.log(regionsArr);
        console.log("end");
        client.close();
      }

    });


  }

  if(err){
      return log.error(err);
  } else {
      fillRegions();
  }
});
*/

//fill konkurs
/*
mongoClient.connect(function(err, client){

  async function fillVuziDb() {
    const db = client.db("abithelper");
    const konkurs = db.collection("konkurs");

    for (let i = 5; i < vuziXlsx.data.length; i++) {
      let tempVuz = vuziXlsx.data[i];
      let tempVuzObj = {};
      tempVuzObj.osvitStup = tempVuz[0];
      tempVuzObj.spec = tempVuz[1];
      tempVuzObj.educationForm = tempVuz[3];
      tempVuzObj.vuzCode = tempVuz[5];
      tempVuzObj.allSubApps = tempVuz[7];
      tempVuzObj.budjSubApps = tempVuz[8];
      tempVuzObj.allMidPrior = tempVuz[10];
      tempVuzObj.recomended = tempVuz[38];
      tempVuzObj.budjPrior = tempVuz[39];

      tempVuzObj.minMidZno = tempVuz[40];
      tempVuzObj.midMidZno = tempVuz[41];
      tempVuzObj.maxMidZno = tempVuz[42];

      await konkurs.insertOne(tempVuzObj);
    }
    client.close();
  }
    if(err){
        return log.error(err);
    } else {
        fillVuziDb();
    }
});
*/

//fill specs
/*
mongoClient.connect(function(err, client) {

  function fillRegions() {
    const db = client.db("abithelper");
    const konkurs = db.collection("konkurs");
    const specs = db.collection("specs");

    let specsArr = [];


    konkurs.find().toArray(async function(err, results) {
      if(err) {
        log.error(err);
      } else {
        for (konkursPlace of results) {

          if(!specsArr.includes(konkursPlace.spec)) {
            specsArr.push(konkursPlace.spec);
            await specs.insertOne({ name: konkursPlace.spec, codes: [konkursPlace.vuzCode]});
          } else {
            let specObj = await specs.findOne( {name: konkursPlace.spec} );
            specObj.codes.push( konkursPlace.vuzCode );
            await specs.updateOne( {name: konkursPlace.spec}, { $set: { codes: specObj.codes }});

          }
        }
        console.log(specsArr);
        console.log("end");
        client.close();
      }

    });


  }

  if(err){
      return log.error(err);
  } else {
      fillRegions();
  }
});
*/

//fill konkurs

mongoClient.connect(function(err, client){

  async function fillVuziDb() {
    const db = client.db("abithelper");
    const konkurs = db.collection("konkurs");

    for (let i = 5; i < vuziXlsx.data.length; i++) {
      let tempVuz = vuziXlsx.data[i];
      let tempVuzObj = {};
      tempVuzObj.osvitStup = tempVuz[0];
      tempVuzObj.spec = tempVuz[1];
      tempVuzObj.educationForm = tempVuz[3];
      tempVuzObj.vuzCode = tempVuz[5];
      tempVuzObj.vuzName = tempVuz[6];
      tempVuzObj.allSubApps = tempVuz[7];
      tempVuzObj.budjSubApps = tempVuz[8];
      tempVuzObj.allMidPrior = tempVuz[10];
      tempVuzObj.recomended = tempVuz[38];
      tempVuzObj.budjPrior = tempVuz[39];

      tempVuzObj.minMidZno = tempVuz[40];
      tempVuzObj.midMidZno = tempVuz[41];
      tempVuzObj.maxMidZno = tempVuz[42];

      await konkurs.insertOne(tempVuzObj);
    }
    client.close();
  }
    if(err){
        return log.error(err);
    } else {
        fillVuziDb();
    }
});


//1 fill "vuzi" from excel
/*
mongoClient.connect(function(err, client){

  async function fillVuziDb() {
    const db = client.db("abithelper");
    const vuzi = db.collection("vuzi");

    for (let i = 1; i < vuziXlsx.data.length; i++) {
      let tempVuz = vuziXlsx.data[i];
      console.log(tempVuz);
      let tempVuzObj = {};
      tempVuzObj.name = tempVuz[0];
      tempVuzObj.code = tempVuz[1];
      tempVuzObj.mainCode = tempVuz[2];
      tempVuzObj.shortName = tempVuz[3];
      tempVuzObj.engName = tempVuz[4];
      tempVuzObj.donbass = tempVuz[5];
      tempVuzObj.fundYear = tempVuz[6];
      tempVuzObj.id = tempVuz[7];
      tempVuzObj.vuzFamily = tempVuz[8];
      tempVuzObj.vuzType = tempVuz[9];
      tempVuzObj.ownForm = tempVuz[10];
      tempVuzObj.mainOrgan = tempVuz[11];

      tempVuzObj.postIndexFact = tempVuz[12];
      tempVuzObj.koatyyFact = tempVuz[13];
      tempVuzObj.regionFact = tempVuz[14];
      tempVuzObj.cityFact = tempVuz[15];
      tempVuzObj.adressFact = tempVuz[16];

      tempVuzObj.postIndexUr = tempVuz[17];
      tempVuzObj.koatyyUr = tempVuz[18];
      tempVuzObj.regionUr = tempVuz[19];
      tempVuzObj.cityUr = tempVuz[20];
      tempVuzObj.adressUr = tempVuz[21];

      tempVuzObj.phoneNum = tempVuz[22];
      tempVuzObj.email = tempVuz[23];
      tempVuzObj.website = tempVuz[24];

      await vuzi.insertOne(tempVuzObj);
    }
    client.close();
  }
    if(err){
        return log.error(err);
    } else {
        fillVuziDb();
    }
});
*/

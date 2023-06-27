const Mongo = require('mongodb');
require('colors')
const uri =  "mongodb+srv://marmolosco:2j88j58y@airquality.he8vonb.mongodb.net/?retryWrites=true&w=majority";

const client = new Mongo.MongoClient(uri);

async function init() {
  try {
    await client.connect();
    console.log('Connected to db!');
  } catch (e) {
    console.log(e);
  }
}

init().catch(console.dir);

const database = client.db('test');
const collection = database.collection('data');



const cors = require('cors');

const insert = async (data) => {
  try {
    await client.db('test').collection('data').insertOne({type: data.type, value: data.value, source: data.source, date: new Date(Date.now())});
    console.log('added ' + data.type.cyan + ': ' + data.value);
  } catch (e) {
    console.log(e);
  }
}

const {SerialPort} = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const port= new SerialPort({path: 'COM3', baudRate: 9600});
const parser = new ReadlineParser();
port.pipe(parser);
// Read the port data
port.on("open", () => {
  console.log('connected to arduino');
});
parser.on('data', async (data) => {
  if (data && typeof data === 'string') {
    const type = data.split(' : ')[0];
    const value = data.split(' : ')[1];
    if (value) {
      await insert({type, value, source: 'Bari'});
    }
  }
});

const express = require('express');
const moment = require('moment');

const app = new express();
app.use(cors());

app.get('/data', async (req, res, next) => {
  try {
    const cursor = await collection.find({}).sort({date: -1}).limit(50);
    let array = []
    for await (const doc of cursor){
      array = [...array, doc];
    }
    return res.send(array);
  } catch (e) {
    console.log(e);
  }
});

app.listen(80, () => {
  console.log('listening on port 80');
});
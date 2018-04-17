"use strict"

const FaaS = require('openfaas')
const faas = FaaS('http://gateway:8080')

module.exports = function(context, callback) {

    faas.invoke(
        'youtube-dl', // function name
        context, // data to send to function
        false,
        true
    )
    .then(x => {

      faas.invoke(
        'gif-maker',
        x.body,
        false,
        true
      )
      .then( y => {
        process.stdout.write(y.body);
      })
      .catch(err => console.log(err));

    })
    .catch(err => console.log(err));

    //callback(undefined, {status: true});
}

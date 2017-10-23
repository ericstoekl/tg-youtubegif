"use strict"

const FaaS = require('openfaas')
const faas = FaaS('http://gateway:8080')
var TelegramBot = require('node-telegram-bot-api');

var telegramBotToken = env.BOT_TOKEN; // Add your own here
var telegramBot = new TelegramBot(telegramBotToken, {polling: false});    

var request = require('request');


module.exports = function(context, callback) {
    var fullContext = JSON.parse(context);
    var chatId = fullContext.message.chat.id;
    var text = fullContext.message.text;
    console.log("created vars");

    // Split text into array (separated by spaces)
    // arr[1] is the start time, arr[2] is the duration
    // Create a new object, send with faas.invoke
    var arr = text.split(" ");
    var gifObj = {};
    if (arr.length > 1) {
        gifObj.startTime = arr[1];
        gifObj.duration = arr[2];
    }

    faas.invoke(
        'youtube-dl', // function name
        text, // data to send to function
        false,
        true
    )
    .then(x => {
      telegramBot.sendMessage(chatId, "Got the video file...");

      gifObj.body = x.body;

      faas.invoke(
        'gif-maker',
        gifObj,
        false,
        true
      )
      .then( y => {
        telegramBot.sendMessage(chatId, "Got the gif file...");
        telegramBot.sendDocument(chatId, y.body);
      })
      .catch(err => console.log(err));

    })
    .catch(err => console.log(err));

    callback(undefined, {status: true});
}

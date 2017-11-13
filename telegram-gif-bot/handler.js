"use strict"

const fs = require('fs');
const FaaS = require('openfaas')
const faas = FaaS('http://gateway:8080')
var TelegramBot = require('node-telegram-bot-api');

//var telegramBotToken = fs.readFileSync('/run/secrets/BOT_TOKEN', 'utf8').trim();
var telegramBotToken = process.env.BOT_TOKEN;
console.log("1. \"" + telegramBotToken + "\"")
var telegramBot = new TelegramBot(telegramBotToken, {polling: false});    

  module.exports = function(context, callback) {
    var fullContext = JSON.parse(context);
    var chatId = fullContext.message.chat.id;
    var text = fullContext.message.text;

    faas.invoke(
      'youtube-dl', // function name
      text, // data to send to function
      false,
      true
    )
    .then(x => {
      telegramBot.sendMessage(chatId, "Got the video file...");

      faas.invoke(
        'gif-maker',
        x.body,
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

    callback(undefined, {status: "done"});
  }

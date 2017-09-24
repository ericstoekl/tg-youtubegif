"use strict"

var TelegramBot = require('node-telegram-bot-api');

var telegramBotToken = '443190428:AAFzm9ykoT8sL_Z-CwkwsYvL44skd_Ken-8';
var telegramBot = new TelegramBot(telegramBotToken, {polling: false});    

var request = require('request');


module.exports = function(context, callback) {
    var fullContext = JSON.parse(context);
    var chatId = fullContext.message.chat.id;
    var text = fullContext.message.text;
    console.log("created vars");

    const options = {
      method: 'POST',
      uri: 'http://gateway:8080/function/youtubedl',
      body: text,
      json: false,
      encoding: null
    }
    console.log("Created post req");

    request.post(options, function (error, response, body) {
      var bodyText = '' + body;
      bodyText = bodyText.substring(0, 55)

      console.log("error: " + error + ", bodyText: " + bodyText);

      telegramBot.sendMessage(chatId, "Got the video file...");

      request.post({
                        method: 'POST',
                        uri: 'http://gateway:8080/function/gif-maker',
                        body: body,
                        json: false,
                        encoding: null
                   }, function(error, response, body) {
                        if (!error) {
                          telegramBot.sendMessage(chatId, "Got the gif file...");
                          telegramBot.sendDocument(chatId, body);
                        } else {
                          telegramBot.sendMessage(chatId, "error in gif stage... " + err);
                        }
                      } 
      );

    });


    callback(undefined, {status: err});
}

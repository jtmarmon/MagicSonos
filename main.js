var Config = require("config-js");
var config = new Config("config.js");

var SONOS_IP = config.get('ip');

var Sonos = require('sonos').Sonos;
var sonos = new Sonos(SONOS_IP);

var WebSocket = require('ws');
var ws = new WebSocket('ws://127.0.0.1:7204/myo/1');

var locked = true;

ws.on('message', function(message) {
  message = '{' + message.substring(10, message.length-2) + '}';
  var data = JSON.parse(message);

  if(data.type === "pose") {
    console.log(data.pose);
    switch(data.pose){
      case "fingers_spread":
        toggleMusic();
        break;
      case "wave_in":
        previous();
        break;
      case "wave_out":
        next();
        break;
      case "thumb_to_pinky":
        toggleLock();
        break;

    }
  }
});
function toggleLock(){  
  locked = !locked;

  var vibrate = ["command", {"command":"vibrate", "myo": 1, "type": "short"}]; //@TODO: Doesn't vibrate for some reason.
  var message = JSON.stringify(vibrate);

   ws.send(message);
}
function toggleMusic(){
  if(locked) return;
  
  sonos.getCurrentState(function(err, state) {
    if(state == null) return;

    if(state === "paused"){
      console.log('playing');
      sonos.play(function(err, playing) {
        console.log([err, playing]);
      });  
    }
    else{
      console.log('pausing');
      sonos.pause(function(err){
      });
    }
  });
  
}
function next(){
  if(locked) return;
  // return;

  sonos.next(function(err, nexted){
  });

}
function previous(){
  if(locked) return;

  sonos.previous(function(err, nexted){
  });
}
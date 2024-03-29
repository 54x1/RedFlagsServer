// const io = require('socket.io')();
const { makeid } = require('./utils');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { flags } = require('socket.io/lib/namespace');
const cli = require('nodemon/lib/cli');
const { count } = require('console');
const { clearLine } = require('readline');

const publicPath = path.join(__dirname, '/frontend/');

let jsonData = require(path.join(__dirname, '/frontend/perks.json'));

// console.log(jsonData);
const port = process.env.PORT || 3000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

const users = {}
let rArr = []
let pp;
let flagState = []
let flagStateRand = []
let pperkss;
let gameData = []
let game = []
let voting

const clientRooms = {};
app.use(express.static(publicPath));
io.on('connection', client => {
  

  client.emit('socketio', client.id)
  client.on('removeCard', removeCardHandle)
  client.on('newUser', newUserHandle)
  client.on('userLeft', userLeftHandle)
  // client.on('keydown', handleKeydown);
  client.on('newGame', handleNewGame);
  client.on('joinGame', handleJoinGame);
  client.on('pperks', pperksHandle);
  client.on('newpperks', newpperksHandle);
  client.on('perks', perksHandle);
  client.on('newPerks', newPerksHandle);
  client.on('flag', handleFlag);
  client.on('unknown', handleUnknown);
// client.on('subFlagCard', subFlagCardHandle)
client.on('FlagCards', FlagCardsHandle)
client.on('newJoinFlag', newJoinFlagHandle)
client.on('newJoinFlagData', newJoinFlagDataHandle)
client.on('countFlags', countFlagsData)
client.on('player', playerData)
client.on('newRound', handleNewRound)
// client.on("playerDis", playerDis)
client.on("newRoundClear", newRoundClear)
client.on("voting", votingHandle)
client.on("leaderboard", leaderboardData)
// client.on('RandomCard', RandomCardData)
client.on('chooseWinner', chooseWinnerData )
client.on('isVoting', isVotingData)
client.on('timer', timerData)
client.on('newTimer', newTimerData)
client.on('newRoundClean', newRoundClean)
client.on('showFlag', showFlagHandle)

function showFlagHandle(newFlagArr, code){
  // client.emit('showFlag', newFlagArr)
  client.broadcast.to(code).emit('showFlag', newFlagArr)
}

function newRoundClean(code){
  flagState.filter(x=> x[0].code)
  client.emit('removeFlag')
}
function newTimerData(data){
  console.log("console", rArr, data[0], data[1])
  client.emit("testffz", rArr, data[0], data[1])
rArr.filter(d => d)
}
function isVotingData(voting, code, flags){
  console.log("voting", voting)
  // client.emit('isVotingData', voting, flags)
  client.broadcast.to(code).emit('isVotingData', voting, flags)
}
function chooseWinnerData(data){
  console.log("chooseWinnerDataa", data)
  client.broadcast.to(data[1]).emit('chooseWinnerDisplay', data[0])
}

function timerData(data){

    let r = genRandNum(data)
  // let rr = generateRandomBetween()
function genRandNum(){
  let min = 500;
  let max = 800;

  let rand =  Math.floor(Math.random() * (max - min)) + min;
  rArr.push({room:[{code:[{data},{rand}]}]})
    client.emit("randTime", rArr)
}


function generateRandomBetween (min, max, r) {

    let ranNum = Math.floor(Math.random() * (max - min)) + min;

    if (r === ranNum) {
        ranNum = generateRandomBetween((r+500), (max+500), r);
    }

    return ranNum;  

}







 
console.log("rrr", r)

// client.emit("randTime", r)
}

function RandomCardData (data){
console.log("RandomCardData", data)
if (data !== ""){
    let code = data.room[0]
    let cards = data.room[1]
    let user = data.room[2]
    let socketId = data.room[3]
// push data to global list 
  flagStateRand.push({room:[{code:[{code},{cards},{user}, {socketId}]}]})
  console.log("flagStatepushRand",  flagStateRand)
  codeStr = String(Object.values(code))
  console.log("codeStrRand", codeStr)
  client.emit('subFlagDataRandom', {room:[{code:[{code},{cards},{user}, {socketId}]}]})
  client.broadcast.to(codeStr).emit('subFlagDataRandom', {room:[{code:[{code},{cards},{user},{socketId}]}]})
}
}
function leaderboardData(data){
  console.log("leaderboardData", data.room[0].code)
  // client.emit("leaderboardDisplayData", data.room[1].user)
  client.broadcast.to(data.room[0].code).emit('leaderboardDisplayData',  data.room[1].user)
  data = ""
}
function newRoundClear(code){
 
  flagState = flagState.filter(e => e[0].code !== code)
 console.log("newRoundClear", flagState, code)

}

function votingHandle(voting, code){
  console.log("vvvdata", voting, code)

  voting = voting

  client.emit('vote', voting)
  client.broadcast.to(code).emit('vote', voting )

}
function handleJoinGame(roomName) {
  // votingHandle()
  console.log("clientSocket", users)
  const room = io.sockets.adapter.rooms[roomName];
console.log('room', room)

// console.log('data222', client.rooms)
// console.log('datazzz222', io.nsps['/'].adapter.rooms[roomName])


  let allUsers;
  if (room) {
    allUsers = room.sockets;
    console.log("allUsers", allUsers)
  }

  let numClients = 0;
  if (allUsers) {
    numClients = Object.keys(allUsers).length;
    console.log(numClients)
  }

  //  if ( votingHandle() === true){
  //   console.log("votingHandletrue")
  //     }

  if (numClients === 0) {
    client.emit('unknownCode');
    return;
  } else if (numClients > 4) {
    client.emit('tooManyPlayers');
    return;
  }
  else{
    clientRooms[client.id] = roomName;

    console.log('client', clientRooms[client.id])
  
    client.join(roomName);

  client.emit('init', roomName);
  }





}



function userLeftHandle(data){
console.log("datazzz", data)
}


function handleNewRound(code, d){
  console.log("d", d[0])
  handlePerks()
  console.log("pp", pp)
  client.emit('perks', pp);
  client.emit('newFlagCard')
  client.broadcast.to(code).emit('newFlagCard')
  client.broadcast.to(code).emit('perks', pp)
}
function handleNewGame() {
  var length = 6;
  let roomName = makeid(length);
    // let roomName = 1;
  clientRooms[client.id] = roomName;
  client.emit('gameCode', roomName);
  console.log("roomNamez", clientRooms[client.id])
  client.join(roomName);
  handlePerks()
  console.log("pp", pp)
  client.emit('perks', pp);


  client.number = 1;
  client.emit('init', roomName);
  // client.emit('perk', perks())
  // const clients = io.sockets.adapter.rooms[roomName].sockets;   

    console.log("users", users)
    client.emit('newUser', users)
    client.broadcast.to(roomName).emit('newUser', users)


}

function removeCardHandle(remCard, data){
  console.log("removeFlag", data, remCard)
  client.emit('removeFlag', remCard[1])
    client.broadcast.to(remCard[1]).emit('removeFlag', remCard[1])
  client.emit('removeCardSelf', remCard, data)
  client.broadcast.to(remCard[1]).emit('removeCard', remCard, data)
}

let prev = null
function checkss(number, data){
  if(number == prev){
    number = Math.floor(Math.random() * data) + 1
    console.log("cn2", number)
    return number
  }
   else{
      console.log('cn', num)
      prev = num
      return num
    }
}
function ss(data) {
  let number = Math.floor(Math.random() * data) + 1;

  if(number == prev){
    checkss(number, data)
  }
   else{
    prev = number
    
      return number     
    }
}
function countFlagsData(data){
  let userCount = 0
  let gameuser = []
  const room = io.sockets.adapter.rooms[data[1]];
  if(room){
  let players = Object.keys(room.sockets).length
  let flags =  data[0]
  let user =  data[2]
  console.log("flagdata", room)
console.log("flagusers", data[1], data[0])
  if (players == flags && players > 1){
  console.log("match")
  let userobj = Object.values(users)
  console.log("userobj", userobj)
  for ( i = 0; i < userobj.length; i++){
    if (userobj[i].gameCode ===  data[1] || userobj[i].code ===  data[1]){
      // userCount++
      // console.log("countTimes", userCount)
      gameuser.push(userobj[i])
  }
}
console.log(gameuser.length, data[0])
let s = ss(gameuser.length)
let startv
if (s == null){
  console.log(prev)
  startv = prev
}else{
  console.log(s)
    startv = s
}

startv--
    console.log("astartv", startv)
    console.log("gameuser", gameuser[startv].socketId, gameuser[startv], flagState )
    io.to(gameuser[startv].socketId).emit('startVote', flagState, gameuser[startv]);
// userCount = 0
gameuser = ""
}else{
  console.log("Try again")
}

  }

}

function newUserHandle(username){
  console.log("usernamevv1", username)
users[client.id] = username 

console.log("usernamez1", username.username.name)
client.emit('userEmit', username, client.id)
client.broadcast.to(username.code).emit('userJoinedDisplay', username.username.name)
client.emit('userJoined',  username.username.name)
username = ""

}

function newJoinFlagDataHandle(cards){
  console.log("newJoinFlagDataHandle", cards)
}

function newJoinFlagHandle(code){
  console.log("newJoinFlagHandle", voting, flagState.filter(f=>f[0].code === code))

    //if(flagState[0] != null){
//if (flagState){
  client.emit("testff", flagState.filter(f=>f[0].code === code) )
      client.emit('newFlagData', flagState.filter(f=>f[0].code === code), voting)
//}
//else{
//  client.emit('newFlagData', flagStateRand)
//}
  //  }
     
    // }else if (flagState != null){
    //   // codeStr = String(flagState.room[0].code[0].code.code)
    //   console.log("flagState != null")
    //   // client.emit('subFlagData', flagState)
    // }
}



function FlagCardsHandle(data, voting){
  console.log("subFlagDataHDCH", data)
  console.log('FlagCardsHandle', voting)
  client.emit('testff', voting)
  if (data.room[1].cards !== "" ){
      let code = data.room[0].code
      let cards = data.room[1].cards
      let user = data.room[2].user
      let socketId = data.room[3].socketId
// push data to global list 
    flagState.push([{code},{cards},{user},{socketId}])
    console.log("flagStatepush",  flagState[0])
    codeStr = String(code)
    console.log("codeStrzzz", codeStr)
     client.emit('subFlagDataSelf', {room:[{code:[{code},{cards},{user}, {socketId}]}]})
    client.broadcast.to(codeStr).emit('subFlagData', {room:[{code:[{code},{cards},{user},{socketId}]}]})
}
}
// function subFlagCardHandle(data){
//   console.log("subFlagDataSFCH", data)
//     if (data != null){
//       let code = data.room.code
//         let cards = data.room.cards
  
//       flagState.push({room:[{code:[{code},{cards}]}]})
//       console.log("flagStatezz", flagState)

//       console.log("flagStatezz", flagState)
//       // client.emit('subFlagData', flagState)
//   }else{
//     console.log('data === null')
//   }
// }
  function handleUnknown(){
    client.emit('unknownData', {data: "True"});
  }
  function handleFlag(data){
    if (data !== ""){
console.log('flagdatabkend', data)
client.emit('flagData', data);
  }
}

function handlePerks(){
  let data = jsonData;
    var randIn = Math.floor(Math.random() * (data.perks.length));
    var randIn2 = Math.floor(Math.random() * (data.perks.length));
    var perkData1 = (data.perks[randIn].card);
    var perkData2 = (data.perks[randIn2].card);
    var perks = [perkData1, perkData2];
    console.log(perks)
    pp = perks;
    return perks;
  // function perks(){
    
  // }
  // let pp = perks();
  // pperkss = pp;
  // 
  // return pp

 }

 function newPerksHandle(){
   console.log('here22')
  handlePerks()
  console.log('pp33', pp)
  client.broadcast.emit('newPerks', pp);
  client.emit('newPerks', pp);
}
function newpperksHandle(data){
console.log("dataNPH", data)
}

function pperksHandle(data){
  console.log("pp", pp)
console.log('is here after press new game/', data)
pperkss = pp
}

 function perksHandle(){
console.log('pperkss', pp)
client.emit('ppperks', pp)

 }
let playerdc;
let displayCode
 function playerData(displayUser, code){
   
   playerdc = displayUser
   displayCode = code
  client.broadcast.to(displayCode).emit('playerdc', playerdc);
   console.log('called playerDC', displayCode, playerdc)
   return displayCode, playerdc;
 }

function playerDis(code, disname){
  console.log('hhhere', code, disname)
// client.emit("playerdc", data)
// client.broadcast.to(code).emit('playerdc', disname)
return playerdc, disname;
} 
client.on('disconnect', ()=>{

  console.log('disconnect', String(Object.keys(users)))   
let name = Object.values(users)


// console.log('nameee1', users[client.id])
console.log("playerdccc", users[client.id])
if (users[client.id]){
  flagState = flagState.filter(e => e[0].code !== users[client.id].code)
client.broadcast.to(users[client.id].code).emit('playerdc', users[client.id].username.name)
}
delete users[client.id]
console.log('nameee2', name)

console.log("be4flagState", flagState)
let d = []
d.push(flagState)
    console.log("flagStateforeach",  d)
    client.emit('testff', d )
// flagState = ff
// }

// f[0].room[3].
client.emit('removeFlag', displayCode)
// console.log("res", res)
})
})

server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
})
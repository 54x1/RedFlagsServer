// let socket = io();
const socket = io('https://red-flags-54x1.netlify.app/')
let pppperksss;
let cards;
const username = {};
let displayUser;
let socketId;
let socketIdData;
let timerRand;
let d = [];
let da = [];
let pubFlags = [];
let thisFlag;
let voting;
let selected = false;
let showFlagData = [];
let userCardData
let votingUser
const gameScreen = document.getElementById("gameScreen");
const initialScreen = document.getElementById("initialScreen");
const loginSection = document.getElementById("login-section");
const newGameBtn = document.getElementById("newGameButton");
const joinGameBtn = document.getElementById("joinGameButton");
const loginGameBtn = document.getElementById("loginGameButton");
const gameCodeInput = document.getElementById("gameCodeInput");
const newPerks = document.getElementById("fa-redo");
const gamePerk1 = document.getElementById("perk1");
const gameCodeDisplay = document.getElementById("gameCodeDisplay");
const perk1 = document.getElementById("perk1");
const perk2 = document.getElementById("perk2");
newGameBtn.addEventListener("click", newGame);
newPerks.addEventListener("click", newPerksFunc);
usernameGen();
$(".loginForm").submit(function (e) {
  e.preventDefault();
});

// $('.public-flags').hide()

socket.on("socketio", socketio);

function socketio(data) {
  console.log("socket.io", data);
  socketId = data;
}
socket.on("init", init);
// socket.on('gameState', handleGameState);
// socket.on('gameOver', handleGameOver);
// socket.on('gameCode', handleGameCode);
socket.on("perks", handlePerks);
socket.on("ppperks", handlePPerks);
//socket.on('newPerks', handleNewPerks)

socket.on('unknownCode', handleUnknownCode);
socket.on('tooManyPlayers', handleTooManyPlayers);
// socket.on('flagData', flagData);
socket.on("subFlagData", subFlagData);
socket.on("subFlagDataSelf", subFlagDataSelf);
// socket.on("unknownData", unknownData)
// // socket.on("flagStateData", subFlagData)
socket.on("newFlagData", newFlagData);
// socket.on("userEmit", newUserData )
// socket.on("userLeft", displayName)
socket.on("startVote", startVoteData);
socket.on("removeCard", removeCard);
socket.on("removeCardSelf", removeCardSelf);
socket.on("newFlagCard", newFlagCard);
socket.on("playerdc", playerdc);
socket.on("removeFlag", removeFlagData);
socket.on("removeFlagSelf",removeFlagDataSelf)
socket.on("userJoined", userJoinedData);
socket.on("userJoinedDisplay", userJoinedDisplay);
// socket.on('leaderboardDisplayData', leaderboardDisplayData)
// socket.on("subFlagDataRandom", subFlagDataRandom);
// socket.on('subFlagDataRand', subFlagDataRandData)
socket.on("chooseWinnerDisplay", chooseWinnerDisplay);
socket.on("isVotingData", isVotingData);
socket.on("vote", vote)
socket.on("randTime", randTimeData)
socket.on('showFlag', showFlag)
socket.on('votingUserData', voteUser)
socket.on('checkIsVotingData', checkIsVotingHandle)
socket.on('testff', testff)


const queryString = window.location.search;
console.log(queryString);
const search = new URLSearchParams(queryString);
const code = search.get('code')
console.log(code);
function namesData() {
  var adjs = [
      "autumn",
      "hidden",
      "bitter",
      "misty",
      "silent",
      "empty",
      "dry",
      "dark",
      "summer",
      "icy",
      "delicate",
      "quiet",
      "white",
      "cool",
      "spring",
      "winter",
      "patient",
      "twilight",
      "dawn",
      "crimson",
      "wispy",
      "weathering",
      "blue",
      "billowing",
      "broken",
      "cold",
      "damp",
      "falling",
      "frosty",
      "green",
      "long",
      "lucky",
      "lingering",
      "bold",
      "little",
      "morning",
      "muddy",
      "old",
      "red",
      "rough",
      "still",
      "small",
      "sparkling",
      "throbbing",
      "shy",
      "wandering",
      "withering",
      "wild",
      "black",
      "young",
      "holy",
      "solitary",
      "fragrant",
      "aging",
      "snowy",
      "proud",
      "floral",
      "restless",
      "divine",
      "polishing",
      "ancient",
      "purple",
      "lively",
      "nameless",
    ],
    nouns = [
      "waterfall",
      "river",
      "breeze",
      "moon",
      "rain",
      "wind",
      "sea",
      "morning",
      "snow",
      "lake",
      "sunset",
      "pine",
      "shadow",
      "leaf",
      "dawn",
      "glitter",
      "forest",
      "hill",
      "cloud",
      "meadow",
      "sun",
      "glade",
      "bird",
      "brook",
      "butterfly",
      "bush",
      "dew",
      "dust",
      "field",
      "fire",
      "flower",
      "firefly",
      "feather",
      "grass",
      "haze",
      "mountain",
      "night",
      "pond",
      "darkness",
      "snowflake",
      "sliver",
      "sound",
      "sky",
      "shape",
      "town",
      "thunder",
      "violet",
      "water",
      "wildflower",
      "wave",
      "water",
      "resonance",
      "sun",
      "wood",
      "dream",
      "cherry",
      "tree",
      "fog",
      "frost",
      "voice",
      "paper",
      "frog",
      "smoke",
      "star",
    ];

  return (
    adjs[Math.floor(Math.random() * (adjs.length - 1))] +
    "-" +
    nouns[Math.floor(Math.random() * (nouns.length - 1))]
  );
}

function usernameGen() {
  var id = namesData() + new Date().getUTCMilliseconds();

  displayUser = id;
  $(".user span").html(displayUser);
  // let code = gameCodeDisplay.innerText
  // let username =  displayUser
  // let socketId = socket.id
  // socket.emit("newUser", { socketId, code , username });
  return id
}
$("#genNewUser, #genNewUserEntered").click(function () {
  usernameGen();
  console.log("clicked gen user")
});
if (code){
  usernameGen();
  $('#login-section').hide()
  $('#initialScreen').show()
  $('#gameCodeInput').val(code)
}

function testff(data) {
  console.log("datatestff", data)

}

function checkIsVotingHandle(data){
voting = data
console.log('votingzzz', data)
}

function showFlag() {

// console.log("testvoting1", newFlagArr)
// // if (voting === true){
// //   $('.public-flags').append("<div class='card-section text-center'>"+
// //   data.mfap(m=>m[0].room[0].code[1].cards)+"</div>")
// //   }else{
// //   console.log("datazzvv", data)
  
// //   }
// // return data
}


function vote(voting) {
 console.log("testvoting2", voting)
voting = voting
socket.emit("checkIsVoting", gameCodeDisplay.innerText, voting);
}

function randTimeData(data){
timerRand = data
}
function chooseWinnerDisplay(data) {
  votingUser = data
  console.log("voting_user", data);
  if ($('.user span').html() !== data){
  $(".red-flag-row").html(
    "<p class='red-flag-msg'><b>'" + data + "'" + " is choosing</b></p>"
  );
  }else{
    $(".red-flag-row").html(
      "<p class='red-flag-msg'><b>YOU are choosing</b></p>"
    ); 
  }


  if (voting === true && votingUser === $('.user span').html()){
    $(".public-flags .card-section").css({
      "background-color": "#c82333",
      "color": "white",
    });
  }

  console.log('daaa', da)
socket.emit('votingUser', votingUser, gameCodeDisplay.innerText, da)

}

function isVotingData(voting, data) {
  console.log("isVotingData1", $(".user span").html(), voting, data);
  if (voting === true){
    $('.public-flags>*').remove()
    data.filter(f=>f.room[0].code[2].user !== $(".user span").html() && f.room[0].code[0].code === gameCodeDisplay.innerText).map(f=>f.room[0].code[1].cards).map(m=> $('.public-flags').append("<div class='card-section text-center'>"+
   m +"</div>"))
   data.filter(f=>f.room[0].code[2].user === $(".user span").html() && f.room[0].code[0].code === gameCodeDisplay.innerText).map(f=>f.room[0].code[1].cards).map(m=> $('.public-flags').append("<div class='card-section text-center'>"+
   m +"</div>"))
   }else{
     console.log("elsedata", data)
   
   }

voting = voting
  socket.emit("voting", voting, gameCodeDisplay.innerText);
}
/*
function subFlagDataRandom(data) {
  console.log("called2", $(".user span").html());
  console.log("subFlagDataRandomzzz", data);
  // console.log('cards', $('.public-card-section .card-section').html())
  da.push(data);
  for (let i = 0; i < data.length; i++) {
    if (
      [...new Set(da)].filter(
        (cc) => cc[i][0].code.code === gameCodeDisplay.innerText
      ).length !== 0
    ) {
      $(".public-flags").css({ display: "flex" });
    }
    // console.log('here', d.length, data.length)
    [...new Set(da)]
      .filter(
        (cc) =>
          cc[i][0].code.code === gameCodeDisplay.innerText &&
          cc[i][2].user.user !== us
      )
      .map((m) =>
        $(".public-flags").append(
          '<div class="card-section text-center">' +
            m[i][1].cards.cards +
            "</div>"
        )
      );
  }
  // let b = pubFlags.filter(vv => vv)
  // $('.public-flags').append(
  // "<div class='card-section text-center'>"+
  // 	da.filter(bb => bb.room[0].code[0].code.code === gameCodeDisplay.innerText).filter(
  // 	bb=> !b.includes(
  // 		bb.room[0].code[1].cards.cards
  // 		))[0].room[0].code[1].cards.cards+
  // "</div>")

  $(".game-container").show();
  $(".flag-section").hide();
  cards = $(".card-section").html();
  // $('.home-section .public-flags').append("<div class='card-section text-center'>"+ $(this).html()+"</div>")
  console.log("cards", cards);
  let code = gameCodeDisplay.innerText;
  let user = $(".user span").html();
  // socket.emit("FlagCards", {
  //   room: [{ code }, { cards }, { user }, { socketId }],
  // });

  data = { room: [{ code }, { cards }, { user }, { socketId }] };
  console.log("dataz", data);
  $("#gameScreen .red-flag-row").html(
    "<p class='red-flag-msg'><b>Waiting on others </b></p>"
  );
  $(this).remove();
  let countFlags = $(".public-flags .card-section").length + 1;
  console.log("countFlag", countFlags);
  socket.emit("countFlags", [countFlags, gameCodeDisplay.innerText]);
}
*/

// function leaderboardDisplayData(data){
// let d = []
// d.push(data)
// console.log(d)
// // d.each(function(i){
// 	// console.log(d[i])

// // })
// 	$('.leaderboard-section ol').append("<li><mark>"+data+"</mark><small>0</small></li>")

// }
function userJoinedDisplay(data) {
  $(".alert>*").remove()
  $(".alert").fadeIn();

  $(".alert").append(
    "<div class='alert-success' role='alert'>" + data + " has joined</div>"
  );
  $(".leaderboard-section ol").append(
    "<li><mark>" + data + "</mark><small>0</small></li>"
  );
  console.log("userJoinedDisplay", data);
  $(".leaderboard-section li mark").each(function () {
    let user = $(this).text();
    let code = gameCodeDisplay.innerText;
    let room = { room: [{ code }, { user }] };
    socket.emit("leaderboard", room);
  });
  user = "";
  room = "";

  $(".alert-success")
    .fadeTo(1300, 300)
    .slideUp(300, function () {
      $(".alert-success").slideUp(300);
      $(".alert").hide(200);
    });
    

}

function userJoinedData(data) {
  let dd = [];
  dd.push(data);
  console.log("userJoinedData", dd);
  $(".leaderboard-section ol").append(
    "<li><mark><b>" + data + "</b></mark><small>0</small></li>"
  );
}

$(document).on("click", ".fa-trophy", function () {
  $(".game-container").hide();
  $(".leaderboard-section").show();
});

function removeFlagData(data) {
console.log('removeFlagDataz', data)
let newDa = da.filter(value => Object.keys(value).length !== 0)
 
console.log("dadada", da, newDa.filter(e => e.filter(f=>f.room[0].code[0].code !== data[1])));
 da = newDa.filter(ee => ee.includes(f=>f.room[0].code[0].code !== data[1]));
// a.forEach(f => da.splice(da.findIndex(e => e.room[0].code[0].code === f.room[0].code[0].code),1));

console.log("removeFlagData", da, newDa.filter(e => e.filter(f=>f.room[0].code[0].code !== data[1])));

}

function removeFlagDataSelf(data) {
  console.log('removeFlagDataSelf1', data, voting)
  let newDa = da.filter(value => Object.keys(value).length !== 0)
  
  console.log("removeFlagDataSelf2", da, newDa.filter(value => Object.keys(value).length !== 0), newDa
  
  // newDa.filter(ff=>ff.filter(f=>console.log("fff", f.room[0].code[0].code !== data[0])))
  );
da = newDa.filter(ff=>ff[0].room[0].code[0].code!== data[1])
// newDa.filter(ff=>ff.includes(f=>f.room[0].code[0].code !== data[1]));

// let empty = {room:[{code: code}, {voting: data}]}
socket.emit("checkIsVoting", gameCodeDisplay.innerText, voting)
  // a.forEach(f => da.splice(da.findIndex(e => e.room[0].code[0].code === f.room[0].code[0].code),1));
  
  console.log("removeFlagDataSelf3", da );
  
  }
function playerdc(data) {
  console.log("playerdc_here", data);

  // socket.emit('playerDis', displayUser)
  $(".alert").fadeIn();

  $(".alert").append(
    "<div class='alert-secondary' role='alert'>" +
    data +
      " has left</div>"
  );
  $(".alert-secondary")
    .fadeTo(1300, 300)
    .slideUp(300, function () {
      $(".alert-secondary").slideUp(300);
      $(".alert").hide(200);
    })
    $(".alert-secondary").fadeOut(1000)
  console.log("playerdc", data);
  // socket.emit("player", displayUser, gameCodeDisplay.innerText);
  console.log("pfunc", $(".leaderboard-section mark").text());

  $(".leaderboard-section mark").each(function () {
    if ($(this).text() === data) {
      $(this).parent().remove();
    }
  });
  displayUser = ""
}

function removeCard(remCard, data) {

  console.log("remdaat", String(remCard[0]), String(remCard[1]), remCard, data);
  console.log("bb[0]", String(remCard[0]));
  console.log("dd[1]", String(remCard[1]));
  console.log("cc[2]", String(remCard[2]));
  console.log("aa", $(".public-flags .card-section").text());
  $("#gameScreen .red-flag-row .red-flag-msg").html(
    "<b>Waiting on next round</b>"
  );
  if (String(remCard[2]).length >0){
  $("#gameScreen .public-flags").before(
    '<p class="red-flag-msg"><b>'+String(remCard[2])+' has the winning FLAG</b></p>')
  }
  else{
    $("#gameScreen .public-flags").before(
      '<p class="red-flag-msg"><b>'+String(remCard[2])+' has the winning FLAG</b></p>')
    }


    $('.public-flags>*').remove()
    $(".public-flags").append(
      '<div class="card-section text-center">' +
      String(remCard[0]) +
        "</div>"
    )
    // $(".public-flags .card-section").each(function () {
    // let remName = $(this).html();
   
    // if (remName !== String(remCard[0])) {
    //   console.log("card", $(this).html());
    //   $(this).remove();
    // }
  // });
}

function removeCardSelf(remCard, data) {
  // $('.red-flag-row').html('<div class="red-flag-section text-danger text-center"><p id="sign" style="cursor: pointer;"><i class="text-danger fas fa-plus"></i></p></div></div>')
  console.log("remdaat", remCard, data);
  console.log("bb[0]_self", String(remCard[0]));
  console.log("dd[1]_self", String(remCard[1]));
  console.log("cc[2]_self", String(remCard[2]));
  console.log("aa_self", $(".public-flags .card-section").text());
  // $('#gameScreen .red-flag-row .red-flag-msg').html("<b>Waiting on next round</b>")
  // $('#gameScreen .public-flags').before('<p class="red-flag-msg"><b>'+String(remCard[2])+' has the winner FLAG</b></p>')
  
  if (String(remCard[2]).length >0){
    $("#gameScreen .public-flags").before(
      '<p class="red-flag-msg"><b>'+String(remCard[2])+' has the winning FLAG</b></p>')
    }
    else{
      $("#gameScreen .public-flags").before(
        '<p class="red-flag-msg"><b>'+String(remCard[2])+' has the winning FLAG</b></p>')
    }
  $(".public-flags .card-section").each(function () {
    let remName = $(this).html();
    if (remName !== String(remCard[0])) {
      console.log("this", $(this).html());
      $(this).remove();
    }
  });

}

function newFlagCard() {
  $("#new-red-flags-next-game, .red-flag-msg").remove();
  let code = gameCodeDisplay.innerText;
  $.getJSON("flags.json", function (data) {
    console.log("dataflags", data);
    var randInt4 = Math.floor(Math.random() * data.flags.length);
    $(".flag-section .flags").append(
      '<div class="card-section text-center" data-toggle="modal" data-target="#exampleModal">' +
        data.flags[randInt4].card +
        "</div>"
    );
  });
  $("#sign").unbind("click");
  $("#sign").css({ cursor: "pointer" });
  $(".public-flags").hide();
  $(".public-flags .card-section").remove();
  $("#sign").html('<i class="text-danger fas fa-plus"></i>');
  console.log("end newflagcard here");

  $(".red-flag-row").html(
    '<div class="red-flag-section text-danger text-center"><p id="sign" style="cursor: pointer;"><i class="text-danger fas fa-plus"></i></p></div></div>'
  );
  socket.emit("newRoundClear", code);
  voting = false
  console.log("isVotingData2", voting);
  // socket.emit("isVoting", voting);

}

$(document).on("click", "#new-red-flags-next-game", function () {
   voting = false
   console.log("isVotingData3", voting);
   socket.emit("isVoting", voting);
  let code = gameCodeDisplay.innerText;
  console.log("fd", d)
  socket.emit("newRound", code, d);
  socket.emit("newRoundClear", code);
  // socket.emit('newTimer', [code, timerRand])
  console.log("clicked right here");
  $(this).remove();
  $(".red-flag-row").html(
    '<div class="red-flag-section text-danger text-center"><p id="sign" style="cursor: pointer;"><i class="text-danger fas fa-plus"></i></p></div></div>'
  );
  $("#new-red-flags-next-game").remove();
  $('.red-flag-msg').remove()
});

function startVoteData(data, gameuser) {
  voting = true;
  console.log("voting time", voting, data, gameuser );
socketIdData = gameuser.socketId
if (voting === true){
  // da.push(data)
  socket.emit("isVoting", voting, gameCodeDisplay.innerText, data);
  socket.emit('votingUser', votingUser,  gameCodeDisplay.innerText, data)
  $('.public-flags>*').remove()
  data.filter(f=>f.room[0].code[2].user !== $(".user span").html() && f.room[0].code[0].code === gameCodeDisplay.innerText).map(f=>f.room[0].code[1].cards).map(m=> $('.public-flags').append("<div class='card-section text-center'>"+
 m +"</div>"))
 data.filter(f=>f.room[0].code[2].user === $(".user span").html() && f.room[0].code[0].code === gameCodeDisplay.innerText).map(f=>f.room[0].code[1].cards).map(m=> $('.public-flags').append("<div class='card-section text-center'>"+
 m +"</div>"))

 }else{
   console.log("elsedata", data)
 
 }
  console.log('matching hereee')


  socket.emit("chooseWinner", [
    $(".user span").html(),
    gameCodeDisplay.innerText,
    data.filter(f=>f.room[0].code[0].code === gameCodeDisplay.innerText).map(m=>m.room[0].code[2].user)
  ]);

  $(".red-flag-row").html(
    '<p class="red-flag-msg"><b>Choose the winning FLAG</b></p>'
  );


socket.emit('voteUser',votingUser, data)
}
function voteUser(data, flag){
  console.log("voteuserzzzz", data, flag)
     $(document).on("click", ".public-flags .card-section", function(){

      console.log("data=", data, $(this).html())
      if ($('.user span').html() === data && $('.public-flags .card-section').css("background-color") === 'rgb(200, 35, 51)') {
        let cardz = $(this).html()
        let  newflag = da.filter(value => Object.keys(value).length !== 0)
//         console.log('zz' , flag.filter(value => value.filter(f=> f.room[0].code[0].code === gameCodeDisplay.innerText ) && Object.keys(value).length !== 0).length, flag.filter(value => value.filter(f=> f.room[0].code[0].code === gameCodeDisplay.innerText ) && Object.keys(value).length !== 0))
//         if (flag.filter(value => value.filter(f=> f.room[0].code[0].code === gameCodeDisplay.innerText ) && Object.keys(value).length !== 0).length > 0){
//  newflag = flag.filter(value => value.filter(f=> f.room[0].code[0].code === gameCodeDisplay.innerText ) && Object.keys(value).length !== 0)
//         }else{
          
        // }
  //  
        // let newflag = flag
    
        console.log("dataa_click", newflag, newflag.filter(f=>console.log("f", f)))
         console.log(
        newflag.filter(f=>f[0].room[0].code[0].code === gameCodeDisplay.innerText && f[0].room[0].code[1].cards === $(this).html()).map(m=>m[0].room[0].code[2].user)
        )
       
    // if (flag.filter(f=>f.room[0].code[0].code === gameCodeDisplay.innerText && f.room[0].code[1].cards === String(cardz)).map(m=>m.room[0].code[2].user).length > 0){
      let remCard = [cardz, gameCodeDisplay.innerText,      newflag.filter(f=>f[0].room[0].code[0].code === gameCodeDisplay.innerText && f[0].room[0].code[1].cards === $(this).html()).map(m=>m[0].room[0].code[2].user)];
      socket.emit("removeCard", remCard);
      console.log("remCard", remCard)
    // }
    
    
// 
if (voting === true){
        $(".public-flags .card-section").css({
          "background-color": "white",
          "color": "black",
        });
      }
      // }
        $("#new-red-flags-next-game, .red-flag-msg").remove();
        $("#gameScreen .red-flag-row").append(
          '<div id="new-red-flags-next-game" class="btn btn-danger"><span class="title">Next Round</span><i class="bottom-right fas fa-arrow-right"></i></div>'
        );
      }
        })

  }
function votingUserData(data){
  votingUser = data
  console.log("votingU", votingUser)

}


// function displayName(data){
// 	console.log("dataxxxx", data)
// }






// function newUserData(data, c){

// console.log("datac1 called", data.username.name, c)
// displayUser = data.username.name
// socket.emit('player', displayUser, gameCodeDisplay.innerText)
// }

function newFlagData(data, voting) {
  console.log("newFlagData11", data, voting);
  if (data){
  if (voting === true) {

     socket.emit("voting", voting);
    $("#sign").bind("click", function () {
      return false;
    });
    $("#sign").css({ cursor: "not-allowed" });
    $("#sign").html('<i class="text-secondary fas fa-plus"></i>');
  } else {
    $("#sign").unbind("click");
    $("#sign").css({ cursor: "pointer" });

  }
}

  console.log("vvote", voting, data);
  
  let us =  $(".user span").html()
	console.log("called1",  us)
  
	console.log('newFlagData', voting, data)
  da.push(data)


	
	// 	// console.log('here', d.length, data.length)
	// 	[...new Set(d)].filter(cc =>  cc[i][0].code.code === gameCodeDisplay.innerText  && cc[i][2].user.user !== us).map(
	// 	m =>   $('.public-flags').append("<div class='card-section text-center'>"+m[i][1].cards.cards+"</div>")
	// 	)
	// }
if (data){
  let  newDa = [...new Set(da)].filter(value => Object.keys(value).length !== 0);
  console.log('subFlagDataSelf_dddzz', newDa)
  if (newDa.filter(f=>f.filter(f=>f.room[0].code[2].user === $('.user span').html()).map(m=>m.room[0].code[1].cards)).length !== 0){
    $('.public-flags').css({"display":"flex"})
    }   
    
                $('.public-flags>*').remove()
        if (newDa.filter(f=>f.filter(f=>f.room[0].code[2].user === $('.user span').html()).map(m=>m.room[0].code[1].cards)).length > 0){
          console.log('datav2====')
          // $('.public-flags').append("<div class='card-section text-center'>"+
          // newDa.filter(f=>f.filter(f=>f.room[0].code[2].user === $('.user span').html()).map(m=>m.room[0].code[1].cards))+"</div>")  
          newDa.filter(f=>f.filter(f=>f.room[0].code[2].user === $('.user span').html()).map(m=>""+$('.public-flags').append("<div class='card-section text-center'>"+m.room[0].code[1].cards +"...</div>")+""))
        }
      if (newDa.filter(f=>f.filter(f=>f.room[0].code[2].user !== $('.user span').html()).map(m=>m.room[0].code[2].user)).length > 0){
        console.log('datav2====')
        newDa.filter(f=>f.filter(f=>f.room[0].code[2].user !== $('.user span').html()).map(m=>""+$('.public-flags').append("<div class='card-section text-center'>"+m.room[0].code[2].user +"'s FLAG</div>"))+"")
        }
  // let  newDa = [...new Set(da)].filter(value => Object.keys(value).length !== 0);

  // console.log('newFlagData_dddzz', newDa.filter(f=>f.filter(f=>f.room[0].code[0].code === gameCodeDisplay.innerText && f.room[0].code[1].cards)).length !== 0)
  

  //   if (newDa.filter(f=>f.filter(f=>f.room[0].code[0].code === gameCodeDisplay.innerText && f.room[0].code[1].cards)).length !== 0){
  // $('.public-flags').css({"display":"flex"})
  //        }

  //           $('.public-flags>*').remove()
  //   if (newDa.filter(f=>f.filter(f=>f.room[0].code[2].user === $('.user span').html()).map(m=>m.room[0].code[1].cards)).length > 0){
  //     $('.public-flags').append("<div class='card-section text-center'>"+
  //     newDa.filter(f=>f.filter(f=>f.room[0].code[2].user === $('.user span').html()).map(m=>m.room[0].code[1].cards))+"</div>")  
  //   }
  // if (newDa.filter(f=>f.filter(f=>f.room[0].code[2].user !== $('.user span').html()).map(m=>m.room[0].code[2].user)).length > 0){
  //   newDa.filter(f=>f.filter(f=>f.room[0].code[2].user !== $('.user span').html()).map(m=>""+$('.public-flags').append("<div class='card-section text-center'>"+m.room[0].code[2].user +"'s FLAG</div>"))+"")
  //   }
  }
}



function subFlagDataSelf(data) {

   if (data){
    console.log("subFlagDataSelfdata", data);

    da.push([data])
console.log('subFlagDataSelfda', da)
  //   $('.public-flags .card-section').each(function (){
  // pubFlags.push($(this).text())
  //   })
    
  let  newDa = [...new Set(da)].filter(value => Object.keys(value).length !== 0);
  console.log('subFlagDataSelf_dddzz', newDa)
    if (newDa.filter(f=>f.filter(f=>f.room[0].code[2].user === $('.user span').html()).map(m=>m.room[0].code[1].cards)).length !== 0){
      $('.public-flags').css({"display":"flex"})
    }   
    
                $('.public-flags>*').remove()
        if (newDa.filter(f=>f.filter(f=>f.room[0].code[2].user === $('.user span').html()).map(m=>m.room[0].code[1].cards)).length > 0){
          console.log('datav2====')
          // $('.public-flags').append("<div class='card-section text-center'>"+
          // newDa.filter(f=>f.filter(f=>f.room[0].code[2].user === $('.user span').html()).map(m=>m.room[0].code[1].cards))+"</div>")  
          newDa.filter(f=>f.filter(f=>f.room[0].code[2].user === $('.user span').html()).map(m=>""+$('.public-flags').append("<div class='card-section text-center'>"+m.room[0].code[1].cards +".</div>")+""))
        }
      if (newDa.filter(f=>f.filter(f=>f.room[0].code[2].user !== $('.user span').html()).map(m=>m.room[0].code[2].user)).length > 0){
        console.log('datav2====')
        newDa.filter(f=>f.filter(f=>f.room[0].code[2].user !== $('.user span').html()).map(m=>""+$('.public-flags').append("<div class='card-section text-center'>"+m.room[0].code[2].user +"'s FLAG</div>"))+"")
        }
  }
}
   


function subFlagData(data) {
    console.log("subFlagData", $(".user span").html());


    if (data){
      console.log("subFlagData2", data);
  

      da.push([data])
      console.log("subFlagDatada", da);
    //   $('.public-flags .card-section').each(function (){
    // pubFlags.push($(this).text())
    //   })
      
    let  newDa = [...new Set(da)].filter(value => Object.keys(value).length !== 0);
    console.log('subFlagData_dddzz', newDa)
      if (newDa.filter(f=>f.filter(f=> f.room[0].code[2].user === $('.user span').html()).map(m=>m.room[0].code[1].cards)).length > 0){
    $('.public-flags').css({"display":"flex"})
           }
  
              $('.public-flags>*').remove()
      if (newDa.filter(f=>f.filter(f=> f.room[0].code[2].user !== $('.user span').html()).map(m=>m.room[0].code[1].cards)).length > 0){
      console.log("datav1===", newDa.filter(f=>f.filter(f=>f.room[0].code[2].user !== $('.user span').html()).map(m=>m.room[0].code[1].cards)))
      newDa.filter(f=>f.filter(f=>f.room[0].code[2].user !== $('.user span').html()).map(m=>""+$('.public-flags').append("<div class='card-section text-center'>"+m.room[0].code[2].user +"'s FLAG</div>")+""))
     
      }
    if (newDa.filter(f=>f.filter(f=> f.room[0].code[2].user === $('.user span').html()).map(m=>m.room[0].code[2].user)).length > 0){
      console.log("datav1===", newDa.filter(f=>f.filter(f=>f.room[0].code[2].user === $('.user span').html()).map(m=>m.room[0].code[1].cards)))
      newDa.filter(f=>f.filter(f=>f.room[0].code[2].user === $('.user span').html()).map(m=>""+$('.public-flags').append("<div class='card-section text-center'>"+m.room[0].code[1].cards +".</div>")+""))
      }
    }

}

$(".leaderboard-section .fa-times").click(function () {
  $(".leaderboard-section").hide();
  $(".game-container").show();
});

function colorCountCards(RandCard) {
  $(".game-place .flags .card-section").each(function (i) {
    // let numCards = $('.game-place .flags .card-section').length
    // let RandCard = Math.floor(Math.random() * numCards) + 1
    setTimeout(function () {
      console.log(i);

      $(".game-place .flags .card-section:nth-child(" + (i + 1) + ")").css({
        "background-color": "#dae0e5",
        color: "rgb(200, 35, 51)",
      });

      $(".game-place .flags .card-section:nth-child(" + (--i + 1) + ")").css({
        "background-color": "white",
        color: "black",
        border: "3px solid #c82333",
      });
      if (i === 2) {
        $(".game-place .flags .card-section:nth-child(4)").css({
          "background-color": "#dae0e5",
          color: "rgb(200, 35, 51)",
        });
      } else if (i !== 2) {
        $(".game-place .flags .card-section:nth-child(4)").css({
          "background-color": "white",
          color: "black",
          border: "3px solid #c82333",
        });

        // console.log('here')
      }
    }, i * 100);
    setTimeout(function () {
      console.log(i);

      $(".game-place .flags .card-section:nth-child(" + (i + 1) + ")").css({
        "background-color": "#dae0e5",
        color: "rgb(200, 35, 51)",
        border: "3px solid #dae0e5",
      });

      $(".game-place .flags .card-section:nth-child(" + (--i + 1) + ")").css({
        "background-color": "white",
        color: "black",
        border: "3px solid #dae0e5",
      });
      if (i === 2) {
        $(".game-place .flags .card-section:nth-child(4)").css({
          "background-color": "#dae0e5",
          color: "rgb(200, 35, 51)",
          border: "3px solid #dae0e5",
        });
      } else if (i !== 2) {
        $(".game-place .flags .card-section:nth-child(4)").css({
          "background-color": "white",
          color: "black",
          border: "3px solid #dae0e5",
        });

        // console.log('here')
      }
    }, 400 + i * 100);
    //    console.log('iii',colorCountCardsTimer*i*2)
    setTimeout(function () {
      $(".game-place .flags .card-section").css({
        "background-color": "#dae0e5",
        color: "rgb(200, 35, 51)",
        border: "3px solid #dae0e5",
      });
    }, 800);

    setTimeout(function () {
      $(".game-place .flags .card-section").css({
        "background-color": "white",
        "rgb(200, 35, 51)": "black",
        border: "3px solid #dae0e5",
      });
    }, 1000);
    setTimeout(function () {
      $(".game-place .flags .card-section").css({
        "background-color": "#dae0e5",
        color: "rgb(200, 35, 51)",
        border: "3px solid #dae0e5",
      });
    }, 1200);

    setTimeout(function () {
      $(".game-place .flags .card-section").css({
        "background-color": "white",
        color: "black",
        border: "3px solid #dae0e5",
      });
    }, 1400);

    setTimeout(function () {
      $(".game-place .flags .card-section:nth-child(" + RandCard + ")").css({
        "background-color": "rgb(200, 35, 51)",
        color: "white",
        border: "3px solid #dae0e5",
      });
    }, 1600);
  });
}

function startTimer(duration) {
  let count = 0;
  let timer = duration;
  let minutes, seconds;
  let numCards = $(".game-place .flags .card-section").length;
  let RandCard = Math.floor(Math.random() * numCards) + 1;

  let setTime = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    $(".time").text("Select a Red Flag " + minutes + ":" + seconds);

    if (--timer === -1 && selected === false) {
      $(".time").text("Waiting for others");
      $(".flags .card-section").bind("click", function () {
        return false;
      });
      $(".flags .card-section").css({ cursor: "not-allowed" });
      clearInterval(setTime);
      colorCountCards(RandCard);
    }

    if (timer === 8 && count === 0 && selected === false) {
      if (confirm("More Time?") == true) {
        timer = 20;
        count++;
      } else {
        console.log("no extra time");
      }
    }

    if (timer === -1 && selected === false) {
      let numCards = $(".game-place .flags .card-section").length;
      let RandCard = Math.floor(Math.random() * numCards) + 1;
      console.log("timer", timer);
      let Rcards = $(
        ".game-place .flags .card-section:nth-child(" + RandCard + ")"
      ).text();
      let cards = Rcards;
      let code = gameCodeDisplay.innerText;
      let user = $(".user span").html();
      setTimeout(function () {
        socket.emit("RandomCard", {
          room: [{ code }, { cards }, { user }, { socketId }],
        });

        let data = { room: [{ code }, { cards }, { user }, { socketId }] };
        console.log("dataRandz", data);
      }, 3000);
    }
  }, 1000);
}

$(document).on("click", ".fa-plus", function () {
  $(".game-container").hide();
  $(".flag-section").show();
  $(".public-flags").css({ display: "flex" });
  $(".perk1").html(perk1.innerText);
  $(".perk2").html(perk2.innerText);

  let time = 5;
//   startTimer(time);
});

$(document).on("click", ".game-place .flags .card-section ", function () {
   thisFlag = $(this).text()
   if($('.modal-footer .confirm').length < 1){
 $('.modal-footer').append('<button type="button" class="btn confirm btn-danger" data-dismiss="modal">Confirm</button>')
 }
 
})
 $(document).on("click", ".cancel", function () {
  console.log('emptythisFlag')
  })
  
  $(document).on("click", ".modal-content:not('.modal.fade.show')", function () {
    console.log("herere")
  });

$(document).on("click", ".confirm", function () {
  socket.emit('timer', gameCodeDisplay.innerText)
  if (thisFlag !== ""){
  console.log("timer", timerRand)
let timerrr;
$("timerRand").each(function (i){
var difference =  Math.abs(i-i[i]);
console.log("difference", difference)
})
 function genRandNum(){
  let min = 500;
  let max = 800;

  let rand =  Math.floor(Math.random() * (max - min)) + min;
    return rand
}
 if ( genRandNum() < timerRand-300 || genRandNum() < timerRand+300 ){
  timerrr = timerRand
 }
 else{
     timerrr = genRandNum() + 300
 }
 


    
      
      console.log("selected", selected);
      $(".game-container").show();
      $(".flag-section").hide();
      cards = thisFlag;
      // $('.home-section .public-flags').append("<div class='card-section text-center'>"+ $(this).html()+"</div>")
      console.log("cards", cards);
      $(".red-flag-row").html(
        '<p class="red-flag-msg"><b>Waiting for others</b></p>'
      );

      let code = gameCodeDisplay.innerText;
      let user = $(".user span").html();
        console.log('confirmvvv', voting)
socket.emit('FlagCards', {room:[{code},{cards},{user}, {socketId}]}, voting)
// socket.emit('FlagCards', {room:[{code},{cards},{user}, {socketId}]}, voting)

      let data = { room: [{ code }, { cards }, { user }, { socketId }] };
      console.log("dataz", data);
      // socket.emit('subFlagCard', data)
      $("#sign").bind("click", function () {
        return false;
      });
      $("#sign").css({ cursor: "not-allowed" });
      $("#sign").html('<i class="text-secondary fas fa-plus"></i>');


     $('.flag-section .card-section').each(function (){
      if($(this).text() === cards){
        $(this).remove()
      }
     })     
      setTimeout(() => {
      let countFlags = $('.public-flags .card-section').length;

      socket.emit("countFlags", [countFlags, gameCodeDisplay.innerText]);
      console.log('countFlags', countFlags)
    }, timerrr);

  }
});


// gone
$(document).on("click", ".fa-times-circle", function () {
  if (confirm("Are You Sure?") == true) {
    socket.emit("flag", $(".red-flag-section .card-section").html());

    console.log("hereflag", $(".red-flag-section .card-section").html());
    $(this).remove();
    $(".red-flag-section .card-section, #sign").remove();

    $(".flags .card-section").css({ "pointer-events": "auto" });
    $(".flags .card-section").css({ cursor: "pointer" });
  }
});

// function flagData(data){
// 	$(".flags").children().unbind('click');
// 	console.log("flagdatafrontend", data)
// 	$(".home-section .public-flags").append("<div class='card-section'>"+data+"</div>")
// }

// let prev = null
// function checkss(number, data){
// 	if(number == prev){
// 		number = Math.floor(Math.random() * data) + 1
// 		console.log("cn2", number)
// 		return number
// 	}
// 	 else{
// 			console.log('cn', num)
// 			prev = num
// 			return num
// 		}
// }
// function ss(data) {
// 	let number = Math.floor(Math.random() * data) + 1;

// 	if(number == prev){
// 		checkss(number, data)
// 	}
// 	 else{
// 		prev = number

// 			return number
// 		}
// }

function handleNewPerks(data) {
  let countFlags = $(".public-flags .card-section").length + 1;
  let s = ss(2);

  if (s == null) {
    console.log(prev);
  } else {
    console.log(s);
  }

  // console.log("data", data)
  let perks = data;
  perk1.innerText = perks[0];
  perk2.innerText = perks[1];
}

// console.log();
function newGame() {

  socket.emit("newGame");

  // perk();
}

function newPerksFunc() {
  socket.emit("newPerks");
  // perk1.innerText = perks[0];
  // perk2.innerText = perks[1];
  // pppperksss = perks
  // console.log('heeh', pppperksss)

  // socket.emit('newpperks', pppperksss);
}

// function unknownData(data){

// if (data != 'True'){
// 	console.log('dataun', data);
// }
// return data
// }

// function getRandomInt(userCount) {
//   console.log(Math.floor(Math.random() * (userCount+1)))
//   return Math.floor(Math.random() * (userCount+1));

// }

$(loginGameBtn).on("click", function () {
  // let userCount = 1
  // getRandomInt(userCount)
  user = displayUser;
  console.log("displayUserlgbtn", displayUser);
  if (user) {
    loginSection.style.display = "none";
    initialScreen.style.display = "block";
    username["name"] = user;
    console.log("username", username);
  }
});
$(joinGameBtn).on("click", function () {
  user = displayUser;
  console.log("displayUserjgbtn", displayUser);
  username["name"] = user;
  console.log("username", username);
  const code = gameCodeInput.value;
  console.log("votinginit", voting)
  socket.emit("joinGame", code, voting);
});

function handlePPerks(pperks) {
  let perks = pperks;
  console.log("pppperkssshh", pperks);
  perk1.innerText = perks[0];
  perk2.innerText = perks[1];
  console.log("hiih", perks);
}

let playerNumber;
let gameActive = false;

function init(roomName, voting) {
  let url = `/?code=${roomName}`
window.history.pushState({ path: url }, '', url);
  
  const code = roomName;
  $(gameCodeDisplay).html(roomName);
  $(perk1).html($(gamePerk1).val());
  socket.emit("perks");
let username = displayUser
  let socketId = socket.id;
  socket.emit("newUser", { socketId, code, username });
  console.log("votingin", voting)
  socket.emit("newJoinFlag", code, voting);

  initialScreen.style.display = "none";
  gameScreen.style.display = "block";
  //
  // canvas = document.getElementById('canvas');
  // ctx = canvas.getContext('2d');
  //
  // canvas.width = canvas.height = 600;
  //
  // ctx.fillStyle = BG_COLOUR;
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  //
  // document.addEventListener('keydown', keydown);

  $.getJSON("flags.json", function (data) {
    // console.log(data);
    var randInt = Math.floor(Math.random() * data.flags.length);
    var randInt2 = Math.floor(Math.random() * data.flags.length);
    var randInt3 = Math.floor(Math.random() * data.flags.length);
    var randInt4 = Math.floor(Math.random() * data.flags.length);
    $(".flags >.card-section:first-child").html("").append(data.flags[randInt].card);
    $(".flags >.card-section:nth-child(2)").html("").append(data.flags[randInt2].card);
    $(".flags >.card-section:nth-child(3)").html("").append(data.flags[randInt3].card);
    $(".flags >.card-section:last-child").html("").append(data.flags[randInt4].card);
    // $('.card-section>p:nth-child(3)').append(data.flags[randInt2].card);
  });

  // $.getJSON("perks.json",function(data){
  //     var randIn = Math.floor(Math.random() * (data.perks.length + 1));
  //     var randIn2 = Math.floor(Math.random() * (data.perks.length + 1));
  //     // getPerks(randIn, randIn2, data);
  //
  //
  //     console.log(data);
  //     // alert('heree1');
  //
  // });

  // $.getJSON('perks.json', function(data) {
  // console.log(data);
  //
  // });
}

function handleGameCode(gameCode) {
  gameCodeDisplay.innerText = gameCode;
  let socketId = socket.id;
  // socket.emit('newUser', {socketId, gameCode, username})
}

function handlePerks(perks) {
  perk1.innerText = perks[0];
  perk2.innerText = perks[1];
  pppperksss = perks;
  console.log("heeh", pppperksss);

  socket.emit("pperks", pppperksss);
}

// function handleGameCode1(gameCode1){
// $.getJSON("perks.json",function(data){
//     var randIn = Math.floor(Math.random() * (data.perks.length));
//     var randIn2 = Math.floor(Math.random() * (data.perks.length));
//     $('body').append('perkData');
// });
// }
function handleUnknownCode() {
  reset();

  socket.emit("unknown");
  alert("Unknown Room Code");
}

function handleTooManyPlayers() {
  alert("This room is full!\nCreate new game!");
  reset();
}

function reset() {
  playerNumber = null;
  // $('.perk1, .perk2').html('');
  gameCodeInput.value = "";
  initialScreen.style.display = "block";
  gameScreen.style.display = "none";
}


socket.on("disconnect", () => {
console.log("disss", displayUser)
  console.log("disconnect", $('.user span').html());
  socket.emit("newRoundClear", gameCodeDisplay.innerText);
  // socket.emit('playerDis', displayUser)
  $(".alert").fadeIn();

  $(".alert").append(
    "<div class='alert-secondary' role='alert'>YOU have left the game!</div>"
  );
  // $(".alert-secondary")
  //   .fadeTo(1300, 300)
  //   .slideUp(300, function () {
  //     $(".alert-secondary").slideUp(300);
  //     $(".alert").hide(200);
  //   });
    // $(".alert-secondary").fadeOut(1000)  
  socket.emit("player", displayUser, gameCodeDisplay.innerText);
  // window.location = '/'
});

var data = [];
var activation = 0
var day = 1
var dayStart = Date.now()
var beamState = "B"
var order = 1
var answer = []
var score = 0
var pxURL = window.location.href
var pxID = getID(window.location.href)
var shipped = 0
var shipDefect = 0
var throwGoods = 0
var scoreToday 
var shippedToday
var shipDefectToday
var throwGoodsToday


// beam movements

var beam = document.body.querySelector("div.beam-balance")
var beamL = document.body.querySelector("div.left-balance")
var beamR = document.body.querySelector("div.right-balance")

var countR = 1

function beamRotate(side, steps){

    if (side == "right"){
        angInit = 0
        angEnd = 20
        yInit = 0
        yEnd = 40
    } else if (side == "left"){
        angInit = 0
        angEnd = -20
        yInit = 0
        yEnd = -40
    }


    angDiff = angEnd - angInit
    angSpeed = angDiff/steps

    angPos = angInit + countR * angSpeed
    beam.style.transform = `translate(${0}px, ${0}px) rotate(${angPos}deg)`
    beam.style.transformOrigin = "50% 50%"

    yDiff = yEnd - yInit
    ySpeed = yDiff/steps

    yPos = yInit + countR * ySpeed;

    beamL.style.transform = `translate(${0}px, ${-yPos}px) rotate(${0}deg)`;
    beamR.style.transform = `translate(${0}px, ${yPos}px) rotate(${0}deg)`;

    countR += 1

    if (angPos != angEnd) {

        requestAnimationFrame(function(){ // call requestAnimationFrame 

            beamRotate(side, steps)
        })


    } else {

        countR = 1

    }

}

function beamRotateBack(side, steps){

    if (side !== "B"){
        if (side == "R"){
            angInit =20
            angEnd = 0
            yInit = 40
            yEnd = 0
        } else if (side == "L"){
            angInit = -20
            angEnd = 0
            yInit = -40
            yEnd = 0
        }
    
    
        angDiff = angEnd - angInit
        angSpeed = angDiff/steps
    
        angPos = angInit + countR * angSpeed
        beam.style.transform = `translate(${0}px, ${0}px) rotate(${angPos}deg)`
        beam.style.transformOrigin = "50% 50%"
    
        yDiff = yEnd - yInit
        ySpeed = yDiff/steps
    
        yPos = yInit + countR * ySpeed;
    
        beamL.style.transform = `translate(${0}px, ${-yPos}px) rotate(${0}deg)`;
        beamR.style.transform = `translate(${0}px, ${yPos}px) rotate(${0}deg)`;
    
        countR += 1
    
        if (angPos != angEnd) {
    
            requestAnimationFrame(function(){ // call requestAnimationFrame 
    
                beamRotateBack(side, steps)
            })
    
    
        } else {
    
            countR = 1
    
        }
    }

    beamState = "B"

}



function beamReset(){

    beam.style.transform = `translate(${0}px, ${0}px) rotate(${0}deg)`
    beam.style.transformOrigin = "50% 50%"

    beamL.style.transform = `translate(${0}px, ${0}px) rotate(${0}deg)`;
    beamR.style.transform = `translate(${0}px, ${0}px) rotate(${0}deg)`;

    beamState = "B"

}

// chemical movements
const chem1 = document.getElementById("chem1");
const chem2 = document.getElementById("chem2");
const chem3 = document.getElementById("chem3");
const chem4 = document.getElementById("chem4");
const chem5 = document.getElementById("chem5");
const chem6 = document.getElementById("chem6");
const chem7 = document.getElementById("chem7");
const chem8 = document.getElementById("chem8");
const chem9 = document.getElementById("chem9");
const chem10 = document.getElementById("chem10");
const chem11 = document.getElementById("chem11");
const chem12 = document.getElementById("chem12");

const boxL = document.getElementById("left-balance-box");
const boxR = document.getElementById("right-balance-box");
const boxB = document.getElementById("bin");

const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const box4 = document.getElementById("box4");
const box5 = document.getElementById("box5");
const box6 = document.getElementById("box6");
const box7 = document.getElementById("box7");
const box8 = document.getElementById("box8");
const box9 = document.getElementById("box9");
const box10 = document.getElementById("box10");
const box11 = document.getElementById("box11");
const box12 = document.getElementById("box12");
const box13 = document.getElementById("box13");
const box14 = document.getElementById("box14");
const box15 = document.getElementById("box15");
const box16 = document.getElementById("box16");


var chemWeight = {chem1:1, chem2:1,chem3:1,chem4:1, chem5:1,chem6:1,chem7:1, chem8:1,chem9:1,chem10:1,chem11:1,chem12:1}
var chemWeightKeys = Object.keys(chemWeight)
var chemState = {chem1:0, chem2:0,chem3:0,chem4:0, chem5:0,chem6:0,chem7:0, chem8:0,chem9:0,chem10:0,chem11:0,chem12:0}
var chemStateKeys = Object.keys(chemState)
var chemLocation = {chem1:"M", chem2:"M",chem3:"M",chem4:"M", chem5:"M",chem6:"M",chem7:"M", chem8:"M",chem9:"M",chem10:"M",chem11:"M",chem12:"M"}
var chemLocationKeys = Object.keys(chemLocation)
var leftState = {boxL1:0, boxL2:0,boxL3:0,boxL4:0, boxL5:0,
                boxL6:0, boxL7:0,boxL8:0,boxL9:0, boxL10:0,boxL11:0, boxL12:0}
var leftStateKeys = Object.keys(leftState)
var rightState = {boxR1:0, boxR2:0,boxR3:0,boxR4:0, boxR5:0,
    boxR6:0, boxR7:0,boxR8:0,boxR9:0, boxR10:0,boxR11:0, boxR12:0}
var rightStateKeys = Object.keys(rightState)
var mainState = {box1:0, box2:0,box3:0,box4:0, box5:0,
    box6:0, box7:0,box8:0,box9:0, box10:0, box11:0,box12:1,box13:0, box14:0,box15:0, box16:0}
var mainStateKeys = Object.keys(mainState)
var binState = {boxB1:0, boxB2:0,boxB3:0,boxB4:0, boxB5:0,
    boxB6:0}
var binStateKeys = Object.keys(binState)

chem9.classList.add("hide")
chem10.classList.add("hide")
chem11.classList.add("hide")
chem12.classList.add("hide")

chemState = {chem1:0, chem2:0,chem3:0,chem4:0, chem5:1,chem6:1,chem7:1, chem8:1,chem9:0,chem10:0,chem11:0,chem12:0}
chemMove(chemState, "L", track = 0)
chemState = {chem1:0, chem2:0,chem3:0,chem4:0, chem5:1,chem6:1,chem7:1, chem8:1,chem9:0,chem10:0,chem11:0,chem12:0}
chemMoveMain(chemState, "box6", track = 0)
chemMoveMain(chemState, "box7", track = 0)
chemMoveMain(chemState, "box8", track = 0)
chemMoveMain(chemState, "box9", track = 0)
    
chemState = {chem1:0, chem2:0,chem3:0,chem4:0, chem5:0,chem6:0,chem7:0, chem8:0,chem9:0,chem10:0,chem11:0,chem12:0}
chemLocation = {chem1:"M", chem2:"M",chem3:"M",chem4:"M", chem5:"M",chem6:"M",chem7:"M", chem8:"M",chem9:"NA",chem10:"NA",chem11:"NA",chem12:"NA"}
leftState = {boxL1:0, boxL2:0,boxL3:0,boxL4:0, boxL5:0,
                        boxL6:0, boxL7:0,boxL8:0,boxL9:0, boxL10:0,boxL11:0, boxL12:0}
rightState = {boxR1:0, boxR2:0,boxR3:0,boxR4:0, boxR5:0,
            boxR6:0, boxR7:0,boxR8:0,boxR9:0, boxR10:0,boxR11:0, boxR12:0}
mainState = {box1:1, box2:1,box3:1,box4:1, box5:0,
            box6:1, box7:1,box8:1,box9:1, box10:0, box11:0,box12:0,box13:0, box14:0,box15:0, box16:0}

// init defective chemicals
var diff = ["8C", "10C", "12C"]
generateDefective(diff[0])
generateAttemptSign(activation)
generateScoreSign(score, day)

function generateDefective(diff){
    if(diff == "8C"){
        var randomChem1 = sample(chemWeightKeys)
        var randomChange = sample([-.1, .1])
        chemWeight[randomChem1] = 1 + Number(randomChange)
        answer.push(randomChem1)
    } else if(diff == "10C"){
        var randomChem1 = sample(chemWeightKeys)
        var randomChange = sample([-.1, .1])
        chemWeight[randomChem1] = 1 + Number(randomChange)
        answer.push(randomChem1)
    } else if (diff == "12C"){
        var randomChem1 = sample(chemWeightKeys)
        var randomChange = sample([-.1, .1])
        chemWeight[randomChem1] = 1 + Number(randomChange)
        answer.push(randomChem1)
}
}

function reset(diff, prevdiff){

    unhide(prevdiff)
    requestAnimationFrame(function(){
        beamReset()
    
    })

    if(diff == "8C"){
        chem9.classList.add("hide")
        chem10.classList.add("hide")
        chem11.classList.add("hide")
        chem12.classList.add("hide")
        
        chemState = {chem1:1, chem2:1,chem3:1,chem4:1, chem5:1,chem6:1,chem7:1, chem8:1,chem9:0,chem10:0,chem11:0,chem12:0} //activate all chemicals and move back to origin
        chemMove(chemState, "L", track = 0)
        chemState = {chem1:1, chem2:1,chem3:1,chem4:1, chem5:1,chem6:1,chem7:1, chem8:1,chem9:0,chem10:0,chem11:0,chem12:0}
        chemMoveMain(chemState, "box1", track = 0)
        chemMoveMain(chemState, "box2", track = 0)
        chemMoveMain(chemState, "box3", track = 0)
        chemMoveMain(chemState, "box4", track = 0)
        chemMoveMain(chemState, "box6", track = 0)
        chemMoveMain(chemState, "box7", track = 0)
        chemMoveMain(chemState, "box8", track = 0)
        chemMoveMain(chemState, "box9", track = 0)
    
        chemState = {chem1:0, chem2:0,chem3:0,chem4:0, chem5:0,chem6:0,chem7:0, chem8:0,chem9:0,chem10:0,chem11:0,chem12:0}
        chemLocation = {chem1:"M", chem2:"M",chem3:"M",chem4:"M", chem5:"M",chem6:"M",chem7:"M", chem8:"M",chem9:"NA",chem10:"NA",chem11:"NA",chem12:"NA"}
        leftState = {boxL1:0, boxL2:0,boxL3:0,boxL4:0, boxL5:0,
                        boxL6:0, boxL7:0,boxL8:0,boxL9:0, boxL10:0,boxL11:0, boxL12:0}
        rightState = {boxR1:0, boxR2:0,boxR3:0,boxR4:0, boxR5:0,
            boxR6:0, boxR7:0,boxR8:0,boxR9:0, boxR10:0,boxR11:0, boxR12:0}
        mainState = {box1:1, box2:1,box3:1,box4:1, box5:0,
            box6:1, box7:1,box8:1,box9:1, box10:0, box11:0,box12:0,box13:0, box14:0,box15:0, box16:0}
        binState = {boxB1:0, boxB2:0,boxB3:0,boxB4:0, boxB5:0,
                boxB6:0}
    } else if(diff =="10C"){
    
    chem11.classList.add("hide")
    chem12.classList.add("hide")

    chemState = {chem1:1, chem2:1,chem3:1,chem4:1, chem5:1,chem6:1,chem7:1, chem8:1,chem9:1,chem10:1,chem11:0,chem12:0} //activate all chemicals and move back to origin
    chemMove(chemState, "L", track = 0)
    chemState = {chem1:1, chem2:1,chem3:1,chem4:1, chem5:1,chem6:1,chem7:1, chem8:1,chem9:1,chem10:1,chem11:0,chem12:0}
    chemMoveMain(chemState, "box1", track = 0)
    chemMoveMain(chemState, "box2", track = 0)
    chemMoveMain(chemState, "box3", track = 0)
    chemMoveMain(chemState, "box4", track = 0)
    chemMoveMain(chemState, "box5", track = 0)
    chemMoveMain(chemState, "box6", track = 0)
    chemMoveMain(chemState, "box7", track = 0)
    chemMoveMain(chemState, "box8", track = 0)
    chemMoveMain(chemState, "box9", track = 0)
    chemMoveMain(chemState, "box10", track = 0)

    chemState = {chem1:0, chem2:0,chem3:0,chem4:0, chem5:0,chem6:0,chem7:0, chem8:0,chem9:0,chem10:0,chem11:0,chem12:0}
    chemLocation = {chem1:"M", chem2:"M",chem3:"M",chem4:"M", chem5:"M",chem6:"M",chem7:"M", chem8:"M",chem9:"M",chem10:"M",chem11:"NA",chem12:"NA"}
    leftState = {boxL1:0, boxL2:0,boxL3:0,boxL4:0, boxL5:0,
                    boxL6:0, boxL7:0,boxL8:0,boxL9:0, boxL10:0,boxL11:0, boxL12:0}
    rightState = {boxR1:0, boxR2:0,boxR3:0,boxR4:0, boxR5:0,
        boxR6:0, boxR7:0,boxR8:0,boxR9:0, boxR10:0,boxR11:0, boxR12:0}
    mainState = {box1:1, box2:1,box3:1,box4:1, box5:1,
        box6:1, box7:1,box8:1,box9:1, box10:1, box11:0,box12:0,box13:0, box14:0,box15:0, box16:0}
    binState = {boxB1:0, boxB2:0,boxB3:0,boxB4:0, boxB5:0,
            boxB6:0}
    } else if (diff == "12C"){
        chemState = {chem1:1, chem2:1,chem3:1,chem4:1, chem5:1,chem6:1,chem7:1, chem8:1,chem9:1,chem10:1,chem11:1,chem12:1} //activate all chemicals and move back to origin
        chemMove(chemState, "L", track = 0)
        chemState = {chem1:1, chem2:1,chem3:1,chem4:1, chem5:1,chem6:1,chem7:1, chem8:1,chem9:1,chem10:1,chem11:1,chem12:1}
        chemMoveMain(chemState, "box1", track = 0)
        chemMoveMain(chemState, "box2", track = 0)
        chemMoveMain(chemState, "box3", track = 0)
        chemMoveMain(chemState, "box4", track = 0)
        chemMoveMain(chemState, "box5", track = 0)
        chemMoveMain(chemState, "box11", track = 0)
        chemMoveMain(chemState, "box6", track = 0)
        chemMoveMain(chemState, "box7", track = 0)
        chemMoveMain(chemState, "box8", track = 0)
        chemMoveMain(chemState, "box9", track = 0)
        chemMoveMain(chemState, "box10", track = 0)
        chemMoveMain(chemState, "box14", track = 0)
    
        chemState = {chem1:0, chem2:0,chem3:0,chem4:0, chem5:0,chem6:0,chem7:0, chem8:0,chem9:0,chem10:0,chem11:0,chem12:0}
        chemLocation = {chem1:"M", chem2:"M",chem3:"M",chem4:"M", chem5:"M",chem6:"M",chem7:"M", chem8:"M",chem9:"M",chem10:"M",chem11:"M",chem12:"M"}
        leftState = {boxL1:0, boxL2:0,boxL3:0,boxL4:0, boxL5:0,
                        boxL6:0, boxL7:0,boxL8:0,boxL9:0, boxL10:0,boxL11:0, boxL12:0}
        rightState = {boxR1:0, boxR2:0,boxR3:0,boxR4:0, boxR5:0,
            boxR6:0, boxR7:0,boxR8:0,boxR9:0, boxR10:0,boxR11:0, boxR12:0}
        mainState = {box1:1, box2:1,box3:1,box4:1, box5:1,
            box6:1, box7:1,box8:1,box9:1, box10:1, box11:1,box12:0,box13:0, box14:1,box15:0, box16:0}
        binState = {boxB1:0, boxB2:0,boxB3:0,boxB4:0, boxB5:0,
                boxB6:0}
    }
    
}

function offBeamState(chemLocation){
    for(var key in chemLocation) {
        if(chemLocation[key]!=="NA" && chemLocation[key]!=="M"){
            chemState[key] = 1
        }
    }
}


function recall(chemLocation){

     //track movement in data
        data.push({
            url : pxURL,
            id : pxID,
            action: "recall",
            order:order,
            score:score,
            time: Date.now() - dayStart,
            day: day,
            activation: activation
          })
        order += 1
        
        offBeamState(chemLocation) //switch on all chem state (outside rack)
        chemMove(chemState, "M", track = 0)
    }
    

function chemMove(chemState, target, track = 1) {
    // check for mispecification of target
    if(!allInLocation(chemState, target)){
        targetDict = mapDict(target)
        //track movement in data
        if(track == 1){
            data.push({
                url : pxURL,
                id : pxID,
                action: "move",
                order:order,
                score:score,
                from: arrayToString(getChem(chemState)),
                to: target,
                time: Date.now() - dayStart,
                day: day,
                activation: activation
              })
            order += 1
        }
        
        while (sumDict(chemState) !== 0) {
            for(var key in chemState) {
                if (chemState[key]==1 && !inLocation(key, target)){
                    var previousBox = document.getElementById(key).parentElement.id
                    var previousLocation = chemLocation[key]
                    document.getElementById(findAvail(targetDict)).appendChild(document.getElementById(key)) //move
                    document.getElementById(key).style.backgroundColor  = "white";
                    chemState[key] = 0 //change chem state
                    targetDict[findAvail(targetDict)] = 1 //change target box state
                    if(previousLocation !== "NA"){
                        previousDict = mapDict(previousLocation)
                        previousDict[previousBox] = 0
                        chemLocation[key] = target //change location status
                    }
                    
                } else if(inLocation(key, target)){ //if mixture of in and out location
                    document.getElementById(key).style.backgroundColor  = "white";
                    chemState[key] = 0 //change chem state
                }
            }

          }
        
    }
       
}


function unhide(prevdiff){
    if(prevdiff == "8C"){
        chem9.classList.remove('hide');
        chem10.classList.remove('hide');
        chem11.classList.remove('hide');
        chem12.classList.remove('hide');

        chemLocation["chem9"] = "M"
        chemLocation["chem10"] = "M"
        chemLocation["chem11"] = "M"
        chemLocation["chem12"] = "M"
    }else if(prevdiff == "10C"){
        chem11.classList.remove('hide');
        chem12.classList.remove('hide');

        chemLocation["chem11"] = "M"
        chemLocation["chem12"] = "M"
    } 
}

function blinkOn(){
    for(var key in chemWeight) {
        if(chemWeight[key]!==1){
            document.getElementById(key).style.backgroundColor  = "purple";
        }
    }
}

function blinkOff(){
    for(var key in chemWeight) {
        if(chemWeight[key]!==1){
            document.getElementById(key).style.backgroundColor  = "white";
        }
    }
}

function reveal(){
    setTimeout(() => {
        blinkOn()
    }, 200) ;

    setTimeout(() => {
        blinkOff()
    }, 500) ;

    setTimeout(() => {
        blinkOn()
    }, 800) ;

    setTimeout(() => {
        blinkOff()
    }, 1100) ;

    setTimeout(() => {
        blinkOn()
    }, 1400) ;

    setTimeout(() => {
        blinkOff()
    }, 1700) ;
}

function generateAttemptSign(activation){
    if(activation == 0){
        document.getElementById("attempt-sign").innerHTML = "3 more weighs";
    } else if(activation == 1){
        document.getElementById("attempt-sign").innerHTML = "2 more weighs";
    } else if(activation == 2){
        document.getElementById("attempt-sign").innerHTML = "1 more weigh";
    } else if(activation == 3){
        document.getElementById("attempt-sign").innerHTML = "No more weighs";
    } 
}

function generateScoreSign(score, day){
    
    var scoreSign = "Score: "
    scoreSign = scoreSign.concat(score)
    var daySign = "<br>Day: "
    scoreSign = scoreSign.concat(daySign).concat(day)
    document.getElementById("score-sign").innerHTML = scoreSign;
}

function generateTallySign(score, day, shipped, shipDefect, throwGoods){
    
    var tallySign = "Working Days: "
    tallySign = tallySign.concat(day)

    tallySign = tallySign.concat("<br>Goods Shipped: ").concat(shipped)
    tallySign = tallySign.concat("<br>Defects Shipped: ").concat(shipDefect)
    tallySign = tallySign.concat("<br>Goods Wasted: ").concat(throwGoods)
    tallySign = tallySign.concat("<br>Final Score: ").concat(score)
    document.getElementById("tally-sign").innerHTML = tallySign;
}

function generateUpdateSign(scoreToday, day, shippedToday, shipDefectToday, throwGoodsToday){
    
    var updateSign = "Day: "
    updateSign = updateSign.concat(day)

    updateSign = updateSign.concat("<br>Goods Shipped: ").concat(shippedToday)
    updateSign = updateSign.concat("<br>Defects Shipped: ").concat(shipDefectToday)
    updateSign = updateSign.concat("<br>Goods Wasted: ").concat(throwGoodsToday)
    updateSign = updateSign.concat("<br>Day Score: ").concat(scoreToday)
    document.getElementById("update-sign").innerHTML = updateSign;

    updateSign = null
    setTimeout(() => {
        document.getElementById("update-sign").innerHTML = updateSign;
    }, 4000) ;
}

chem1.onmouseover = function() {mouseOver("chem1", chemState["chem1"])};
chem1.onmouseout = function() {mouseOut("chem1", chemState["chem1"])};
chem1.onclick = function() {chemClick("chem1", chemState["chem1"])};

chem2.onmouseover = function() {mouseOver("chem2", chemState["chem2"])};
chem2.onmouseout = function() {mouseOut("chem2", chemState["chem2"])};
chem2.onclick = function() {chemClick("chem2", chemState["chem2"])};

chem3.onmouseover = function() {mouseOver("chem3", chemState["chem3"])};
chem3.onmouseout = function() {mouseOut("chem3", chemState["chem3"])};
chem3.onclick = function() {chemClick("chem3", chemState["chem3"])};

chem4.onmouseover = function() {mouseOver("chem4", chemState["chem4"])};
chem4.onmouseout = function() {mouseOut("chem4", chemState["chem4"])};
chem4.onclick = function() {chemClick("chem4", chemState["chem4"])};

chem5.onmouseover = function() {mouseOver("chem5", chemState["chem5"])};
chem5.onmouseout = function() {mouseOut("chem5", chemState["chem5"])};
chem5.onclick = function() {chemClick("chem5", chemState["chem5"])};

chem6.onmouseover = function() {mouseOver("chem6", chemState["chem6"])};
chem6.onmouseout = function() {mouseOut("chem6", chemState["chem6"])};
chem6.onclick = function() {chemClick("chem6", chemState["chem6"])};

chem7.onmouseover = function() {mouseOver("chem7", chemState["chem7"])};
chem7.onmouseout = function() {mouseOut("chem7", chemState["chem7"])};
chem7.onclick = function() {chemClick("chem7", chemState["chem7"])};

chem8.onmouseover = function() {mouseOver("chem8", chemState["chem8"])};
chem8.onmouseout = function() {mouseOut("chem8", chemState["chem8"])};
chem8.onclick = function() {chemClick("chem8", chemState["chem8"])};

chem9.onmouseover = function() {mouseOver("chem9", chemState["chem9"])};
chem9.onmouseout = function() {mouseOut("chem9", chemState["chem9"])};
chem9.onclick = function() {chemClick("chem9", chemState["chem9"])};

chem10.onmouseover = function() {mouseOver("chem10", chemState["chem10"])};
chem10.onmouseout = function() {mouseOut("chem10", chemState["chem10"])};
chem10.onclick = function() {chemClick("chem10", chemState["chem10"])};

chem11.onmouseover = function() {mouseOver("chem11", chemState["chem11"])};
chem11.onmouseout = function() {mouseOut("chem11", chemState["chem11"])};
chem11.onclick = function() {chemClick("chem11", chemState["chem11"])};

chem12.onmouseover = function() {mouseOver("chem12", chemState["chem12"])};
chem12.onmouseout = function() {mouseOut("chem12", chemState["chem12"])};
chem12.onclick = function() {chemClick("chem12", chemState["chem12"])};

boxL.onclick = function() {chemMove(chemState, "L")}
boxR.onclick = function() {chemMove(chemState, "R")}
boxB.onclick = function() {chemMove(chemState, "B")}

box1.onmouseover = function() {mouseOverBox("box1")};
box1.onmouseout = function() {mouseOutBox("box1")};
box1.onclick = function() {chemMoveMain(chemState, "box1")};
box1.ondrop = function() {chemMoveMain(chemState, "box1")};

box2.onmouseover = function() {mouseOverBox("box2")};
box2.onmouseout = function() {mouseOutBox("box2")};
box2.onclick = function() {chemMoveMain(chemState, "box2")};
box2.ondrop = function() {chemMoveMain(chemState, "box2")};

box3.onmouseover = function() {mouseOverBox("box3")};
box3.onmouseout = function() {mouseOutBox("box3")};
box3.onclick = function() {chemMoveMain(chemState, "box3")};
box3.ondrop = function() {chemMoveMain(chemState, "box3")};

box4.onmouseover = function() {mouseOverBox("box4")};
box4.onmouseout = function() {mouseOutBox("box4")};
box4.onclick = function() {chemMoveMain(chemState, "box4")};
box4.ondrop = function() {chemMoveMain(chemState, "box4")};

box5.onmouseover = function() {mouseOverBox("box5")};
box5.onmouseout = function() {mouseOutBox("box5")};
box5.onclick = function() {chemMoveMain(chemState, "box5")};
box5.ondrop = function() {chemMoveMain(chemState, "box5")};

box6.onmouseover = function() {mouseOverBox("box6")};
box6.onmouseout = function() {mouseOutBox("box6")};
box6.onclick = function() {chemMoveMain(chemState, "box6")};
box6.ondrop = function() {chemMoveMain(chemState, "box6")};

box7.onmouseover = function() {mouseOverBox("box7")};
box7.onmouseout = function() {mouseOutBox("box7")};
box7.onclick = function() {chemMoveMain(chemState, "box7")};
box7.ondrop = function() {chemMoveMain(chemState, "box7")};

box8.onmouseover = function() {mouseOverBox("box8")};
box8.onmouseout = function() {mouseOutBox("box8")};
box8.onclick = function() {chemMoveMain(chemState, "box8")};
box8.ondrop = function() {chemMoveMain(chemState, "box8")};

box9.onmouseover = function() {mouseOverBox("box9")};
box9.onmouseout = function() {mouseOutBox("box9")};
box9.onclick = function() {chemMoveMain(chemState, "box9")};
box9.ondrop = function() {chemMoveMain(chemState, "box9")};

box10.onmouseover = function() {mouseOverBox("box10")};
box10.onmouseout = function() {mouseOutBox("box10")};
box10.onclick = function() {chemMoveMain(chemState, "box10")};
box10.ondrop = function() {chemMoveMain(chemState, "box10")};

box11.onmouseover = function() {mouseOverBox("box11")};
box11.onmouseout = function() {mouseOutBox("box11")};
box11.onclick = function() {chemMoveMain(chemState, "box11")};
box11.ondrop = function() {chemMoveMain(chemState, "box11")};

box12.onmouseover = function() {mouseOverBox("box12")};
box12.onmouseout = function() {mouseOutBox("box12")};
box12.onclick = function() {chemMoveMain(chemState, "box12")};
box12.ondrop = function() {chemMoveMain(chemState, "box12")};

box13.onmouseover = function() {mouseOverBox("box13")};
box13.onmouseout = function() {mouseOutBox("box13")};
box13.onclick = function() {chemMoveMain(chemState, "box13")};
box13.ondrop = function() {chemMoveMain(chemState, "box13")};

box14.onmouseover = function() {mouseOverBox("box14")};
box14.onmouseout = function() {mouseOutBox("box14")};
box14.onclick = function() {chemMoveMain(chemState, "box14")};
box14.ondrop = function() {chemMoveMain(chemState, "box14")};

box15.onmouseover = function() {mouseOverBox("box15")};
box15.onmouseout = function() {mouseOutBox("box15")};
box15.onclick = function() {chemMoveMain(chemState, "box15")};
box15.ondrop = function() {chemMoveMain(chemState, "box15")};

box16.onmouseover = function() {mouseOverBox("box16")};
box16.onmouseout = function() {mouseOutBox("box16")};
box16.onclick = function() {chemMoveMain(chemState, "box16")};
box16.ondrop = function() {chemMoveMain(chemState, "box16")};


// dragging
chem1.addEventListener('dragstart', dragStart);
chem1.addEventListener('dragend', dragEnd);
chem2.addEventListener('dragstart', dragStart);
chem2.addEventListener('dragend', dragEnd);
chem3.addEventListener('dragstart', dragStart);
chem3.addEventListener('dragend', dragEnd);
chem4.addEventListener('dragstart', dragStart);
chem4.addEventListener('dragend', dragEnd);
chem5.addEventListener('dragstart', dragStart);
chem5.addEventListener('dragend', dragEnd);
chem6.addEventListener('dragstart', dragStart);
chem6.addEventListener('dragend', dragEnd);
chem7.addEventListener('dragstart', dragStart);
chem7.addEventListener('dragend', dragEnd);
chem8.addEventListener('dragstart', dragStart);
chem8.addEventListener('dragend', dragEnd);
chem9.addEventListener('dragstart', dragStart);
chem9.addEventListener('dragend', dragEnd);
chem10.addEventListener('dragstart', dragStart);
chem10.addEventListener('dragend', dragEnd);
chem11.addEventListener('dragstart', dragStart);
chem11.addEventListener('dragend', dragEnd);
chem12.addEventListener('dragstart', dragStart);
chem12.addEventListener('dragend', dragEnd);

function dragStart(e) {
    chemState[e.target.id] = 1
    setTimeout(() => {
        for(var key in chemState) {
            if(chemState[key]==1 && chemLocation[key]!=="NA"){
            document.getElementById(key).classList.add('hide');
                }
        }
    }, 0);
    
}

function dragEnd(e) {
    chemState[e.target.id] = 0
    setTimeout(() => {
        for(var key in chemState) {
            if(chemLocation[key]!=="NA"){
                document.getElementById(key).classList.remove('hide');
            }
        }
    }, 0);
}

boxL.addEventListener('dragenter', dragEnter)
boxL.addEventListener('dragover', dragOver);
boxL.addEventListener('dragenter', dragEnterL)
boxL.addEventListener('dragover', dragOverL)
boxL.addEventListener('dragleave', dragLeaveL)
boxL.addEventListener('drop', dropL)
boxL.ondrop = function() {chemMove(chemState, "L", track = 1)};
boxR.addEventListener('dragenter', dragEnter)
boxR.addEventListener('dragover', dragOver);
boxR.addEventListener('dragenter', dragEnterR)
boxR.addEventListener('dragover', dragOverR)
boxR.addEventListener('dragleave', dragLeaveR)
boxR.addEventListener('drop', dropR)
boxR.ondrop = function() {chemMove(chemState, "R", track = 1)};
boxB.addEventListener('dragenter', dragEnter)
boxB.addEventListener('dragover', dragOver);
boxB.addEventListener('dragenter', dragEnterB)
boxB.addEventListener('dragover', dragOverB)
boxB.addEventListener('dragleave', dragLeaveB)
boxB.addEventListener('drop', dropB)
boxB.ondrop = function() {chemMove(chemState, "B", track = 1)};

box1.ondragenter = function() {dragEnterM("box1")};
box1.ondragover = function() {dragOverM("box1")};
box1.ondragleave = function() {dragLeaveM("box1")};

box2.ondragenter = function() {dragEnterM("box2")};
box2.ondragover = function() {dragOverM("box2")};
box2.ondragleave = function() {dragLeaveM("box2")};
box3.ondragenter = function() {dragEnterM("box3")};
box3.ondragover = function() {dragOverM("box3")};
box3.ondragleave = function() {dragLeaveM("box3")};
box4.ondragenter = function() {dragEnterM("box4")};
box4.ondragover = function() {dragOverM("box4")};
box4.ondragleave = function() {dragLeaveM("box4")};
box5.ondragenter = function() {dragEnterM("box5")};
box5.ondragover = function() {dragOverM("box5")};
box5.ondragleave = function() {dragLeaveM("box5")};
box6.ondragenter = function() {dragEnterM("box6")};
box6.ondragover = function() {dragOverM("box6")};
box6.ondragleave = function() {dragLeaveM("box6")};
box7.ondragenter = function() {dragEnterM("box7")};
box7.ondragover = function() {dragOverM("box7")};
box7.ondragleave = function() {dragLeaveM("box7")};
box8.ondragenter = function() {dragEnterM("box8")};
box8.ondragover = function() {dragOverM("box8")};
box8.ondragleave = function() {dragLeaveM("box8")};
box9.ondragenter = function() {dragEnterM("box9")};
box9.ondragover = function() {dragOverM("box9")};
box9.ondragleave = function() {dragLeaveM("box9")};
box10.ondragenter = function() {dragEnterM("box10")};
box10.ondragover = function() {dragOverM("box10")};
box10.ondragleave = function() {dragLeaveM("box10")};
box11.ondragenter = function() {dragEnterM("box11")};
box11.ondragover = function() {dragOverM("box11")};
box11.ondragleave = function() {dragLeaveM("box11")};
box12.ondragenter = function() {dragEnterM("box12")};
box12.ondragover = function() {dragOverM("box12")};
box12.ondragleave = function() {dragLeaveM("box12")};
box13.ondragenter = function() {dragEnterM("box13")};
box13.ondragover = function() {dragOverM("box13")};
box13.ondragleave = function() {dragLeaveM("box13")};
box14.ondragenter = function() {dragEnterM("box14")};
box14.ondragover = function() {dragOverM("box14")};
box14.ondragleave = function() {dragLeaveM("box14")};
box15.ondragenter = function() {dragEnterM("box15")};
box15.ondragover = function() {dragOverM("box15")};
box15.ondragleave = function() {dragLeaveM("box15")};
box16.ondragenter = function() {dragEnterM("box16")};
box16.ondragover = function() {dragOverM("box16")};
box16.ondragleave = function() {dragLeaveM("box16")};

box1.addEventListener('dragenter', dragEnter)
box1.addEventListener('dragover', dragOver);
box2.addEventListener('dragenter', dragEnter)
box2.addEventListener('dragover', dragOver);
box3.addEventListener('dragenter', dragEnter)
box3.addEventListener('dragover', dragOver);
box4.addEventListener('dragenter', dragEnter)
box4.addEventListener('dragover', dragOver);
box5.addEventListener('dragenter', dragEnter)
box5.addEventListener('dragover', dragOver);
box6.addEventListener('dragenter', dragEnter)
box6.addEventListener('dragover', dragOver);
box7.addEventListener('dragenter', dragEnter)
box7.addEventListener('dragover', dragOver);
box8.addEventListener('dragenter', dragEnter)
box8.addEventListener('dragover', dragOver);
box9.addEventListener('dragenter', dragEnter)
box9.addEventListener('dragover', dragOver);
box10.addEventListener('dragenter', dragEnter)
box10.addEventListener('dragover', dragOver);
box11.addEventListener('dragenter', dragEnter)
box11.addEventListener('dragover', dragOver);
box12.addEventListener('dragenter', dragEnter)
box12.addEventListener('dragover', dragOver);
box13.addEventListener('dragenter', dragEnter)
box13.addEventListener('dragover', dragOver);
box14.addEventListener('dragenter', dragEnter)
box14.addEventListener('dragover', dragOver);
box15.addEventListener('dragenter', dragEnter)
box15.addEventListener('dragover', dragOver);
box16.addEventListener('dragenter', dragEnter)
box16.addEventListener('dragover', dragOver);



/* drop targets */
function dragEnter(e) {
    e.preventDefault();
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnterL(e) {
    boxL.style.backgroundColor  = "lightgreen";
}

function dragOverL(e) {
    boxL.style.backgroundColor  = "lightgreen";
}

function dragLeaveL(e) {
    boxL.style.backgroundColor  = "white";
}

function dropL(e) {
    boxL.style.backgroundColor  = "white";
}


function dragEnterR(e) {
    boxR.style.backgroundColor  = "lightgreen";
}

function dragOverR(e) {
    boxR.style.backgroundColor  = "lightgreen";
}

function dragLeaveR(e) {
    boxR.style.backgroundColor  = "white";
}

function dropR(e) {
    boxR.style.backgroundColor  = "white";
}


function dragEnterB(e) {
    boxB.style.backgroundColor  = "red";
}

function dragOverB(e) {
    boxB.style.backgroundColor  = "red";
}

function dragLeaveB(e) {
    boxB.style.backgroundColor  = "white";
}

function dropB(e) {
    boxB.style.backgroundColor  = "white";
}

function dragEnterM(item) {
    document.getElementById(item).style.backgroundColor  = "lightgreen";
}

function dragOverM(item) {
    document.getElementById(item).style.backgroundColor  = "lightgreen";
}

function dragLeaveM(item) {
    document.getElementById(item).style.backgroundColor  = "white";
}

  ////


function mouseOver(item, state) {
    if(state == 0){
        document.getElementById(item).style.backgroundColor  = "blue";
    }
}

function mouseOut(item,state) {
    if(state==0){
        document.getElementById(item).style.backgroundColor  = "white";
    }
}

function mouseOverBox(item) {
        document.getElementById(item).style.backgroundColor  = "lightgreen";
}

function mouseOutBox(item) {
        document.getElementById(item).style.backgroundColor  = "white";
}

function chemClick(item, state) {
    if(state == 0){
        document.getElementById(item).style.backgroundColor  = "blue";
        chemState[item] = 1
        
    } else if(state == 1){
        document.getElementById(item).style.backgroundColor  = "white";
        chemState[item] = 0
    }
}

function sumDict(dict){
    sumValue = 0
    for(var key in dict) {
        sumValue = sumValue + dict[key]
    }
    return sumValue
}

function findAvail(dict){
    var dictKeys = Object.keys(dict)
    for (let i = 0; i < dictKeys.length; i++) {
        if(dict[dictKeys[i]] == 0){
            return dictKeys[i]
        }
      }
}

function findFilled(dict){
    var dictKeys = Object.keys(dict)
    for (let i = 0; i < dictKeys.length; i++) {
        if(dict[dictKeys[i]] == 1){
            return dictKeys[i]
        }
      }
}

function indexKey(key, dict){
    var dictKeys = Object.keys(dict)
    for (let i = 0; i < dictKeys.length; i++) {
        if(dictKeys[i] == key){
            return i
        }
      }
}

function inLocation(key, target){

    if(chemLocation[key] == target){ //if target location is current location
        return true
    } else {
        return false
    }

}

function allInLocation(chemState, target){
    for(var key in chemState) {
        if(chemState[key]==1 && !inLocation(key, target)){
            return false
        }
    }

    return true
}

function mapDict(target){
    if(target == "M"){
        return mainState
    } else if(target == "L"){
        return leftState
    } else if(target == "R"){
        return rightState
    } else if(target == "B"){
        return binState
    } 
}

function arrayToString(array){
    var output = ""
    for (let i = 0; i < array.length; i++) {
        if(i == array.length-1){
            output = output.concat(array[i])
        }else{
            output = output.concat(array[i]).concat(" ")
        }
      }
    return output
}


function chemMove(chemState, target, track = 1) {
    // check for mispecification of target
    if(!allInLocation(chemState, target)){
        targetDict = mapDict(target)
        //track movement in data
        if(track == 1){
            data.push({
                url : pxURL,
                id : pxID,
                action: "move",
                order:order,
                score:score,
                from: arrayToString(getChem(chemState)),
                to: target,
                time: Date.now() - dayStart,
                day: day,
                activation: activation
              })
            order += 1
        }
        
        while (sumDict(chemState) !== 0) {
            for(var key in chemState) {
                if (chemState[key]==1 && !inLocation(key, target)){
                    var previousBox = document.getElementById(key).parentElement.id
                    var previousLocation = chemLocation[key]
                    document.getElementById(findAvail(targetDict)).appendChild(document.getElementById(key)) //move
                    document.getElementById(key).style.backgroundColor  = "white";
                    chemState[key] = 0 //change chem state
                    targetDict[findAvail(targetDict)] = 1 //change target box state
                    if(previousLocation !== "NA"){
                        previousDict = mapDict(previousLocation)
                        previousDict[previousBox] = 0
                        chemLocation[key] = target //change location status
                    }
                    
                } else if(inLocation(key, target)){ //if mixture of in and out location
                    document.getElementById(key).style.backgroundColor  = "white";
                    chemState[key] = 0 //change chem state
                }
            }

          }
        
    }
       
}

function chemMoveMain(chemState, target, track = 1){
    if(mainState[target]==0 && sumDict(chemState) !== 0){ //run only when target not occupied
        //get first active chemState
        var moveKey = findFilled(chemState)
        var previousBox = document.getElementById(moveKey).parentElement.id
        var previousLocation = chemLocation[moveKey]
        document.getElementById(target).appendChild(document.getElementById(moveKey)) //move
        document.getElementById(moveKey).style.backgroundColor  = "white";
        chemState[moveKey] = 0 //change chem state
        mainState[target] = 1 //change target box state
       if(previousLocation !== "NA"){
        previousDict = mapDict(previousLocation)
        previousDict[previousBox] = 0
        chemLocation[moveKey] = "M" //change location status
       }

        if(track == 1){
            //track movement in data
        data.push({
            url : pxURL,
            id : pxID,
            action: "move",
            order:order,
            score:score,
            from: moveKey,
            to: target,
            time: Date.now() - dayStart,
            day: day,
            activation: activation
          })

        order += 1
        }
        
    }
}

function getWeight(side){
    var weight = 0
    for(var key in chemLocation) {
        if(chemLocation[key]==side){
            weight = weight + chemWeight[key]
        }
    }
    return weight
}

function getSide(side){
    var chemOnSide = []
    for(var key in chemLocation) {
        if(chemLocation[key]==side){
            chemOnSide.push(key) 
        }
    }
    return chemOnSide
}

function getChem(chemState){
    var chemOnState = []
    for(var key in chemState) {
        if(chemState[key]==1){
            chemOnState.push(key) 
        }
    }
    return chemOnState
}

// scoring
/*
ship 
thrown

p1 = -10 // penalty for shipping defective item
p2 = -5 // penalty for throwing quality goods

score_change = ship_correct + p1*ship_defect + p2*throw_goods  

*/

function inArray(array1, array2) {
    var output = []
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            if(array1[i] == array2[j]){
                output.push(true)  
                break              
            }
        }
        if(output.length < i+1){
            output.push(false)
        }
      }
    return output
}

function calcPoints(chemLocation, answer){
    points = 0
    shippedToday = 0
    shipDefectToday = 0
    throwGoodsToday = 0
    scoreToday = 0
    for(var key in chemLocation) {
        if(chemLocation[key]!=="NA"){
            if(chemLocation[key]!=="B" && !inArray([key], answer)[0]){ //shipped and correct
                points += 1
                scoreToday += 1
                shipped += 1
                shippedToday += 1
            } else if(chemLocation[key]!=="B" && inArray([key], answer)[0]) { //shipped defective goods
                points = points - 10
                scoreToday = scoreToday - 10
                shipDefect += 1
                shipDefectToday += 1
            } else if(chemLocation[key] =="B" && !inArray([key], answer)[0]) { //throw quality goods
                points = points - 5
                scoreToday = scoreToday - 5
                throwGoods += 1
                throwGoodsToday += 1
            } 
        }
        
    }
    return points
}


//button functions
var button = document.querySelector("#activate");
button.onclick = function() {
    activate()
}

var nextbutton = document.querySelector("#next");
nextbutton.addEventListener("click", next, false);

var recallbutton = document.querySelector("#recall");
recallbutton.onclick = function() {
    recall(chemLocation)
}

var submitbutton = document.querySelector("#submit");
submitbutton.onclick = function() {submit(data)
    generateTallySign(score, day, shipped, shipDefect, throwGoods)};

function displayBalance(){

    document.getElementById("balance-sign").style.display = "block";

}
function offDisplayBalance(){

    document.getElementById("balance-sign").style.display = "none";

}

function activate(){
    if(activation < 3){
        activation += 1
    generateAttemptSign(activation)

    if(getWeight("R") > getWeight("L")){
        //track action in data
        data.push({
            url : pxURL,
            id : pxID,
            action: "activate",
            order:order,
            score:score,
            left: arrayToString(getSide("L")),
            right: arrayToString(getSide("R")),
            outcome: "L < R",
            time: Date.now() - dayStart,
            day:day,
            activation: activation
          })
          order += 1
        requestAnimationFrame(function(){
            beamRotate("right", 100)
        
        })
        beamState = "R"
    }else if(getWeight("R") < getWeight("L")){
        //track action in data
        data.push({
            url : pxURL,
            id : pxID,
            action: "activate",
            order:order,
            score:score,
            left: arrayToString(getSide("L")),
            right: arrayToString(getSide("R")),
            outcome: "L > R",
            time: Date.now() - dayStart,
            day:day,
            activation: activation
          })
        order += 1
        requestAnimationFrame(function(){
            beamRotate("left", 100)
        
        })
        beamState = "L"
    } else if(getWeight("R")==getWeight("L")){
        //track action in data
        data.push({
            url : pxURL,
            id : pxID,
            action: "activate",
            order:order,
            score:score,
            left: arrayToString(getSide("L")),
            right: arrayToString(getSide("R")),
            outcome: "L = R",
            time: Date.now() - dayStart,
            day:day,
            activation: activation
          })
        order += 1

        requestAnimationFrame(function(){
            beamRotateBack(beamState, 100)
        
        })

        setTimeout(() => {
            displayBalance()
        }, 500) ;
        
        setTimeout(() => {
            offDisplayBalance()
        }, 3500) ;
    }
    }

}

function next(){

    //track action in data
    score = score + calcPoints(chemLocation, answer)
    generateUpdateSign(scoreToday, day, shippedToday, shipDefectToday, throwGoodsToday)
    
    data.push({
        url : pxURL,
        id : pxID,
        action: "next",
        order:order,
        score:score,
        time: Date.now() - dayStart,
        day:day,
        activation: activation
      })

      submit(data)
      reveal()

      setTimeout(() => {
        data = [] //clear data
        order = 1
      day += 1
      dayStart = Date.now()
      activation = 0
      answer = [] //empty answer
      if(day < 4){
        reset(diff[day-1], diff[day-2])
        chemWeight = {chem1:1, chem2:1,chem3:1,chem4:1, chem5:1,chem6:1,chem7:1, chem8:1,chem9:1,chem10:1,chem11:1,chem12:1}
        generateDefective(diff[day-1])
        generateAttemptSign(activation)
        generateScoreSign(score, day)
      } else {
          chemWeight = {chem1:1, chem2:1,chem3:1,chem4:1, chem5:1,chem6:1,chem7:1, chem8:1,chem9:1,chem10:1,chem11:1,chem12:1}
          randomDiff = sample(diff)
          reset(diff[day-1], diff[day-2])
          generateDefective(randomDiff)
          generateAttemptSign(activation)
          generateScoreSign(score, day)
      }
    }, 2500) ;
    
}

function submit(data){
    for (let i = 0; i < data.length; i++) {
        sendDataToServer(data[i])
      }
}
 
// handling data
function sendDataToServer(data) {
	$.ajax({
    url: 'https://script.google.com/macros/s/AKfycbxq392fynzfaFwyBrm9Q3vhdpoAhHANAg2gdAom1u3XrhqMeblu79NCavllNgU3IX7A/exec',
		type: 'post',
    data: data,
    //complete: function(){
    //  window.location.replace("https://app.prolific.co/submissions/complete?cc=5C3823D9") // redirect to prolific
    //} 
	});
}
function append(dict1, dict2){
  var i
  var keys = Object.keys(dict2)
  for (i = 0; i < keys.length; i++){
    dict1[keys[i]] = dict2[keys[i]] 
  }
}

function getID(url){
  const start = "PROLIFIC_PID"
  var check = url.match(start)
  var reg = /PROLIFIC_PID=[a-z0-9]+&/
  if(check !== null){
    var extract = url.match(reg)
    return extract[0].slice(13,37)
  } else {
    return Math.random()
  }
  
}

function sample(array){
    return array[parseInt(Math.random() * array.length)]
}

/*
append(data,
    {
      url : window.location.href,
      id : getID(window.location.href),
      action: ,
      timestamp: ,
      sequence: ,
      sequencestart: 
    }

*/
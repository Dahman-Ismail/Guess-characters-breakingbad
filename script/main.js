next()
async function fetchData(){
    const data = await fetch('https://www.breakingbadapi.com/api/characters');
    const respone = await data.json();
    console.log(respone)
    return respone;
}

function CreatQuiz(randomN,respone){
    var appendList = []
    var Catgoreydiv = document.querySelector("#QuizGenerator"); 
    var Quizdiv = document.createElement("div"); 
    Quizdiv.classList.add("mt-5","px-3","text-left");
    var ObjOfCharacter = respone[randomN];//this one for the answare
    // console.log(ObjOfCharacter)
    var rightanswareID = ObjOfCharacter.char_id;  // name of character will be returned
    var CharactreImage = document.createElement("img");
    CharactreImage.setAttribute("class","rounded");
    CharactreImage.style.width = "150px";
    CharactreImage.style.height = "150px";
    CharactreImage.src =  ObjOfCharacter.img; // image of charcter
    Catgoreydiv.appendChild(CharactreImage) //CharactreImage appended
    var rightanswareDiv = document.createElement("div");
    rightanswareDiv.innerHTML = `<p onclick="answare(this,${rightanswareID})" id="${rightanswareID}" class="hv-P rounded  px-1">${ObjOfCharacter.name}</p>`;
    appendList.push(rightanswareDiv);
    for(var i=0;i<3;i++){
        var ranCharcterN = Math.floor(Math.random()*62);
        var CharcterObj = respone[ranCharcterN];
        var OthersDiv = document.createElement("div");
        OthersDiv.innerHTML = `<p onclick="answare(this,${rightanswareID})" id="${CharcterObj.char_id}" class="hv-P rounded px-1">${CharcterObj.name}</p>`;
        appendList.push(OthersDiv);
    }
    // to don't rpeat the same <p>
    var testnumber =""
    for(var i=0;i<appendList.length;i++){
        var randomN = Math.floor(Math.random()*appendList.length);
        while(testnumber!="" && testnumber.includes(randomN)==true){
            randomN = Math.floor(Math.random()*appendList.length);
            // console.log("i am working")
        }
        Quizdiv.appendChild(appendList[randomN]);
        // console.log(randomN)
        testnumber += randomN.toString();
        // console.log(testnumber)
    }   
    Catgoreydiv.appendChild(Quizdiv);
}
var score = 0
function answare(elem,rightanswareID){
    //  here test the right answare with inner Text of clicked element and give +1 to the score
    // console.log(elem,rightanswareID);
    if(elem.id == rightanswareID){
        console.log("you win ")
        score++
        document.querySelector("#ScoreValue").innerHTML = score
    }
    next();
}

async function next(){
    const getrespone = await fetchData();
    var randomnum = Math.floor(Math.random()*62);
    document.querySelector("#QuizGenerator").innerHTML =""; 
    CreatQuiz(randomnum,getrespone);
}

/* --- Logique Of The Code ---
function to fetch the data fetchData();
function to creat the elemnt CreatQuiz(randomN,respone); inside this function creat thre random value for the p ==>
answare(this,rightansware); check if the clicked item equil to the answare
next(); to the next Character
*/
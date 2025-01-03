let Commands;
const API_KEY="cac473d6bf5957b6879513079dd69ae2";
function fetchCommands()
{
    fetch("/mic/Process.json")
    .then(response=>{
        response.json()
        .then(data=>{
            Commands=data;
        })
    })
}
fetchCommands();


const speechRecognition=window.webkitSpeechRecognition //Google Chrome 
||
window.SpeechRecognition;  //Firefox

function startListening()
{
    const recong = new speechRecognition();
    recong.start();
    recong.onstart = microphoneButton.classList.add("Listen");

    recong.onresult =function(data)
    {
        microphoneButton.classList.remove("Listen");
        handleResults(data);
    }
}
function handleResults(data)
{
    let text=data.results[0][0].transcript;
    text = text.toLowerCase();
    console.log(text);

    ProcessCommand(text);
}
function ProcessCommand(UserText)
{
    // if(UserText.includes('instagram'))
    // {
    //     Speak("Opening enstagram...");
    //     window.open("https://www.instagram.com");
    // }
    // else if(UserText.includes('youtube'))
    // {
    //     Speak("Opening Youtube...");
    //     window.open("https://www.youtube.com");
    // }
    // else if(UserText.includes('the') && UserText.includes('time'))
    // {
    //     Speak("The time is: "+getCurrentTime());
    // }
    // else if(UserText.includes('facebook') || UserText.includes('fb'))
    // {
    //     Speak("Opening facebook...");
    //     window.open("https://www.facebook.com");
    // }
    // else{
    //     Speak('I cant perform task: '+UserText);
    // }
    for(eachCommand in Commands)
    {
        if(UserText.includes(eachCommand) || UserText == eachCommand)
        {
            let task = Commands[eachCommand];
            eval(task);
        }
        else if(UserText.includes("search on google"))
        {
            UserText=UserText.slice(16);
            Speak('Searching initiated...'+UserText);
            searchOnGoogle(UserText);
        }
        else if(UserText.includes("hey ava"))
        {
            UserText=UserText.slice(10);
            Speak('Searching initiated...'+UserText);
            searchOnGoogle(UserText);
        }
        else if(UserText.includes("search on youtube"))
        {
            UserText=UserText.slice(17);
            Speak('Searching initiated...'+UserText);
            searchOnYoutube(UserText);
        }
        else
        {

        }
    }
}
function Speak(TEXT)
{
    const utter = new SpeechSynthesisUtterance();
    let counter = 0;

    utter.text = TEXT;
    //utter.lang = 'en-IN';
    utter.voice =  window.speechSynthesis.getVoices()[1];

    console.log(utter.voice);
    //utter.lang = 'en-IN';

    window.speechSynthesis.speak(utter);
    window.speechSynthesis.getVoices().forEach(i=>{
        console.log(`${counter++}. ${i.voiceURI}`);
    });
}

//To get currentTime
function getCurrentTime()
{
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    currentTimeIs = hours+'hours'+minutes+'minutes';
    Speak("The time is..."+currentTimeIs);

}


//Calls function onload
microphoneButton.addEventListener("click",startListening);

function openWeb(Url)
{
    window.open(Url);
}

// Get weather details

function getWeatherDetails()
{
    if("geolocation" in navigator)
    {
        navigator.geolocation.getCurrentPosition(async function(position){
            let lat=position.coords.latitude;
            let lon=position.coords.longitude;

            const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

            let response = await fetch(api_url);

            let data = await response.json();

            manipulateWeatherData(data);

        });
    }
}


function manipulateWeatherData(data)
{
    let city=data.name;
    let temp=data.main.temp;
    let humidity=data.main.humidity;

    let icon=data.weather[0].icon;
    let description=data.weather[0].main;
    // console.log(data);
    let msg=`Current temperature is ${temp} degree celcius and humidity is ${humidity} grams of water vapour per kilogram`;
    Speak(msg);
    //We can use other data if we want to show on screen
    // let imageUrl = `https://openweathermap.org/img/w/${icon}.png`;

    // let image = `<img src="${imageUrl}">`;
    // document.write(image);
}


// Get today's date
function getTodayDate()
{
    var d = new Date();
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var month = months[d.getMonth()];
    var date = d.getDate();
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var weekDay = days[d.getDay()];
    var year = d.getFullYear();
    Speak("Today date is "+weekDay+" "+date+" "+month+" "+year);
}


//Opening camera
function openCamera()
{
    openCamera = window.open(
        'http://localhost:5500/mic/Camera2.html',
        "",
        "width=700px,height=450px,left=300px,top=100px"
    );
}

//Closing Camera
function closeCamera()
{
    openCamera.close();
}

//Search on Google
function searchOnGoogle(data)
{
    window.open(
    `https://www.google.com/search?q=${data}`,
    "Google",
    );
    
}
//Search on Youtube
function searchOnYoutube(data)
{
    window.open(
    `https://www.youtube.com/search?q=${data}`,
    "Youtube",
    );
}

//Close AVA
function closeAVA()
{
    setTimeout(function() {
        window.close();
        }, 2*1000);
}

//Reload AVA
function reloadAVA()
{
    // Speak('Reloading ava...');
    // Speak('Taking initial checks...');
    // Speak('Backing up configurations...');
    // Speak('I am online and ready again...');
    Speak("please wait...");
    Speak("reloading...");
    setTimeout(function() {
        location.reload();
    }, 7*1000);
}

//To move AVA window upside
function stepUp()
{
    window.moveBy(0,-100);
}

//To move AVA window downside
function stepDown()
{
    window.moveBy(0,100);
}

//To move against x-axis out
function moveToXAxisOut()
{
    window.moveBy(100,0);
}

//To move against x-axis in
function moveToXAxisIn()
{
    window.moveBy(-100,0);
}

//To get a Battery
let batteryPromise = navigator.getBattery();
batteryPromise.then(printBatteryStatus);

function printBatteryStatus(batteryObject) {
    // console.log("IsCharging", batteryObject.charging);
    window.batteryLevel = Math.round(batteryObject.level*100);
    // console.log("Percentage", batteryLevel+"%");
}
function getBattery()
{
    Speak("Battery left in the device is "+batteryLevel+"percent");
}
//Get family Information
function getFamilyInfo()
{
    Speak("There are six members in your family.");
    Speak("Your grandmother, father, mother, brother, sister, and you.");
    Speak("You live in Junibej, Maharashtra.");
    Speak("I have a lot more to say, but I think this will suffice.");
}

//Telling a Joke
function tellMeAJoke()
{
    window.shutter1 = new Audio();  //window is use here to access variable anywhere in Program
    shutter1.autoplay = true;
    // play sound effect
    window.randomNumber = Math.floor((Math.random() * 6)+1);
    console.log(randomNumber);
    if(randomNumber == 1)
    {
        shutter1.src = 'Joke 1.mp3';
    }
    else if(randomNumber == 2)
    {
        shutter1.src = 'Joke 2.mp3';
    }
    else if(randomNumber == 3)
    {
        shutter1.src = 'Joke 3.mp3';
    }
    else if(randomNumber == 4)
    {
        shutter1.src = 'Joke 4.mp3';
    }
    else if(randomNumber == 5)
    {
        shutter1.src = 'Joke 5.mp3';
    }
    else
    {
        shutter1.src = 'Joke 6.mp3';
    }
    shutter1.play();
}
//Next Joke
function nextJoke()
{
    if(randomNumber < 6)
    {
    randomNumber = randomNumber + 1;
    }
    else
    {
        randomNumber = 0;
    }

    if(randomNumber == 1)
    {
        shutter1.src = 'Joke 1.mp3';
    }
    else if(randomNumber == 2)
    {
        shutter1.src = 'Joke 2.mp3';
    }
    else if(randomNumber == 3)
    {
        shutter1.src = 'Joke 3.mp3';
    }
    else if(randomNumber == 4)
    {
        shutter1.src = 'Joke 4.mp3';
    }
    else if(randomNumber == 5)
    {
        shutter1.src = 'Joke 5.mp3';
    }
    else
    {
        shutter1.src = 'Joke 6.mp3';
    }
}
//Welcome to friends
function welcomeToFriends()
{
    Speak("Welcome everyone. I am AVA, it's nice to meet you.");
    Speak("I have a comprehensive list and I'm sure you're on it.");
    Speak("Sir, should I step aside? I think you would like to talk with your friends.");
}
//Show friends list
function friendList()
{
     window.friendList = window.open(
        "http://localhost:5500/mic/friendList.html",
        "",
        "width=700px,height=500px"
    )
}
//Close Friend List
function closeList()
{
    friendList.close();
}

//System Information
function systemInfo()
{
        if(navigator.onLine)
        {
            Speak("The system is online with a speed of "+navigator.connection.downlink+" megabytes per second");
        }
        else{
            Speak("The system is offline.");
        }
        Speak("The keyboard language is set to "+navigator.language);
        var type = navigator.connection.effectiveType;
        type = type.slice(0,1);
        Speak("The system is using a "+type+"G connection");
        var platform = navigator.platform;
        platform = platform.slice(3,5);
        Speak("This is a "+platform+"-bit Windows system");
}
//Internet Speed
function internetSpeed()
{
    if(navigator.onLine)
    {
        Speak("The system is online with the speed of "+navigator.connection.downlink+" MB per second");
    }
    else{
        Speak("The system is not online...");
    }
}

function readList(){
    var friendList = [];
    var friendList1 = "";
    friendList1 = localStorage.getItem("array");
    friendList = friendList1.split(",");
    console.log(friendList);
    
    for(let friend of friendList)
    {
        console.log(friend);
        Speak(friend);
    }
}

function avaSaysHello()
{
    let d = new Date();
    var hours = d.getHours();
    Speak("I am AVA");
    if(hours <= 12)
    {
        Speak("Good morning.");
    }
    else if(hours > 12 && hours <= 16)
    {
        Speak("Good afternoon.");
    }
    else if(hours > 16 && hours <= 20)
    {
        Speak("Good evening.");
    }
    Speak("How may I help you, sir?");
}
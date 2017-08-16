document.title = ("Scenic Route Finder");

var titleBar = document.createElement('div');
titleBar.id = 'title';
titleBar.innerHTML = 'Scenic Route Finder';
container.append(titleBar);

// var nav = document.createElement('div');
// nav.id = 'nav';
// container.append(nav);

// var introButton = createButton("INTRO", 'nav-intro');
// introButton.className = 'navlink navactive';

// var eduButton = createButton("EDUCATION", 'nav-edu');

// var pubButton = createButton("PUBLICATIONS", 'nav-pubs');

// var intButton = createButton("INTERESTS", 'nav-interests');

// var contactButton = createButton("CONTACT", 'nav-contacts');

// function createButton(text, id){
//     button = document.createElement("button");
//     button.id = id;
//     button.innerHTML = text;
//     button.className = 'navlink';
//     nav.append(button);
//     return button;
// }

// document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"day-2-style-s.css\">");

// var main = document.createElement('div');
// main.id = 'main';
// container.append(main);

// var mainIntro = newDiv('Hello, I am Bernard', 'main-intro');
// mainIntro.className = 'maindiv mainactive';

// var mainEdu = newDiv('I go to school', 'main-edu');

// var mainPub = newDiv('Write stuff', 'main-pubs');

// var mainInt = newDiv('I like things', 'main-interests');

// var mainCon = newDiv('Call me', 'main-contacts');

// function newDiv (text, id){
//     var nd = document.createElement('div');
//     nd.id = id;
//     nd.innerHTML = text;
//     nd.className = 'maindiv';
//     main.append(nd);
//     return nd;
// }


// var selectedNav = introButton;
// var shownMain = mainIntro;

// var list = Array.from(document.getElementsByClassName('navlink'));
// for (i=0; i<list.length; i++){
//     list[i].addEventListener("click", classReassign);
// }

// function classReassign(){    
//     var s = this.id.substr(3);
//     var mDiv = document.getElementById('main'+s);
    
//     shownMain.className = 'maindiv';
//     mDiv.className = 'maindiv mainactive';
//     shownMain = mDiv;

//     selectedNav.className = 'navlink';
//     this.className = 'navlink navactive';
//     selectedNav = this;
// }

// var interestsDiv = mainInt;
// var bandContainer = document.createElement('div');
// interestsDiv.append(bandContainer);
// var concertsDiv = document.createElement('div');
// concertsDiv.innerHTML = 'Upcoming Wiggles Concerts!!!';
// bandContainer.append(concertsDiv);

// var response = '';
// $.ajax({
//     type: 'GET',
//     url: "https://rest.bandsintown.com/artists/The%20Wiggles/events?app_id=testing",
//     dataType: 'json',
//     success: function (response){
//         var res = response;
//         for (i=0; i<res.length; i++){
//             let datetime = res[i]['datetime'];
//             let location = res[i]['venue']['name'];
//             let eventDiv = document.createElement('div');

//             eventDiv.innerHTML = ("Location: " + location + ", Time: " + datetime);
//             concertsDiv.appendChild(eventDiv);
//         }
//     }
// });
document.title = ("Run-A-Way");

var titleBar = document.createElement('div');
titleBar.id = 'title';
container.append(titleBar);

var titleText = document.createElement('div');
titleText.id = 'title-text';
titleText.innerHTML = 'Run-A-Way';
titleBar.append(titleText);

var logo = document.createElement('div');
logo.id = 'logo';
titleBar.append(logo);

var img = document.createElement("IMG");
img.id = 'img';
img.src = 'runningman.png';
logo.appendChild(img);

//Creates Login vs Page Containers and set Login as active

var loginContainer = document.createElement('div');
var pageContainer = document.createElement('div');

loginContainer.id = 'login-container';
pageContainer.id = 'page-container';

loginContainer.className = 'active-container';
pageContainer.className = 'hidden-container';

container.append(loginContainer);
container.append(pageContainer);

/*************** LOGIN CONTENT *****************/

var loginContent = document.createElement('div');
loginContent.id = 'login-content';
loginContent.className = 'container-formatting';
loginContainer.append(loginContent);

var loginTitle = document.createElement('div');
loginTitle.id = 'login-title';
loginTitle.className = 'section-title';
loginTitle.innerHTML = 'LOGIN';
loginContent.append(loginTitle);

var loginEmailDiv = document.createElement('div');
loginEmailDiv.id = 'login-email-div';
loginEmailDiv.className = 'login-divs';
loginContent.append(loginEmailDiv);

var loginEmailText = document.createElement('div');
loginEmailText.id = 'login-email-text';
loginEmailText.className = 'section-text';
loginEmailText.innerHTML = 'EMAIL:';
loginEmailDiv.append(loginEmailText);

var loginEmailInput = document.createElement('INPUT');
loginEmailInput.setAttribute("type", "text");
loginEmailInput.id = 'login-email-input';
loginEmailInput.placeholder = 'Type Email Here';
loginEmailInput.className = 'login-inputs';
loginEmailDiv.append(loginEmailInput);

var loginPasswordDiv = document.createElement('div');
loginPasswordDiv.id = 'login-password-div';
loginPasswordDiv.className = 'login-divs';
loginContent.append(loginPasswordDiv);

var loginPasswordText = document.createElement('div');
loginPasswordText.id = 'login-password-text';
loginPasswordText.className = 'section-text';
loginPasswordText.innerHTML = 'PASSWORD:';
loginPasswordDiv.append(loginPasswordText);

var loginPasswordInput = document.createElement('INPUT');
loginPasswordInput.setAttribute("type", "text");
loginPasswordInput.id = 'login-password-input';
loginPasswordInput.placeholder = 'Type Password Here';
loginPasswordInput.className = 'login-inputs';
loginPasswordDiv.append(loginPasswordInput);

var loginBtns = document.createElement('div');
loginBtns.id = 'login-btns';
loginContent.append(loginBtns);

var btnRegister = document.createElement('BUTTON');
btnRegister.id = 'btn-register';
btnRegister.innerHTML = 'REGISTER';
btnRegister.className = 'btn-properties login-btns';
loginBtns.append(btnRegister);

var btnSignin = document.createElement('BUTTON');
btnSignin.id = 'btn-signin';
btnSignin.innerHTML = 'SIGN IN';
btnSignin.className = 'btn-properties login-btns';
loginBtns.append(btnSignin);

// var loginResponse = document.createElement('div');
//
//
//
//
//
//


/*************** MAIN CONTENT *****************/
var mainContent = document.createElement('div');
mainContent.id = 'main-content';
pageContainer.append(mainContent);

/*                  MAP                   */
var imageHolder = document.createElement('div');
imageHolder.id = 'image-holder';


var map = document.createElement('div');
map.id = 'map';
map.className = 'google-active';
imageHolder.append(map);

var streetView = document.createElement('div');
streetView.id = 'streetView';
streetView.className = 'google-not-active';
imageHolder.append(streetView);

var sideBar = document.createElement('div');
sideBar.id = 'side-bar';
mainContent.append(sideBar);

mainContent.append(imageHolder);


/*               SIDEBAR                */

// SIDEBAR TITLE
var sideBarTitle = document.createElement('div');
sideBarTitle.id = 'title-sideBar';
sideBarTitle.className = 'section-title';
sideBarTitle.innerText = 'MENU';
sideBar.append(sideBarTitle);

// SIDEBAR DATA STREAM

var dataDiv = document.createElement('div');
dataDiv.id = 'data-stream';
dataDiv.className = 'data-sidebar section-text';
sideBar.append(dataDiv);

var distanceData = document.createElement('div');
var speedData = document.createElement('div');
var durationData = document.createElement('div');

distanceData.id = 'data-distance';
speedData.id = 'data-speed';
durationData.id = 'data-duration';

dataDiv.append(distanceData);
dataDiv.append(speedData);
dataDiv.append(durationData);

var speedText = document.createElement('div');
speedText.id = 'speed-text';
var speedInput = document.createElement("INPUT");
speedInput.id = 'speed-input';
speedInput.setAttribute("type", "text");
var speedBtn = document.createElement("BUTTON");
speedBtn.id = 'speed-btn';
speedBtn.className = 'btn-properties';
speedBtn.innerHTML = "GO";

speedData.append(speedText);
speedData.append(speedInput);
speedData.append(speedBtn);

// SIDEBAR NAVIGATION CONTROLS
var buttonDiv = document.createElement('div');
var btnBacktrack = document.createElement('BUTTON');
var btnReturn = document.createElement('BUTTON');
var btnBacktrack = document.createElement('BUTTON');
var btnUndo = document.createElement('BUTTON');
var btnClear = document.createElement('BUTTON');
// var btnSave = document.

btnBacktrack.id = 'btn-backtrack';
btnReturn.id = 'btn-return';
btnUndo.id = 'btn-undo';
btnClear.id = 'btn-clear';

btnBacktrack.className = 'side-btns noreturn btn-properties';
btnReturn.className = 'side-btns btn-properties';
btnUndo.className = 'side-btns btn-properties';
btnClear.className = 'side-btns btn-properties';

btnBacktrack.innerText = 'BACK';
btnReturn.innerText = 'RETURN';
btnBacktrack.innerText = 'BACK';
btnUndo.innerText = 'UNDO';
btnClear.innerText = 'CLEAR';

buttonDiv.append(btnClear);
buttonDiv.append(btnUndo);
buttonDiv.append(btnReturn);
buttonDiv.append(btnBacktrack);

sideBar.append(buttonDiv);


// STREET VIEW PLAYER

var playButton = document.createElement('button');
playButton.id = 'street-play';
playButton.className = 'side-btns stopped btn-properties';
playButton.innerText = 'STREET';

var lBtn = document.createElement('BUTTON');
var rBtn = document.createElement('BUTTON');
lBtn.id = ('left-button');
rBtn.id = ('right-button');
lBtn.className = 'side-btns btn-properties ctrlBtns controls-not-active';
rBtn.className = 'side-btns btn-properties ctrlBtns controls-not-active';
lBtn.innerText = "<";
rBtn.innerText = ">";

var ctrlBtns = document.createElement('div');
ctrlBtns.id = 'controls';
ctrlBtns.append(lBtn);
ctrlBtns.append(rBtn);

sideBar.append(playButton);
sideBar.append(ctrlBtns);

//Waypoint Ideas setDirections
var ideasContainer = document.createElement('div');
ideasContainer.id = 'ideas-container';
ideasContainer.className = 'container-formatting';
mainContent.append(ideasContainer);

var ideasTitle = document.createElement('div');
ideasTitle.id = 'ideas-title';
ideasTitle.innerHTML = 'GET WAYPOINT IDEAS';
ideasTitle.className = 'section-title';
ideasContainer.append(ideasTitle);

var ideasHeader = document.createElement('div');
ideasHeader.id = 'ideas-header';
ideasContainer.append(ideasHeader);

var ideasContent = document.createElement('div');
ideasContent.id = 'ideas-content';
ideasContainer.append(ideasContent);

var ideasPrompt = document.createElement('div');
ideasPrompt.id = 'ideas-prompt';
ideasPrompt.innerHTML = 'Find Waypoint at Distance: ';
ideasPrompt.className = 'section-text';
ideasHeader.append(ideasPrompt);

var ideasInput = document.createElement('INPUT');
ideasInput.setAttribute("type", "text");
ideasInput.id = 'ideas-input';
ideasInput.placeholder = 'How many miles away?';
ideasHeader.append(ideasInput);

var ideasGoBtn = document.createElement('BUTTON');
ideasGoBtn.id = 'ideas-go-btn';
ideasGoBtn.className = 'btn-properties';
ideasGoBtn.innerHTML = 'FIND';
ideasHeader.append(ideasGoBtn);



// Bottom Content

var bottomContainer = document.createElement('div');
bottomContainer.id = 'bottom-container';
pageContainer.append(bottomContainer);

//Saved maps

var savedContent = document.createElement('div');
savedContent.id = 'saved-content';
savedContent.className = 'container-formatting';
bottomContainer.append(savedContent);

var savedTitle = document.createElement('div');
savedTitle.id = 'saved-title';
savedTitle.innerHTML = 'SAVED MAPS';
savedTitle.className = 'section-title';
savedContent.append(savedTitle);

var savedPlaceholder = document.createElement('div');
savedPlaceholder.id = 'saved-placeholder';
savedPlaceholder.innerHTML = 'If you like a map you made, hit SAVE!';
savedPlaceholder.className = 'section-text';
savedContent.append(savedPlaceholder);

//Direction List

var directionContent = document.createElement('div');
directionContent.id = 'direction-content';
directionContent.className = 'container-formatting';
bottomContainer.append(directionContent);

var directionTitle = document.createElement('div');
directionTitle.id = 'direction-title';
directionTitle.className = 'section-title';
directionTitle.innerHTML = 'DIRECTIONS';
directionContent.append(directionTitle);

var directionPlaceholder = document.createElement('div');
directionPlaceholder.id = 'direction-placeholder';
directionPlaceholder.innerHTML = 'Click on the map to get directions for your run!';
directionPlaceholder.className = 'section-text';
directionContent.append(directionPlaceholder);

var directionList = document.createElement('div');
directionList.id = 'direction-list';
directionList.className = 'nodirections';
directionContent.append(directionList);

//Sign Out Button

var btnSignout = document.createElement('BUTTON');
btnSignout.id = 'btn-signout';
btnSignout.innerHTML = 'SIGN OUT';
btnSignout.className = 'btn-properties';
pageContainer.append(btnSignout);

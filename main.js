document.title = ("Scenic Route Finder");

var titleBar = document.createElement('div');
titleBar.id = 'title';
titleBar.innerHTML = 'Scenic Route Planner';
container.append(titleBar);


/*************** MAIN CONTENT *****************/
var mainContent = document.createElement('div');
mainContent.id = 'main-content';
container.append(mainContent);

/*                  MAP                   */
var imageHolder = document.createElement('div');
imageHolder.id = 'image-holder';
mainContent.append(imageHolder);

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


/*               SIDEBAR                */

// SIDEBAR TITLE
var sideBarTitle = document.createElement('BUTTON');
sideBarTitle.id = 'title-sideBar';
sideBarTitle.className = 'title-elements';
sideBarTitle.innerText = 'MENU';
sideBar.append(sideBarTitle);

// SIDEBAR DATA STREAM

var dataDiv = document.createElement('div');
dataDiv.id = 'data-stream';
dataDiv.className = 'data-sidebar';
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

btnBacktrack.id = 'btn-backtrack';
btnReturn.id = 'btn-return';
btnUndo.id = 'btn-undo';
btnClear.id = 'btn-clear';

btnBacktrack.className = 'side-btns noreturn';
btnReturn.className = 'side-btns';
btnUndo.className = 'side-btns';
btnClear.className = 'side-btns';

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
playButton.className = 'side-btns stopped';
playButton.innerText = 'RUN';


sideBar.append(playButton);

// Directions List

var directionContent = document.createElement('div');
directionContent.id = 'direction-content';
directionContent.className = 'nodirections';
container.append(directionContent);

var directionTitle = document.createElement('div');
directionTitle.id = 'directionTitle';
directionTitle.innerHTML = 'Directions';
directionContent.append(directionTitle);

var directionList = document.createElement('div');
directionList.id = 'direction-list';
directionContent.append(directionList);

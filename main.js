document.title = ("Scenic Route Finder");

var titleBar = document.createElement('div');
titleBar.id = 'title';
titleBar.innerHTML = 'Scenic Route Finder';
container.append(titleBar);

var mainContent = document.createElement('div');
mainContent.id = 'main-content';
container.append(mainContent);

var map = document.createElement('div');
map.id = 'map';
mainContent.append(map);

var sideBar = document.createElement('div');
sideBar.id = 'side-bar';
mainContent.append(sideBar);

var sideBarTitle = document.createElement('BUTTON');
var btnReturn = document.createElement('BUTTON');
var btnUndo = document.createElement('BUTTON');
var btnClear = document.createElement('BUTTON');

sideBarTitle.id = 'title-sideBar';
btnReturn.id = 'btn-return';
btnUndo.id = 'btn-id';
btnClear.id = 'btn-clear';

sideBarTitle.className = 'title-elements';
btnReturn.className = 'side-btns';
btnUndo.className = 'side-btns';
btnClear.className = 'side-btns';

sideBarTitle.innerText = 'MENU';
btnReturn.innerText = 'RETURN';
btnUndo.innerText = 'UNDO';
btnClear.innerText = 'CLEAR';

sideBar.append(sideBarTitle);
sideBar.append(btnReturn);
sideBar.append(btnUndo);
sideBar.append(btnClear);

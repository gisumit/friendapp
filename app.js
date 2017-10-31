const name = document.querySelector('#name');
const listW = document.querySelector('.list-wrap');
const model = document.querySelector('#model');
const getFriendsDBFromLocalStorage = () => {
    if (localStorage.getItem('friendsDB') === null) {
        localStorage.setItem('friendsDB', '[]');
    }
    return JSON.parse(localStorage.getItem('friendsDB'));
};

const setFriendsDBToLocalStorage = function (data) {
    localStorage.setItem('friendsDB', JSON.stringify(data));
};

const data = getFriendsDBFromLocalStorage();
let _id = data.length;
const add = () => {
    if (!name.value) {
        throw new Error('No name to insert');
    }
    let friend = name.value.trim();
    let init = friend[0];
    _id++;
    data.push({_id, friend, init});
    name.value = '';
    showList(data);
    setFriendsDBToLocalStorage(data);
}


const showList = (data) => listW.innerHTML = data.map(frd => `<div class="friend-box" data-id="${frd._id}"><h4>${frd.init}</h4><p>${frd.friend}</p><span onclick="remove(${frd._id}, this)">&times;</span><small onclick="edit(${frd._id})">Edit</small></div>`).join('');

if (localStorage.getItem('friendsDB') !== null) {
    let data = JSON.parse(localStorage.getItem('friendsDB'));
    if (data.length > 0) {
        showList(data);  
    }
}
const updateList = (array, id, obj) => { array[array.findIndex(st => st._id === id)] = obj; }

const edit = id => {
    let item = getItem(id);  
    model.children.template.innerHTML = `<input type="text" value="${item.friend}"><input type="submit" value="update" onclick="updateData(this, ${item._id})">`;
    model.showModal();
}

const updateData = (sbbtn, id) => {
    let upname = sbbtn.parentNode.querySelector('input[type="text"]').value;        
    let item = getItem(id);
    let upObject = Object.assign(item, {friend: upname});
    updateList(data, id, upObject);
    setFriendsDBToLocalStorage(data);
    model.close();
    let dom = Array.from(listW.childNodes).find(el => {
        return el.dataset.id == id;
    });
    dom.querySelector('p').innerText = upObject.friend;
};

const getItem = (id) => {
    return data[data.findIndex(fr => fr._id == id)];
}

const remove = (id, el) => {
    let index = data.findIndex(fr => fr._id === id )
    data.splice(index, 1);
    _id = data.length;
    setFriendsDBToLocalStorage(data);
    el.parentNode.parentNode.removeChild(el.parentNode);    
}

const reloadPage = () => { window.location.reload(); };
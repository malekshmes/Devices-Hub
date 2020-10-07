'use strict';

var heads = ['Device name', 'Device categoy', 'Quantity', 'Price'];
var allDevices = [];

// check if the local storage has any items, if true then render them on the screen
if (localStorage.getItem('storedDevice')){
    var stored = JSON.parse(localStorage.getItem('storedDevice'));
    for (var j=0; j<stored.length; j++){
        
        new Device (stored[j].deviceName, stored[j].deviceCategory, stored[j].quantity)
        allDevices.checkPrice();
        allDevices.addRow();
    }


}


function Device(deviceName, deviceCategory, quantity){
    this.deviceName = deviceName;
    this.deviceCategory = deviceCategory;
    this.quantity = quantity;
    this.price =0;
    allDevices.push(this);
}
Device.prototype.checkPrice = function(){
    this.price = Math.floor(Math.random()* (750-350 + 1) + 350);
}


var table = document.getElementById('toPurchaseTable');
var tr = document.createElement('tr');
table.appendChild(tr);

function addHeader(){
    for (var i= 0; i <heads.length; i++){
        var th = document.createElement('th');
        th.textContent = heads[i];
        tr.appendChild(th);
    }
    

}

addHeader();


// prevent default behaviour and get the added device
var form = document.getElementById('devicesForm');
form.addEventListener('submit', addDevice)

function addDevice(event){
    event.preventDefault();


    var name = event.target.deviceName.value;
    var category = event.target.deviceCategory.value;
    var quantity = event.target.quantity.value;
    
    var addedDevice = new Device (name, category, quantity);
    addedDevice.checkPrice();
    addedDevice.addRow();


    localStorage.setItem('storedDevice', JSON.stringify(allDevices));

}


Device.prototype.addRow = function(){
var tr = document.createElement('tr');
table.appendChild(tr);
var td = document.createElement('td');
    td.textContent = this.deviceName ;
    tr.appendChild(td);

    var td2 = document.createElement('td');
    td2.textContent = this.deviceCategory;
    tr.appendChild(td2);


    var td3 = document.createElement('td');
    td3.textContent = this.quantity;
    tr.appendChild(td3);


    var td4 = document.createElement('td');
    td4.textContent = this.price;
    tr.appendChild(td4);
}
for (var i=0; i < allDevices.length; i++){
    allDevices[i].checkPrice();
    allDevices[i].addRow();
}
function calculateTotalPrice(){
    var totalPrice =0;
    for (var j=0; j<allDevices.length; j++){
        totalPrice+= Number(allDevices[j].price);
    }
    document.getElementById('totalPrice').textContent= "Total price of purchased devices = "+ totalPrice;
}
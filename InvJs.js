let UI = {
  getSeletedItems: window.document.getElementById("get-selected-items"),
  addSlot: window.document.getElementById("add-slot"),
  addApple: window.document.getElementById("add-apple")
};

UI.getSeletedItems.addEventListener("click",function () {
    let out = inv.getItemlist().filter(obj =>{
        return obj.isSelected() === true;
    });

    console.log(out)
});


UI.addApple.addEventListener("click",function () {
    inv.addItem(itemArray[Math.round(Math.random()*(itemArray.length-1))]);

    inv.drawItems();
});

UI.addSlot.addEventListener("click",function () {
    inv.addSlot();
});

class Inventory{
    constructor(slots,div){
        let _slots = slots;
        let _div = div;
        let itemArray = [];

        for(let i = 0; i<slots; i++){
            var node = document.createElement("LI");
            node.classList.add("InvJs-li");
            var li = _div.appendChild(node);
            itemArray.push(new ItemSlot(li,i));
        }

        _div.addEventListener('click',function () {
        });

        this.getPos = function(){
            return _div.getBoundingClientRect()
        };

        this.getItemlist = function () {return itemArray};

        this.findFreeSlot = function () {
            var newlist = itemArray.find(x => x.currentItem.name === "none");
            if(!newlist){
                alert("inventory full");
                return -1;
            }
            else{
                return newlist._ID;
            }

        };

        this.addItem = function (item) {
            console.log(item.name);
            var v = itemArray.find(x => x.currentItem.name === item.name);
            if(v){
                itemArray[v._ID].currentItem.amount += item.amount;
                return;
            }

            var freespot = this.findFreeSlot();
            console.log(freespot);
            if (freespot === -1)
                return;
            else{
                itemArray[freespot].currentItem.name = item.name;
                itemArray[freespot].currentItem.price = item.price;
                itemArray[freespot].currentItem.amount += item.amount;

            }

        };

        this.addSlot = function () {
            _slots++;
            var node = document.createElement("LI");
            node.classList.add("InvJs-li");
            var li = _div.appendChild(node);
            itemArray.push(new ItemSlot(li,itemArray.length));

        };

        this.drawItems = function () {
            itemArray.map(x => x.DrawItem())
        }
    }
}

class ItemSlot{

    constructor(div,id){
        this._ID = id;
        this.currentItem = new Item("none",0,0);
        let _div = div;
        let selected = false;

        this.onSelect = function(){
            selected = !selected;
            if(selected)
                _div.style.backgroundColor = "rgba(0,255,0,0.2)";
            else
                _div.style.backgroundColor = "rgba(255,255,255,0.2)";
        };
        _div.addEventListener("mousedown",this.onSelect);
        this.isSelected = function () {return selected};

        this.DrawItem = function () {
            _div.innerHTML = this.currentItem.name + ": "+ this.currentItem.amount
        }
    }
}

class Item{
<<<<<<< HEAD
    constructor(name,price,amount,type,data) {
        this.name = name;
        this.price = price;
        this.amount = amount;
        this.type = type;
        this.data = data;
=======
    constructor(name,price,amount,img) {
        this.name = name;
        this.price = price;
        this.amount = amount;
        this.img = img
>>>>>>> 8c3e875df02c34b9c982e6da32b3ba60ef1b0b1e
    }
}

let itemArray = [
    new Item("apple",10,1,"material",{}),
    new Item("pear",10,1,"material",{}),
    new Item("bannana",10,1,"material",{}),
    new Item("strawberry",10,1,"material",{}),
    new Item("dicks",10,1,"material",{}),
];

let inv = new Inventory(4,document.getElementById("inventory"));
inv.drawItems();
console.log(inv.getPos());
























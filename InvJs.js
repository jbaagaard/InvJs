let UI = {
  getSeletedItems: window.document.getElementById("invjs-get-selected-items"),
  addSlot: window.document.getElementById("invjs-add-slot"),
  addApple: window.document.getElementById("invjs-add-apple"),
  removeItems: window.document.getElementById("invjs-remove-items"),
  swapItems: window.document.getElementById("invjs-swap-items")
};

UI.getSeletedItems.addEventListener("click",function () {
    let out = player.inv.getItemlist().filter(obj =>{
        return obj.isSelected() === true;
    });
    player.inv.drawItems();
    console.log(out)
});

UI.removeItems.addEventListener("click",function () {
    let out = player.inv.getItemlist().filter(obj =>{
        return obj.isSelected() === true;
    });
    for(let i = 0;i<out.length;i++){
        player.inv.removeItem(out[i]._ID)
    }
    player.inv.drawItems();
    console.log(out)
});

UI.swapItems.addEventListener("click",function () {
    let out = player.inv.getItemlist().filter(obj =>{
        return obj.isSelected() === true;
    });
    player.inv.swapItems(out[0]._ID,out[1]._ID);
    player.inv.drawItems();
    console.log(out)
});


UI.addApple.addEventListener("click",function () {
    player.inv.addItem(itemArray[Math.round(Math.random()*(itemArray.length-1))]);

    player.inv.drawItems();
});

UI.addSlot.addEventListener("click",function () {
    player.inv.addSlot();
    player.inv.drawItems();

});

class Inventory{
    constructor(slots,div){
        let _slots = slots;
        let _div = div;
        let itemArray = [];

        for(let i = 0; i<slots; i++){
            let node = document.createElement("li");
            node.classList.add("InvJs-li");

            let img = document.createElement("div");
            img.src = "img/log.png";
            node.appendChild(img);

            let li = _div.appendChild(node);

            itemArray.push(new ItemSlot(li,i));
        }

        _div.addEventListener('click',function () {
        });

        this.swapItems = function (_id1, _id2) {
          let tempItem = itemArray[_id1].currentItem;

          itemArray[_id1].currentItem = itemArray[_id2].currentItem;
          itemArray[_id2].currentItem = tempItem;
        };

        this.removeItem = function (index) {
            itemArray[index].currentItem = new Item("none","",0,0,"none",{});
        };

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
        this.currentItem = new Item("none","",0,0,"none",{});
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
        };
        this.DrawItem();
    }
}

class Item{
    constructor(name,img,price,amount,type,data) {
        this.name = name;
        this.img = img;
        this.price = price;
        this.amount = amount;
        this.type = type;
        this.data = data;
    }
}


























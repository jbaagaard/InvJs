let places = {
    town:{name:"town",pos:[0,0]},
    forrest:{name:"forrest",pos:[10,0]},
    mine:{name:"mine",pos:[0,10]},
};

class Player{
constructor(){
    this.name = "john doe";
    this.inv = new Inventory(20,document.getElementById("inventory"));
    this.level = 1;
    this.exp = 0;
    this.equipment = {
        head: new Item("none","",0,1,"head",{}),
        body: new Item("none","",0,1,"body",{}),
        legs: new Item("none","",0,1,"shoes",{}),
        weapon: new Item("none","",0,1,"weapon",{att:10})
    };
    this.place = places.town;

}
}

let player = new Player();
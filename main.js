let places = {
    town:{name:"town",type:"town",dificulity:1,pos:[0,0]},
    forrest:{name:"forrest",pos:[10,0]},
    mine:{name:"mine",pos:[0,10]},
};




class Location{
    _name;
    _type;
    _materials;
    _difficulity;
    _pos;
    constructor(name,type,materials,difficulity,pos){
        this._name = name;
        this._type = type;
        this._materials = materials;
        this._difficulity = difficulity;
        this._pos = pos;

    }

}

class Player{
    test(){
        console.log(this);
    }
constructor(div){
        this._test = this.test.bind(this);

    this.div = div;
    this.name = "john doe";
    this.inv = new Inventory(8  ,document.getElementById("inventory"));
    this.level = 1;
    this.exp = 0;
    this.questsCompleted = 0;
    this.upgrades = {
        armor: 1,
        weapon: 1,
        inventory:1
    };

    this.equipment = {
        head: new Item("none","",0,1,"head",{}),
        body: new Item("none","",0,1,"body",{}),
        legs: new Item("none","",0,1,"shoes",{}),
        weapon: new Item("none","",0,1,"weapon",{att:10})
    };
    this.place = places.town;

    this.addExp = function (exp) {
        this.exp += exp;
        if(this.exp >= this.ExpToLevel())
            this.level++;
        this.DrawPlayer()
    };
    /**
     * @return {number}
     */
    this.ExpToLevel = function(){
        return (Math.pow(2,this.level))+(this.level*this.level*100)-2
    };

    this.DrawPlayer = function () {

    }
}

}

let player = new Player();

/**
 * @return {number}
 */
function Distance(point1,point2) {
    return Math.sqrt( Math.pow((point1[0]-point2[0]), 2) + Math.pow((point1[1]-point2[1]), 2) );

}

import DIRECTION from "./direction.ts";

export default class Position{

    public static pos(x:number, y:number){return new Position(x, y);}

    private static directions = {
        up: new Position(0, -1),
        down: new Position(0, +1),
        left: new Position(-1, 0),
        right: new Position(+1, 0),
        null: new Position(0,0)
    }
    constructor(protected _x:number, protected _y:number){}
    get x(){return this._x;}
    get y(){return this._y;}

    public static direction(direction: DIRECTION):Position{
        switch(direction){
            case DIRECTION.UP: return this.directions.up;
            case DIRECTION.DOWN: return this.directions.down;
            case DIRECTION.LEFT: return this.directions.left;
            case DIRECTION.RIGHT: return this.directions.right;
            default: return this.directions.null;
        }
    }
    
    public step(direction:DIRECTION):Position{
        const dir = Position.direction(direction);
        return new Position(this.x + dir.x, this.y + dir.y);
    }

    public toString():string{  return this.x + 'x' + this.y;  }
}

import * as PK from "../playkit/playkit.ts"

export enum LAYER {
    FLOOR = "floor",
    OBJECT = "object",
    CHARACTER = "character"
}


export class Board extends PK.Board<Cell, Tile>{
    get layers():Array<string>{return [LAYER.FLOOR, LAYER.OBJECT, LAYER.CHARACTER]}
    protected createBlankCell(position:PK.Position):Cell{return new Cell(this, position);}
}


export class Cell extends PK.Cell<Board, Tile> {
    get walkable():boolean{ return this.object === null ? true : this.object.walkable; }
    get character():ObjectTile|null{ return this.layers[LAYER.CHARACTER] as ObjectTile; }
    get object():ObjectTile|null{ return this.layers[LAYER.OBJECT] as ObjectTile; }
    get floor():FloorTile|null{ return this.layers[LAYER.FLOOR] as FloorTile; }
}

export abstract class Tile extends PK.Tile<Board, Cell>{
}



export abstract class FloorTile extends Tile{
    get layer():string{return LAYER.FLOOR}
}
export abstract class ObjectTile extends Tile{
    get layer():string{return LAYER.OBJECT}
    get walkable():boolean{return false}
    get pushable():boolean{return false}
    public push(direction:PK.DIRECTION):boolean{
        if(!this.pushable) return false;
        const target = this.position.step(direction);
        if(!this.board?.isValidPosition(target))return false;
        if(!this.cell.board.at(target).walkable)return false;
        this.cell = this.cell.board.at(target);        
        return true;
    }
}
export abstract class CharacterTile extends Tile{
    get layer():string{return LAYER.CHARACTER}
    public step(direction:PK.DIRECTION):boolean{
        const target = this.position.step(direction);
        if(!this.board?.isValidPosition(target))return false;
        this.cell.board.at(target).object?.push(direction);
        if(!this.cell.board.at(target).walkable)return false;
        this.cell = this.cell.board.at(target);        
        return true;
    }
}

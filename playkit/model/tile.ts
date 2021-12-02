import Cell from "./cell.ts"
import Board from "./board.ts"
import Position from "../tool/position.ts"

export default abstract class Tile{

    public _cell:Cell|null = null;
    abstract get layer():string;

    get position():Position{ return this.cell.position; }
    get board():Board|null{return this.cell?.board;}
    get cell():Cell{return this._cell!;}
    set cell(cell:Cell|null){
        if(this.cell !== null){
            this.cell.setTile(this.layer, null);
        }
        this._cell = cell;
        this.cell.setTile(this.layer, this);
    }
}

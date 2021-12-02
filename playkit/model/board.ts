import Cell from "./cell.ts";
import Tile from "./tile.ts";
import Position from "../tool/position.ts";

export default abstract class Board{

    private board: Array<Array<Cell>> = []

    constructor(private _width: number, private _height: number){
        this.build();
    }

    protected build(){
        for(let x=0;x<this.width;x++){
            this.board[x] = [];
            for(let y=0;y<this.height;y++){
                this.board[x][y] = this.createBlankCell(new Position(x, y));
            }    
        }
    }

    protected abstract createBlankCell(position:Position):Cell;
    abstract get layers():Array<string>;

    get width():number{return this._width}
    get height():number{return this._height}

    public find(type:typeof Tile, layer:string):Array<Tile>{
        const result:Array<Tile> = [];
        for(let x=0;x<this.width;x++){
            for(let y=0;y<this.height;y++){
                const tile = this.at(new Position(x, y)).getTile(layer);
                if(tile instanceof type) result.push(tile);
            }    
        }
        return result;
    }

    public hasLayer(layer:string, exception = true):boolean{ 
        if(this.layers.includes(layer)) return true;
        else if(!exception) return false;
        throw "Layer '" + layer +"' does not exists"; 
    }

    public at(position:Position):Cell{
        if(!this.isValidPosition(position)) throw "out of board bounds";
        return this.board[position.x][position.y];
    }
 
    public isValidPosition(position:Position):boolean{ return position.x>=0 && position.x<this.width && position.y>=0 && position.y<this.height; }

    public onChange(cell:Cell, layer:string, tile:Tile|null){
        console.log("[MAP CHANGE] Layer '" + layer + "' changed at " + cell.position + " to " + (tile!== null ? "'"+tile.constructor.name+"'" : "<null>"));
    }

}
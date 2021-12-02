import Tile from "./tile.ts";
import Board from "./board.ts";
import Position from "../tool/position.ts";

export default abstract class Cell{
    protected layers:{[key:string]: Tile|null} = {};

    constructor(protected _board: Board, protected _position: Position){ 
        _board.layers.forEach(layer=>this.layers[layer] = null);
    }

    get position():Position{return this._position;}
    get board():Board{return this._board;}

    public isOccupied(layer:string):boolean{ return this.getTile(layer) !== null; }

    public getTile(layer:string):Tile|null{
        this.board.hasLayer(layer)
        return this.layers[layer];
    }

    public setTile(layer:string, tile:Tile|null){ 
        this.board.hasLayer(layer)    
        this.layers[layer] = tile;
        this.board.onChange(this, layer, tile);
    }
}
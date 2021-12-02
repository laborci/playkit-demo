import _Tile from "./model/tile.ts"
import _Cell from "./model/cell.ts"
import _Board from "./model/board.ts"
import Position from "./tool/position.ts"
import DIRECTION from "./tool/direction.ts"

export abstract class Tile<TBoard extends _Board, TCell extends _Cell> extends _Tile{
    get board():TBoard|null{return this.cell.board as TBoard;}
    get cell():TCell{return super.cell as TCell;}
    set cell(cell:TCell){ super.cell = cell; }
}

export abstract class Board<TCell extends _Cell, TTile extends _Tile> extends _Board{
    protected abstract createBlankCell(position:Position):TCell;
    public at(position:Position):TCell{return super.at(position) as TCell}
    public onChange(cell:TCell, layer:string, tile:TTile|null){super.onChange(cell, layer, tile)}
}

export abstract class Cell<TBoard extends _Board, TTile extends _Tile> extends _Cell{
    get board():TBoard{return super.board as TBoard;}
    public getTile(layer:string):TTile{ return super.getTile(layer) as TTile; }
}

export {Position}
export {DIRECTION}
const pos = Position.pos;
export {pos}
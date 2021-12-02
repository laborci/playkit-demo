import {Board, Tile, FloorTile} from "./model/model.ts"
import * as PK from "./playkit/playkit.ts"
import * as tiles from "./model/tiles.ts"


export default class MapLoader{
    constructor(private board:Board){}

    fillFloor(){
        for(let x=0;x<this.board.width;x++){
            for(let y=0;y<this.board.height;y++){
                const tile:FloorTile = Math.random() > .5 ? new tiles.Sand(): new tiles.Grass();
                tile.cell = this.board.at(PK.pos(x,y));
            }   
        }
    }

    boundingWalls(){
        for(let x=0;x<this.board.width;x++){
            for(let y=0;y<this.board.height;y++){
                if(x === 0 || y === 0 || x === this.board.width-1 || y === this.board.height - 1)new tiles.Wall().cell = this.board.at(PK.pos(x,y));
            }   
        }
    }

    load(map:Array<string>){
        this.fillFloor();
        for(let y=0;y<this.board.height;y++){
            for(let x=0; x<this.board.width;x++){
                let tile:Tile|null = null;
                switch(map[y][x]){
                    case "#": tile = new tiles.Wall(); break;
                    case "X": tile = new tiles.Place(); break;
                    case "O": tile = new tiles.Crate(); break;
                    case "&": tile = new tiles.Player(); break;
                }
                if(tile !== null){
                    tile.cell = this.board.at(PK.pos(x, y));
                }
            }
        }
    }
}



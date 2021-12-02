import { colors } from "https://deno.land/x/cliffy/ansi/colors.ts";
import { cursorTo, eraseScreen } from "https://deno.land/x/cliffy/ansi/ansi_escapes.ts";
import { Board, Tile, Cell } from "./model/model.ts"

import * as tiles from "./model/tiles.ts"
import * as PK from "./playkit/playkit.ts"

export default class GameTerminal{

    constructor(private board:Board){}

    public drawCell(cell: Cell){
        // itt a +1 -eket nem értem... :( HA TUDOD MONDD MEG, HOGY MIÉRT KELL!!!
        console.log(cursorTo(cell.position.x+1, cell.position.y+1) + this.gfx(cell))
    }

    public drawBoard(){
        console.log(eraseScreen);
        let output = "";
            for(let y=0;y<this.board.height;y++){
                for(let x=0;x<this.board.width;x++){
                output += this.gfx(this.board.at(PK.pos(x,y)));
            }   
            output += "\n";
        }
        console.log(cursorTo(0,0) + output);
    }

    private gfx(cell:Cell){
        if(cell.character !== null ) return this.tileGfxBoard(cell.character);
        if(cell.object !== null ) return this.tileGfxBoard(cell.object);
        if(cell.floor !== null ) return this.tileGfxBoard(cell.floor);
        return " ";
    }

    private tileGfxBoard(tile:Tile){
        if(tile instanceof tiles.Player) return colors.white.bold.bgBlack("⚉");
        if(tile instanceof tiles.Sand) return colors.bgBlack.gray("·");
        if(tile instanceof tiles.Grass) return colors.bgBlack.green("·");
        if(tile instanceof tiles.Place) return colors.brightMagenta.bold.bgBlack("x")
        if(tile instanceof tiles.Wall) return colors.bgRed.brightRed("🁢")
        if(tile instanceof tiles.Crate) {
            if(tile.cell.floor instanceof tiles.Place) return colors.brightGreen.bgBlack("◘"); 
            return colors.yellow.bgBlack.bold("◘");
        }
        return " ";
    }

    public async loop(player:tiles.Player){
        Deno.setRaw(0, true);

        const bufferSize = 16;
        const buf = new Uint8Array(bufferSize);
        
        while (true) {
          const nread = await Deno.stdin.read(buf);
        
          if (nread === null)break;
          if (buf && buf[0] === 0x03) break;
        
          
          if (buf && buf[0] === 27 && buf[1] === 91) {
                if(buf[2] === 65) player!.step(PK.DIRECTION.UP);
                if(buf[2] === 66) player!.step(PK.DIRECTION.DOWN);
                if(buf[2] === 67) player!.step(PK.DIRECTION.RIGHT);
                if(buf[2] === 68) player!.step(PK.DIRECTION.LEFT);
            }
        }
        
        Deno.setRaw(0, false);
    }
}
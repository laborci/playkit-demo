import {Board, Cell, LAYER} from "./model/model.ts"
import * as tiles from "./model/tiles.ts";

import GameTerminal from "./game-terminal.ts"
import MapLoader from "./map-loader.ts"
import map from "./map.ts";

const board = new Board(30, 20);
const maploader = new MapLoader(board);
maploader.load(map);
const player:tiles.Player = board.find(tiles.Player, LAYER.CHARACTER)[0] as tiles.Player;

const game = new GameTerminal(board);
game.drawBoard();
board.onChange = (cell:Cell)=> game.drawCell(cell);
game.loop(player);

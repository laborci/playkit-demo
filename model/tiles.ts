import {FloorTile, ObjectTile, CharacterTile} from "./model.ts"

export class Sand extends FloorTile {}
export class Grass extends FloorTile {}
export class Place extends FloorTile {}

export class Wall extends ObjectTile {}
export class Crate extends ObjectTile {
    get pushable():boolean{return true;}
}

export class Player extends CharacterTile {}

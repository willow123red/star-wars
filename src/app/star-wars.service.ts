import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { HttpClient } from "@angular/common/http";

import { LogService } from "./log.service";

@Injectable()
export class StarWarsService {
  private characters = [
    { name: "Luke Skywalker", side: "" },
    { name: "Darth Vader", side: "" },
    { name: "R2D2", side: "" },
    { name: "The Emperor", side: "" },
    { name: "C3P0", side: "" },
  ];
  private logService: LogService;
  charactersChanged = new Subject<void>();
  httpClient: HttpClient;

  constructor(logService: LogService, httpClient: HttpClient) {
    this.logService = logService;
    this.httpClient = httpClient;
  }

  fetchCharacters() {
    this.httpClient.get("http://swapi.dev/api/people/").subscribe((data) => {
      const chars = data['results'].map((char) => {
        return { name: char.name, side: "" };
      });
      this.characters = chars;
      console.log(chars);
      this.charactersChanged.next();
    });
  }

  getCharacters(chosenList) {
    if (chosenList === "all") {
      return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === chosenList;
    });
  }

  onSideChosen(charInfo) {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    });
    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog(
      "Changed side of " + charInfo.name + ", new side: " + charInfo.side
    );
  }

  addCharacter(name, side) {
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    });
    if (pos !== -1) {
      return;
    }
    const newChar = { name: name, side: side };
    this.characters.push(newChar);
  }
}

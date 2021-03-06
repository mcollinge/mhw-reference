import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";

import { of } from "rxjs/observable/of";
import { map, switchMap, catchError } from "rxjs/operators";

import * as _ from "lodash";

import {
  GET_MONSTERS,
  GetMonsters,
  GetMonstersSuccess,
  GetMonstersFail
} from "../actions/monsters.action";
import {
  DefinitionsService,
  MONSTER_DEFINITIONS
} from "../../services/definitions.service";

import * as fromModels from "../../models";

@Injectable()
export class MonstersEffects {
  @Effect()
  monsters = this.actions
    .ofType(GET_MONSTERS)
    .pipe(
      map((action: GetMonsters) => action.filter),
      switchMap(filter =>
        this.defService
          .load<fromModels.IMonster>(MONSTER_DEFINITIONS)
          .pipe(
            map(
              monsters =>
                new GetMonstersSuccess(
                  _.values(monsters).filter(
                    m => m.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
                  )
                ),
              catchError(error => of(new GetMonstersFail(error)))
            )
          )
      )
    );

  constructor(
    private actions: Actions,
    private defService: DefinitionsService
  ) {}
}

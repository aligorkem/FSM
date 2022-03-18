/*
 *  @Project:        FSM
 *  @Description:    Treeview's json component that is used to display the JSON content of tree view data.
 *  @Created:        18 Mar 2022
 *  @CreatedBy :     Ali Gorkem Ozturk
 */

import {Component, OnInit, Input} from '@angular/core';

@Component({
      selector: 'app-fsm-json',
      templateUrl: './fsm-json.component.html',
      styleUrls: ['./fsm-json.component.scss']
})

/**
 * It is used to represent the json data in flat mode.
 */
export class FsmJsonComponent implements OnInit {

      /**
       * The items will be passed from other container.
       */
      @Input() public items: any;

      /**
       * Constructor of FsmJsonComponent.
       */
      constructor() {
      }

      ngOnInit(): void {
      }
}

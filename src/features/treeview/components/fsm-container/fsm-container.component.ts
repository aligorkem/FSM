/*
 *  @Project:        FSM
 *  @Description:    Treeview's container component. This page will be displayed when Angular application is initialised.
 *  @Created:        18 Mar 2022
 *  @CreatedBy :     Ali Gorkem Ozturk
 */

import {Component, OnInit} from '@angular/core';

@Component({
      selector: 'app-fsm-home',
      templateUrl: './fsm-container.component.html',
      styleUrls: ['./fsm-container.component.scss']
})
/**
 * The container page of tree view component.
 */
export class FSMContainerComponent implements OnInit {

      /**
       * The constructor of FSMContainerComponent.
       */
      constructor() {
      }

      ngOnInit(): void {
      }
}

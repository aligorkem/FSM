/*
 *  @Project:        FSM
 *  @Description:    The treeview's module that will be loaded lazily.
 *  @Created:        18 Mar 2022
 *  @CreatedBy :     Ali Gorkem Ozturk
 */

import { NgModule } from '@angular/core';
import { FSMContainerComponent } from "./components/fsm-container/fsm-container.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FSMTreeviewComponent } from "./components/fsm-treeview/fsm-treeview.component";
import { FSMSharedModule } from "../../app/shared/fsm-shared.module";
import { FsmJsonComponent } from "./components/fsm-json/fsm-json.component";
import { PrettyPrintPipe } from "../../app/core/pipe/pretty-print.pipe";
const routes = [
    {
        path: '',
        component: FSMContainerComponent
    },
];

/**
 * The treeview's module that will be loaded lazily.
 */
@NgModule({
  declarations: [FSMContainerComponent, FSMTreeviewComponent, FsmJsonComponent, PrettyPrintPipe],
  imports: [
    RouterModule.forChild(routes),
    FSMSharedModule,
    CommonModule,
  ],
  exports: [
    FSMContainerComponent
  ],
  providers: []
})
/**
 * Home page module
 */
export class FsmTreeviewModule {}

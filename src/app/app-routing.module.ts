/*
 *  @Project:        FSM
 *  @Description:    FSM is using lazy loading techniques to load components.
 *  @Created:        18 Mar 2022
 *  @CreatedBy :     Ali Gorkem Ozturk
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FSMPathEnum } from "./core/enums/fsm-path.enum";

/**
 * FSM is using lazy loading techniques to load components.
 * @type {{loadChildren: string; path: string}[]}
 */
const routes: Routes = [
  /** home page */
  {
    loadChildren: () => import('../features/treeview/fsm-treeview.module').then((m) => m.FsmTreeviewModule),
    path: FSMPathEnum.HOME
  },
  /** we could add SIGNUP or CHAT routes here */
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

/**
 * This module is used to load sub modules when it is requested.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
/**
 * This module is used to load sub modules when it is requested.
 */
export class AppRoutingModule { }

/*
 *  @Project:        FSM
 *  @Description:    This is a shared module in FMS.
 *  @Created:        18 Mar 2022
 *  @CreatedBy :     Ali Gorkem Ozturk
 */

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FsmMaterialModule } from "./fsm-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FsmMaterialModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FsmMaterialModule,
    FlexLayoutModule
  ]
})
/**
 * FSMSharedModule
 */
export class FSMSharedModule {}

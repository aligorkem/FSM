/*
 *  @Project:        FSM
 *  @Description:    It keeps the info whether it is expandable.
 *  @Created:        18 Mar 2022
 *  @CreatedBy :     Ali Gorkem Ozturk
 */

/**
 * It keeps the info whether it is expandable.
 */
export class NodeFlatModel {
      item: string;
      children?: NodeFlatModel;
      level: number;
      expandable: boolean;
}

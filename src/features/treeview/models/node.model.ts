/*
 *  @Project:        FSM
 *  @Description:    NodeModel is the main model object of treeview.
 *  @Created:        18 Mar 2022
 *  @CreatedBy :     Ali Gorkem Ozturk
 */

/**
 * NodeModel is the main model object of treeview.
 */
export class NodeModel {
      type: 'folder' | 'folder' | 'folder' | null;
      name: string;
      children: NodeModel[];
      id: string;
}

/*
 *  @Project:        FSM
 *  @Description:    This component is used to hold the treeview component.
 *  @Created:        18 Mar 2022
 *  @CreatedBy :     Ali Gorkem Ozturk
 */

import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FSMTreeviewService} from '../../services/fsm-treeview.service';
import {NodeFlatModel} from '../../models/node-flat.model';
import {NodeModel} from '../../models/node.model';

/**
 * @title It is a tree view component of FMS. It represents the tree view structure.
 */
@Component({
      selector: 'app-fsm-treeview',
      templateUrl: './fsm-treeview.component.html',
      styleUrls: ['./fsm-treeview.component.scss'],
      providers: [FSMTreeviewService]
})
export class FSMTreeviewComponent {

      /**
       * Constructor class of FSMTreeviewComponent.
       * @param treeviewService
       */
      constructor(private treeviewService: FSMTreeviewService) {
            this.treeFlattener = new MatTreeFlattener(this.convertFromNestedToFlat, this.getLevel,
                  this.isExpandable, this.getChildren);
            this.treeControl = new FlatTreeControl<NodeFlatModel>(this.getLevel, this.isExpandable);
            this.itemsList = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

            treeviewService.itemsUpdated.subscribe(data => {
                  this.itemsList.data = data;
            });
      }

      /** Gives us flat Node Items List */
      flatNodeItemsList = new Map<NodeFlatModel, NodeModel>();

      /** Gives us nested Node Items List */
      nestedNodeItemsList = new Map<NodeModel, NodeFlatModel>();

      /** A selected parent node to be inserted */
      selectedParentNode: NodeFlatModel | null = null;

      /** Represents the tree control **/
      treeControl: FlatTreeControl<NodeFlatModel>;

      /** Represents the flattened tree items structure **/
      treeFlattener: MatTreeFlattener<NodeModel, NodeFlatModel>;

      /** full items list */
      itemsList: MatTreeFlatDataSource<NodeModel, NodeFlatModel>;

      /** display the json data */
      public showJson: boolean = false;

      /** show Add folder */
      public showAddFolder: boolean = false;

      /** represents new folder name */
      public newFolderName: string = '';

      /** represents hover item */
      public hoverItem: string = '';

      /** represents show folder or hide it */
      public showFolderOrFile: boolean = false;

      /** new file or folder name */
      public newFileOrFolderName: string = '';

      /** show new item */
      public showNewItem: boolean = false;

      /** parent node item */
      public parentNode: any;

      getLevel = (node: NodeFlatModel) => node.level;

      isExpandable = (node: NodeFlatModel) => node.expandable;

      getChildren = (node: NodeModel): NodeModel[] => node.children;

      hasChild = (_: number, _nodeData: NodeFlatModel) => _nodeData.expandable;

      hasNoContent = (_: number, _nodeData: NodeFlatModel) => _nodeData.item === '';

      /**
       * It converts nested node to flat node.
       */
      convertFromNestedToFlat = (node: NodeModel, level: number) => {
            const existingNode = this.nestedNodeItemsList.get(node);
            const flatNode = existingNode && existingNode.item === node.name
                  ? existingNode
                  : new NodeFlatModel();
            flatNode.item = node.name;
            flatNode.level = level;
            flatNode.expandable = !!node.children;
            this.flatNodeItemsList.set(flatNode, node);
            this.nestedNodeItemsList.set(node, flatNode);
            return flatNode;
      };

      /**
       * It returns the parent node
       * @param node
       */
      getParentNode(node: NodeFlatModel): NodeFlatModel | null {
            const currentLevel = this.getLevel(node);

            if (currentLevel < 1) {
                  return null;
            }

            const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

            for (let i = startIndex; i >= 0; i--) {
                  const currentNode = this.treeControl.dataNodes[i];

                  if (this.getLevel(currentNode) < currentLevel) {
                        return currentNode;
                  }
            }
            return null;
      }

      /**
       * It adds new item.
       * @param node
       */
      addNewItem(node: NodeFlatModel) {
            this.parentNode = this.flatNodeItemsList.get(node);
            this.treeviewService.addItemToList(this.parentNode!, '');
            this.treeControl.expand(node);
            this.showNewItem = true;
      }

      /**
       * It saves node into the map list and tree data structure.
       * @param node
       */
      saveNode(node: NodeFlatModel) {
            const nestedNode = this.flatNodeItemsList.get(node);
            this.treeviewService.updateItem(nestedNode!, this.newFileOrFolderName);
            this.newFileOrFolderName = '';
            this.showFolderOrFile = false;
      }

      /**
       * Add folder button clicked.
       */
      public clickedAddFolder(): void {
            this.showAddFolder = true;
      }

      /**
       * It is called in order to add a folder.
       */
      public addFolder(): void {
            this.newFolderName = this.newFolderName.trim();
            if (this.newFolderName.length !== 0) {
                  const node = new NodeModel();
                  node.name = this.newFolderName;
                  node.children = [];
                  this.treeviewService.addNewNode(node);
                  this.showAddFolder = false;
                  this.newFolderName = '';
            }
            if (this.newFileOrFolderName) {
                  const node = new NodeModel();
                  node.name = this.newFileOrFolderName.trim();
                  node.children = [];
                  this.treeviewService.addNewNodeToParent(this.parentNode, node);
                  this.treeviewService.deleteItem(this.parentNode, '');
                  this.newFileOrFolderName = '';
                  this.showFolderOrFile = false;
            }
            this.showJson = true;
      }

      /**
       * It cancels the operation.
       */
      public cancel(): void {
            this.newFolderName = '';
            this.showAddFolder = false;
      }

      /**
       * It cancels the new item operation.
       */
      public cancelNewItem(): void {
            this.newFileOrFolderName = '';
            this.showNewItem = false;
            this.treeviewService.deleteItem(this.parentNode, '');
      }

      /**
       * Onmouse hover
       */
      public mouseHover(index: string): void {
            this.hoverItem = index;
      }

      /**
       * Onmouse hover out
       */
      public mouseOut(index: string): void {
            this.hoverItem = index;
      }

      /**
       * It is called when the folder is deleted.
       */
      public deleteFolder(node: NodeFlatModel): void {
            const deleteNode = this.flatNodeItemsList.get(node);

            let parent: NodeFlatModel | null = this.getParentNode(node);
            if (parent === null) {
                  this.treeviewService.deleteChildFolder(null, deleteNode!.name);
            } else {
                  const parentNode = this.flatNodeItemsList.get(parent);
                  this.treeviewService.deleteChildFolder(parentNode!, deleteNode!.name);
            }
            if (this.treeControl.dataNodes.length === 0) {
                  this.showJson = false;
            }
      }
}









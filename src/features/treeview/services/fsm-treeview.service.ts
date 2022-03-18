/*
 *  @Project:        FSM
 *  @Description:    This service is responsible for providing features that used by TreeView components.
 *  @Created:        18 Mar 2022
 *  @CreatedBy :     Ali Gorkem Ozturk
 */

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NodeModel} from '../models/node.model';

/**
 * This service is responsible for providing features that used by TreeView components.
 */
@Injectable()
export class FSMTreeviewService {

      /**
       * The constructor function of FSMTreeviewService.
       */
      constructor() {
            this.populate();
      }

      /** private variables - functions */

      /**
       * Populates the file and folder structure from Json file.
       */
      populate() {
            const items = this.populateStructure(FILEFOLDER_DATA, 0);
            // let it know about the changes
            this.itemsUpdated.next(items);
      }

      /**
       * It returns the items.
       * @private
       */
      private get getItems(): NodeModel[] {
            return this.itemsUpdated.value;
      }

      itemsUpdated = new BehaviorSubject<NodeModel[]>([]);

      /**
       * It populates the file folder structure within the object.
       * @param obj
       * @param level
       */
      populateStructure(obj: { [key: string]: any }, level: number): NodeModel[] {
            return Object.keys(obj).reduce<NodeModel[]>((accumulator, key) => {
                  const value = obj[key];
                  const node = new NodeModel();
                  node.name = key;

                  if (value != null) {
                        if (typeof value === 'object') {
                              node.children = this.populateStructure(value, level + 1);
                        } else {
                              node.name = value;
                        }
                  }

                  return accumulator.concat(node);
            }, []);
      }

      /**
       * It adds item to the list.
       * @param parent
       * @param name
       */
      addItemToList(parent: NodeModel, name: string) {
            if (parent.children) {
                  parent.children.push({name: name} as NodeModel);
                  this.itemsUpdated.next(this.getItems);
            }
      }

      /**
       * It updates the selected item in the list.
       * @param node
       * @param name
       */
      updateItem(node: NodeModel, name: string) {
            // todo: add null check
            node.name = name;
            this.itemsUpdated.next(this.getItems);
      }

      /**
       * This adds new node
       * @param node
       */
      addNewNode(node: NodeModel) {
            this.getItems.push(node);
            this.itemsUpdated.next(this.getItems);
      }

      /**
       * This adds new node to the parent.
       * @param parent
       * @param node
       */
      addNewNodeToParent(parent: NodeModel, node: NodeModel) {
            parent.children.push(node);
            this.itemsUpdated.next(this.getItems);
      }

      /**
       * This deletes an item from the list.
       * @param parent
       * @param name
       */
      deleteItem(parent: NodeModel, name: string) {
            if (parent.children) {
                  parent.children = parent.children.filter(c => c.name !== name);
                  this.itemsUpdated.next(this.getItems);
            }
      }

      /**
       * This delete a child folder from the list.
       * @param parent
       * @param name
       */
      deleteChildFolder(parent: NodeModel | null, name: string): void {
            if (parent === null) {
                  const newData = this.getItems.filter(a => {
                        return a.name !== name;
                  });
                  this.itemsUpdated.next(newData);
                  return;
            }
            // child folder
            if (parent.children) {
                  parent.children = parent.children.filter(c => c.name !== name);
                  this.itemsUpdated.next(this.getItems);
            }
      }
}

/**
 * It represents the data.
 */
const FILEFOLDER_DATA = {
};

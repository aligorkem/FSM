/*
 *  @Project:        FSM
 *  @Description:    This pipe is used to display the JSON file in a pretty format.
 *  @Created:        18 Mar 2022
 *  @CreatedBy :     Ali Gorkem Ozturk
 */

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
      name: 'prettyprint'
})
export class PrettyPrintPipe implements PipeTransform {

      /**
       * transform the data to pretty format.
       * @param val
       */
      transform(val: any) {
            return JSON.stringify(val, undefined, 4)
                  .replace(/ /g, '&nbsp;')
                  .replace(/\n/g, '<br/>');
      }

}

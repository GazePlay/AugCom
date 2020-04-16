import {Component, OnInit} from '@angular/core';
import {EditionService} from "../../services/edition.service";
import {ParametersService} from "../../services/parameters.service";
import {GeticonService} from "../../services/geticon.service";
import {Interaction} from "../../types";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  /**
   * the current Interaction index number
   * (by default:
   *      -1 = no interaction selected
   *      0 = click selected
   *      1 = longPress selected
   *      2 = doubleClick selected
   * )
   */
  currentInterractionNumber = -1;

  constructor(public getIconService: GeticonService, public parametersService: ParametersService, public editionService: EditionService) {
  }

  ngOnInit() {
  }

  isEventDisplayed() {
    return this.editionService.currentEditPage === 'Interactions';
  }

  /**
   * Return true if the action identified by actionId exists in the current interaction
   * return false otherwise
   * @param interractionId
   * @param actionId, the string identifying an action
   * @return true if the action identified by actionId exists in the current interaction, false otherwise
   */
  isPartOfTheInteraction(interactionId: string, actionId: string) {
    const currentInterraction: Interaction = this.editionService.interractionList.find(interaction => interaction.ID === interactionId);
    if (currentInterraction != null) {
      const res = currentInterraction.ActionList.find(x => x.ID === actionId);
      return res != null && res !== undefined;
    }
    return false;
  }

  getLabel(text: string) {
    switch (text) {
      case 'display':
        return 'ajouter à la phrase';
      case'say':
        return 'prononcer';
      case 'otherforms':
        return 'afficher les formes alternatives';
      case 'click' :
        return 'click';
      case'longPress':
        return 'appui long';
      case 'doubleClick':
        return 'double click';
    }

  }

  /**
   * Add the action identified by the actionId to the current interaction if it doesn't contain it already,
   * otherwise it delete it from the current interaction
   * @param interractionId
   * @param actionId, the string identifying an action
   */
  addOrRemoveToInteraction(interactionId: string, actionId: string) {
    const partOfCurrentInter = this.isPartOfTheInteraction(interactionId, actionId);

    const currentInterraction: Interaction = this.editionService.interractionList.find(interaction => interaction.ID === interactionId);

    if ((currentInterraction === null || currentInterraction === undefined) && !partOfCurrentInter) {
      this.editionService.interractionList.push({
        ID: interactionId,
        ActionList: [{ID: actionId, Action: actionId}]
      });
    } else if (!partOfCurrentInter) {
      currentInterraction.ActionList.push({ID: actionId, Action: actionId});
    } else if (partOfCurrentInter) {
      currentInterraction.ActionList = currentInterraction.ActionList.filter(x => x.ID !== actionId);
    }

  }

  /**
   * return the icon url corresponding to the string s
   * @param s, the string identifying the icon
   * @return the icon url
   */
  getIcon(s: string) {
    return this.getIconService.getIconUrl(s);
  }

}

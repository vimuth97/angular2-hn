import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../shared/services/settings.service';
import { NotificationService } from '../../shared/services/notification-service/notification.service';
import { Settings } from '../../shared/models/settings';

import { Howl } from 'howler';
import { SpeechService } from 'src/app/shared/services/speech-service/speech.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: Settings;
  sound = new Howl({
    src: ['./assets/audio/notification-success.wav']
  });

  constructor(
    private _settingsService: SettingsService,
    private _speechService: SpeechService,
    private notifyService: NotificationService
  ) {
    this.settings = this._settingsService.settings;
  }

  ngOnInit() {
    // let h1=    document.getElementsByTagName('h1');
    // for (let i = 0; i < h1.length; i++) {
    //   const element = h1[i];
    //   element.addEventListener('mouseover', (e)=>this.mouseOverEvent(e));
    //   element.addEventListener('mouseout', (e)=>this.mouseOutEvent);
    // }
    let tagNames = ['h1', 'h2', 'h3', 'label', 'button'];
    this.addEventListenersToElements(tagNames)
  }

  addEventListenersToElements(tagNames: string[]) {
    tagNames.forEach(tagName => {
      let elementList = document.getElementsByTagName(tagName);
      for (let i = 0; i < elementList.length; i++) {
        const element = elementList[i];
        element.addEventListener('mouseover', (e) => this.mouseOverEvent(e));
        element.addEventListener('mouseout', (e) => this.mouseOutEvent(e));
      }
    })
  }

  closeSettings() {
    this._settingsService.toggleSettings();
  }

  toggleOpenLinksInNewTab() {
    this._settingsService.toggleOpenLinksInNewTab();
  }

  selectTheme(theme) {
    this._settingsService.setTheme(theme);
  }

  changeTitleFont(val) {
    this._settingsService.setFont(val);
  }

  changeSpacing(val) {
    this._settingsService.setSpacing(val);
  }

  resetToDefault() {
    this.selectTheme('default');
    this.changeTitleFont("16");
    this.changeSpacing("0");
    this.notifyService.showSuccess("Reset to defaults successfully!", "Settings");
    this.sound.play();
    if (!this.settings.openLinkInNewTab) this.toggleOpenLinksInNewTab();
  }

  isDefault(): boolean {
    return this.settings.listSpacing == "0"
      && this.settings.openLinkInNewTab == true
      && this.settings.titleFontSize == "16"
      && this.settings.theme == "default"
  }

  changeTextToSpeech(val) {
    this._settingsService.setTextToSpeech(val);
  }

  // mouseOverRead(text: string) {
  //   if (!text) text = "not readable content";
  //   this._speechService.speak(text);
  // }

  // mouseAwayStopRead() {
  //   this._speechService.stopRead();
  // }

  mouseOverEvent(e) {
    console.log(e.target['innerText'])
    this._speechService.speak(e.target['innerText'] ?? "text unreadable");
  }

  mouseOutEvent(e) {
    this._speechService.stopRead();
  }


}

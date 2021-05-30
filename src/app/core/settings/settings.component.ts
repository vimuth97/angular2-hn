import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../shared/services/settings.service';
import { NotificationService } from '../../shared/services/notification-service/notification.service';
import { Settings } from '../../shared/models/settings';

import {Howl} from 'howler';

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

  constructor(private _settingsService: SettingsService, private notifyService : NotificationService) {
    this.settings = this._settingsService.settings;
  }

  ngOnInit() {
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

  changeTitleFont(val){
    this._settingsService.setFont(val);
  }

  changeSpacing(val){
    this._settingsService.setSpacing(val);
  }

  resetToDefault() {
    this.selectTheme('default');
    this.changeTitleFont("16");
    this.changeSpacing("0");
    this.notifyService.showSuccess("Updated successfully !!", "Settings");
    this.sound.play();
    if (!this.settings.openLinkInNewTab) this.toggleOpenLinksInNewTab();
  }

  isDefault():boolean{
    return this.settings.listSpacing=="0"
      &&this.settings.openLinkInNewTab==true
      &&this.settings.titleFontSize=="16"
      &&this.settings.theme=="default"
  }
}

import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../shared/services/settings.service';
import { Settings } from '../../shared/models/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor(private _settingsService: SettingsService) {
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
    if (!this.settings.openLinkInNewTab) this.toggleOpenLinksInNewTab();
  }

  isDefault():boolean{
    return this.settings.listSpacing=="0"
      &&this.settings.openLinkInNewTab==true
      &&this.settings.titleFontSize=="16"
      &&this.settings.theme=="default"
  }
}

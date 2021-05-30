import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../shared/services/settings.service';
import { NotificationService } from '../../shared/services/notification-service/notification.service';
import { Settings } from '../../shared/models/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor(
    private _settingsService: SettingsService,
    private notifyService : NotificationService,
    ) {
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

  showToasterSuccess(){
    this.notifyService.showSuccess("","Settings updated successfully !!");
  }

}

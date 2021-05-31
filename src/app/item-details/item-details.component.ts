import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { HackerNewsAPIService } from '../shared/services/hackernews-api.service';
import { SettingsService } from '../shared/services/settings.service';

import { Story } from '../shared/models/story';
import { Settings } from '../shared/models/settings';
import { SpeechService } from '../shared/services/speech-service/speech.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit, AfterViewInit {
  sub: Subscription;
  item: Story;
  errorMessage = '';
  settings: Settings;

  constructor(
    private _hackerNewsAPIService: HackerNewsAPIService,
    private _settingsService: SettingsService,
    private route: ActivatedRoute,
    private _speechService: SpeechService,
    private _location: Location
  ) {
    this.settings = this._settingsService.settings;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let itemID = +params['id'];
      this._hackerNewsAPIService.fetchItemContent(itemID).subscribe(item => {
        this.item = item;
        // let tagNames = ['a','p','h2', 'h3', 'label', 'button']
        // this.addEventListenersToElements(tagNames);
      }, error => this.errorMessage = 'Could not load item comments.');
    });
    window.scrollTo(0, 0);
    this._speechService.stopRead();
  }

  ngAfterViewInit() {

  }

  goBack() {
    this._location.back();
  }

  get hasUrl(): boolean {
    return this.item.url.indexOf('http') === 0;
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

  mouseOverEvent(e) {
    console.log(e.target['innerText'])
    this._speechService.speak(e.target['innerText'] ?? "text is not readable");
  }

  mouseOutEvent(e) {
    this._speechService.stopRead();
  }

  mouseOverRead(text: string) {
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = text;
    // Retrieve the text property of the element (cross-browser support)
    let result = temporalDivElement.textContent || temporalDivElement.innerText || "not readable content";
    if (!result) result = "not readable content"
    this._speechService.speak(result);
  }

  mouseAwayStopRead() {
    this._speechService.stopRead();
  }
}

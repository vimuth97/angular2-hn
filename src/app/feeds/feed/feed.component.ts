import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { HackerNewsAPIService } from '../../shared/services/hackernews-api.service';
import { Story } from '../../shared/models/story';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

export class FeedComponent implements OnInit, OnDestroy {
  typeSub: Subscription;
  pageSub: Subscription;
  intervalObserver: Subscription;
  items: Story[];
  feedType: string;
  pageNum: number;
  listStart: number;
  errorMessage = '';
  validPageNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  maxNewsPages = 10;
  maxOtherPages = 2;
  showToast: boolean = false;
  newItems: Story[];
  updateInterval: number = 120;  // seconds

  constructor(
    private _hackerNewsAPIService: HackerNewsAPIService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.typeSub = this.route
      .data
      .subscribe(data => {
        this.feedType = (data as any).feedType;
      });

    this.pageSub = this.route.params.subscribe(params => {

      if(Number.isInteger(+params['page']) && +params['page'] > 0) {
        if (['news', 'newest'].includes(this.feedType) && +params['page'] > this.maxNewsPages) {
          this.router.navigate([`/${this.feedType}`, `${this.maxNewsPages}`], {replaceUrl: true});
        }
        else if (['show', 'ask', 'jobs'].includes(this.feedType) && +params['page'] > this.maxOtherPages) {
          this.router.navigate([`/${this.feedType}`, `${this.maxOtherPages}`], {replaceUrl: true});
        }
      }
      else {
        this.router.navigate([`/${this.feedType}`, '1'], {replaceUrl: true});
      }
      // if (!this.validPageNumbers.includes(params['page'])){
      //   this.router.navigate([`/${this.feedType}`, '1'], {replaceUrl: true});
      // }
      this.pageNum = params['page'] ? +params['page'] : 1;
      console.log(`page: ${params['page']}`)
      this._hackerNewsAPIService.fetchFeed(this.feedType, this.pageNum)
        .subscribe(
          items => this.items = items,
          error => this.errorMessage = 'Could not load ' + this.feedType + ' stories.',
          () => {
            this.listStart = ((this.pageNum - 1) * 30) + 1;
            window.scrollTo(0, 0);
          }
        );
    });

    if (this.intervalObserver) this.intervalObserver.unsubscribe();

    this.intervalObserver = interval(this.updateInterval*1000).subscribe(number => {
      console.log(`Timer: ${number*2} mins`);
      this._hackerNewsAPIService.fetchFeed(this.feedType, this.pageNum)
        .subscribe(
          items => {
            if (items[0].id !== this.items[0].id) {
              this.newItems = items;
              console.log("New Feed Available!");
              this.showToast = true;
            }
            // this.showToast = true;
          },
          error => this.errorMessage = 'Could not load ' + this.feedType + ' stories.',
          () => {
            this.listStart = ((this.pageNum - 1) * 30) + 1;
            // window.scrollTo(0, 0);
          }
        );
    })
  }

  goToPage(newPageNumber: number) {
    // console.log(`this.pageNum: ${this.pageNum}`);
    console.log(newPageNumber);
    this.router.navigate([`/${this.feedType}`, `${newPageNumber}`]);
  }

  loadNewItems() {
    this.items = this.newItems;
    this.showToast = false;
  }

  ngOnDestroy(): void {
    if (!this.intervalObserver.closed) this.intervalObserver.unsubscribe();
  }
}

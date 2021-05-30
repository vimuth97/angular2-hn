import { Component, Input, OnInit } from '@angular/core';

import { Comment } from '../../shared/models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() isMainComment: boolean;
  collapse: boolean;
  readText:string;

  constructor() {}

  ngOnInit() {
    this.collapse = true;
    this.readText = "Show Replies";
  }
  changeCollapse(){
    console.log("change collapse function clicked");
    if(this.collapse ==true){
      this.collapse = false;
      this.readText = "Hide Replies";
    }
    else{
      this.collapse =true;
      this.readText = "Show Replies";
    }
  }
}

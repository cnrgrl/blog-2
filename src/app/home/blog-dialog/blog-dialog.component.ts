import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentService } from 'src/app/services/comment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.css'],
})
export class BlogDialogComponent implements OnInit {
  isUpdate: boolean = false;
  imageUrl: string = ';';
  title: string = ';';
  body: string = ';';
  commentData: any = ';';

  form = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    body: new FormControl(null, [Validators.required]),
  });

  constructor(
    private blogService: BlogService,
    private commentService: CommentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BlogDialogComponent>
  ) {
    if (data.isUpdate) {
      this.isUpdate = true;
      this.form.patchValue({
        title: data.blog.title,
        body: data.blog.body,
      });
    } else {
      this.imageUrl = data.blog.imageId.toString();
      this.title = data.blog.title;
      this.body = data.blog.body;
    }
  }

  ngOnInit(): void {
    this.commentService.getComments().subscribe((res) => {
      this.commentData = res.filter(
        (r: { postId: any }) => r.postId == this.data.blog.id
      );
      // debugger;
    });
  }
  onSubmit() {
    const request = {
      title: this.form.get('title')?.value,
      body: this.form.get('body')?.value,
      imageId: this.data.blog.imageId,
      userId: this.data.blog.userId,
    };
    this.blogService
      .UpdatePosts(this.data.blog.id, request)
      .subscribe((res) => {
        console.log(res);
        this.dialogRef.close();
      });
  }

  close() {
    this.dialogRef.close('kapandi');
  }
}

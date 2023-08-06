import {Component, OnInit} from "@angular/core";
import {BlogService} from "../services/blog.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-update-blog",
  templateUrl: "./update-blog.component.html",
  styleUrls: ["./update-blog.component.css"],
})
export class UpdateBlogComponent implements OnInit {
  title: string = "";
  body: string = "";
  blogid: any;
  blogObj: any;

  form = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    body: new FormControl(null, [Validators.required]),
  });
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blogid = this.route.snapshot.paramMap.get("blogId");
    this.blogService.getPost(this.blogid).subscribe((res) => {
      this.blogObj = res;
      this.form.patchValue({
        title: this.blogObj?.title,
        body: this.blogObj?.body,
      });
    });
  }
  onSubmit() {
    const request = {
      title: this.form.get("title")?.value,
      body: this.form.get("body")?.value,
      imageId: this.blogObj.imageId,
      userId: this.blogObj.userId,
    };
    this.blogService.UpdatePosts(this.blogObj.id, request).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl("home");
    });
  }
}

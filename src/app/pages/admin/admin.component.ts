
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoursesComponent } from "../courses/courses.component";
import { Strings } from '../../enum/strings.enum';

interface Course {
  id: number;
  title: string;
  description: string;
  image: string | null;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CoursesComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  courseForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    image: new FormControl('', [Validators.required])
  });

  courses: any[] = [];
  cover: string | null = null;

  onSubmit() {
    if (this.courseForm.valid) {
      console.log("Form Submitted", this.courseForm.value);
      this.saveCourse(this.courseForm.value);
      this.courseForm.reset();
      this.cover = null;
    } else {
      console.log("Form is invalid");
    }
  }

  deleteCourse(course:any){
    this.courses=this.courses.filter(course_item => course_item.id != course.id);
    this.setItem(this.courses);
  }

  saveCourse(formValue: any) {
    const data: Course = {
      ...formValue,
      image: this.cover ||null,
      id: this.courses.length + 1,
    };
    this.courses = [...this.courses, data];
    this.setItem(this.courses);
    console.log("Course stored to local storage", data);
  }

  setItem(data: Course[]) {
    localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(data));
  }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    const data = localStorage.getItem(Strings.STORAGE_KEY);
    if (data) {
      this.courses = JSON.parse(data);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cover = URL.createObjectURL(file);
      this.courseForm.patchValue({ image: file });
      this.courseForm.get('image')?.updateValueAndValidity();
    }
  }
}

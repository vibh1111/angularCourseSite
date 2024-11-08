import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  @Input() course:any;
  @Input() isDelete=false;
  @Output() del=new EventEmitter();
  deleteCourse(){
    this.del.emit(this.course);
  }
}

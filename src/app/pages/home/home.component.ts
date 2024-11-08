import { Component } from '@angular/core';
import { CoursesComponent } from "../courses/courses.component";
import { Strings } from '../../enum/strings.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CoursesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
courses: any[] = [];
ngOnInit(){
  this.getCourses();
  
}
getCourses(){
  const data=localStorage.getItem(Strings.STORAGE_KEY);
  console.log(data);
  if(data){
    this.courses=JSON.parse(data);
  }
}
}

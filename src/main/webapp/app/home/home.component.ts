import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';
import { CourseService } from 'app/shared/service/CourseService';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    classNeedToReg: CourseDto = new CourseDto();
    classNeedToUpdate: CourseDto = new CourseDto();
    classNameNeedToDel: string;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private courseService: CourseService
    ) {}

    //courses: CourseDto[] = [];
    coursesWithTN: CourseWithTNDto[] = [];

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
    /*
    getAllCourses() {
        this.courseService.getCourseInfo().subscribe(curDto => {
            if (!curDto) {
                this.courses = [];
            } else {
                this.courses = curDto;
            }
        });
    }
*/
    getAllCoursesWithTN() {
        this.courseService.getCourseInfoWithTN().subscribe(curDto => {
            if (!curDto) {
                this.coursesWithTN = [];
            } else {
                this.coursesWithTN = curDto;
            }
        });
    }

    updateChooseCourseWithCourseName() {
        this.courseService.update(this.classNeedToUpdate).subscribe();
        this.classNeedToUpdate = new CourseDto();
    }

    deleteChooseCourseWithCourseName() {
        this.courseService.delete(this.classNameNeedToDel).subscribe();
        this.classNameNeedToDel = '';
        this.clearAllCoursesWithTN();
    }

    addCourse() {
        this.courseService.addCourse(this.classNeedToReg).subscribe();
        this.classNeedToReg = new CourseDto();
    }
    /*
    clearAllCourses() {
        this.courses = [];
    }
*/
    clearAllCoursesWithTN() {
        this.coursesWithTN = [];
    }

    ClearUpdate() {
        this.classNeedToUpdate = new CourseDto();
    }

    ClearPost() {
        this.classNeedToReg = new CourseDto();
    }

    UpdateField() {
        if (this.classNeedToUpdate.courseName.length > 2) {
            for (let c of this.coursesWithTN) {
                if (c.courseName == this.classNeedToUpdate.courseName) {
                    this.UpdateNode(c);
                    break;
                }
            }
        }
    }

    UpdateNode(c) {
        this.classNeedToUpdate.courseName = c.courseName;
        this.classNeedToUpdate.courseContent = c.courseContent;
        this.classNeedToUpdate.courseLocation = c.courseLocation;
        this.classNeedToUpdate.teacherId = c.teacherId;
    }
}

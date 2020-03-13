import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-profile-list',
    templateUrl: './profile-list.component.html',
    styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent {
    @Output() select: EventEmitter<any> = new EventEmitter();
}
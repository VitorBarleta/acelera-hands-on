import { Component, Output, EventEmitter } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-profile-details',
    templateUrl: './profile-details.component.html',
    styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent {
    @Output() close: EventEmitter<any> = new EventEmitter();

    constructor(private toastr: ToastrService) { }

    showSuccessToast(): void {
        this.toastr.success('The profile has been saved')
    }
}
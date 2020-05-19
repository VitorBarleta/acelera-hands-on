import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
    public isSelected = false;

    public profiles: Array<any>;
    public profileDetail: any;

    constructor(private toastr: ToastrService) {
    }

    ngOnInit() {
    }

    public profileSelected(profile): void {
        this.isSelected = true;
    }

    public saveChanges(profile): void {
        this.toastr.success('Saved');
    }
}
import {
    Component,
    Output,
    EventEmitter,
    Input,
    ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'app-profile-list',
    templateUrl: './profile-list.component.html',
    styleUrls: ['./profile-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileListComponent {
    @Output() picked: EventEmitter<any> = new EventEmitter();

    @Input() profiles: Array<any>;
}
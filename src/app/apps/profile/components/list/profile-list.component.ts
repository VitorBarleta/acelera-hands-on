import { Profile } from './../../state/profile.model';
import {
    Component,
    Output,
    EventEmitter,
    Input,
    OnInit,
    ChangeDetectionStrategy,
    AfterViewChecked,
    ChangeDetectorRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-profile-list',
    templateUrl: './profile-list.component.html',
    styleUrls: ['./profile-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileListComponent implements OnInit, AfterViewChecked {
    @Output() select: EventEmitter<number> = new EventEmitter();

    @Input() profiles: Array<Profile>;

    public profilesDisplayed: Array<Profile>;
    public searchControl: FormControl = new FormControl('');

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.profilesDisplayed = this.profiles;

        this.searchControl.valueChanges.pipe(
            startWith(''),
            debounceTime(600),
            map(search => search.toLowerCase()),
            map(search => {
                return this.profiles.filter(profile => profile.name.toLocaleLowerCase().includes(search));
            })
        ).subscribe(filteredProfiles => this.profilesDisplayed = filteredProfiles);
    }

    ngAfterViewChecked() {
        this.cdr.markForCheck();
    }
}
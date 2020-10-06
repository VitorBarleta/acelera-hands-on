import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';

export interface Profile {
    id: ID;
    name: string;
    lastName: string;
    email: string;
    profilePicture: string;
    city: string;
    state: string;
    company: string;
    position: string;
    description: string;
}

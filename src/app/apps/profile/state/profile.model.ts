import { Entity } from '@common/seedwork/entity';

export interface Profile extends Entity {
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

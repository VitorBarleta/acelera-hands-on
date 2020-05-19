export interface Profile {
    id: number;
    name: string;
    lastName: string;
    email: string;
    profilePicture: string;
}

export interface ProfileDetail extends Profile {
    city: string;
    state: string;
    company: string;
    position: string;
    description: string;
}
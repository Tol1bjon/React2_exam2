export interface Users {
    name: string,
    email: string,
    job: string,
    age: any,
    avatar: string,
    status: boolean
}

export interface Data {
    data: Users[],
    loading: boolean
}
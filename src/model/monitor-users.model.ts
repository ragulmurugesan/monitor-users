export interface ICountry {
    code: string,
    name: string
}

export interface ICountryResponse {
    id: string,
    name: string,
    users: number
}

export enum MAP_KEYS {
    Country = "Country",
    Users = "Users"
}
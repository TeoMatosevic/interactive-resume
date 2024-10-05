export default interface Repository {
    id: number
    name: string
    full_name: string
    description: string
    readme: string
    languages: { [key: string]: string }
}

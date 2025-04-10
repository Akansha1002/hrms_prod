import ApiService from "./ApiService";

export async function apiGetSalaryStructureList<T, U extends Record<string, unknown>>({
    params: U,
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: 'resource/Salary Structure',
        method: 'get',

    })
} 

export async function apiGetSalaryStructureByName<T, U extends Record<string, unknown>>({
    name,
    params: U,
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `resource/Salary Structure/${name}`,
        method: 'get',
    })
}
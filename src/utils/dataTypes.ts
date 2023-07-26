export interface BookDataType {
    id:number;
    title:string;
    first_publish_year: string;
    number_of_pages_median:string;
    author_name: string;
    small_cover: string,
    medium_cover: string,
    large_cover: string,
    covers?:{
        S: string,
        M: string,
        L: string
    }
}
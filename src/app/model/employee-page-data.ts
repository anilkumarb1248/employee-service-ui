export class EmployeePageData {
    enablePaginationFlag:boolean = false;
    pageSize: number = 5;
    pageNumber: number = 0;
    sortOrder: string = "ASC"; // ASC or DESC
    sortingBy: string = "firstName";
    previousBtnDisableFlag: boolean = true;
    nextBtnDisableFlag: boolean = false;
    
    
}

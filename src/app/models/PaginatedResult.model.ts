export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;

  pageNumber: number;
  pageSize: number;

  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;

  previousPageNumber: number | null;
  nextPageNumber: number | null;
}

export interface Result<T> {
  success: boolean;
  data?: T | null;
  message?: string | null;
  errorCode?: string | null;
}

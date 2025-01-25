interface PaginationDataType {
  count: number
  rows: any[]
}

class Pagination {
  readonly limit: number
  readonly offset: number
  readonly page: number

  constructor(page: number, size: number = 10) {
    this.page = page
    this.limit = size
    this.offset = this.calculateOffset(page, size)
  }

  private calculateOffset(page: number, size: number): number {
    return page > 0 ? page * size : 0
  }

  public formatData(data: PaginationDataType) {
    const { rows } = data

    const totalPages = Math.ceil(rows.length / this.limit)

    return {
      totalItems: rows.length,
      items: rows,
      totalPages,
      currentPage: this.page > 0 ? this.page : 0
    }
  }
}

export { Pagination }

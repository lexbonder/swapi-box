class DataCleaner {
  constructor(url) {
    this.people = this.peopleCleaner(url)
  }

  async peopleCleaner(url) {
    const initialFetch = await fetch(url)
  }
}
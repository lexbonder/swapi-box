class DataCleaner {
  cleanData = async (category, rawArray) => {
    switch (category) {
      case 'people' :
        return await this.peopleCleaner(rawArray);
      case 'vehicles' :
        // vehicleCleaner(rawArray);
        break;
      case 'planets' :
        // planetCleaner(rawArray);
        break;
      default :
        return;
    }
  }

  async fetchApi(url) {
    const initialFetch = await fetch(url)
    const result = await initialFetch.json()
    return result;
  }

  peopleCleaner(peopleArray){
    const stuff = peopleArray.map( async (person) => {
      const homeworldData = await this.getWorldAndPop(person.homeworld)
      const species = await this.getSpecies(person.species)
      return await {
        name: person.name,
        species,
        ...homeworldData
      }
    })
    return Promise.all(stuff)
  }

  async getWorldAndPop(homeworldUrl) {
    const {name, population} = await this.fetchApi(homeworldUrl)
    return {homeworld: name, population}
  }

  async getSpecies(speciesUrl) {
    const {name} = await this.fetchApi(speciesUrl)
    return name
  }

}
export default DataCleaner;
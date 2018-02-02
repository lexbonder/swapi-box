class DataCleaner {
  constructor(fetchApi) {
    this.fetchApi = fetchApi;
  }

  cleanData = async (category, rawArray) => {
    switch (category) {
      case 'people' :
        return await this.peopleCleaner(rawArray, category);
      case 'vehicles' :
        return await this.vehicleCleaner(rawArray, category);
      case 'planets' :
        return await this.planetCleaner(rawArray, category);
      default :
        return;
    }
  }

  peopleCleaner(people, category){
    const cleanedPeople = people.map( async (person) => {
      const homeworldData = await this.getWorldAndPop(person.homeworld)
      const species = await this.getSpecies(person.species)
      return await {
        category,
        name: person.name,
        species,
        ...homeworldData,
      }
    })
    return Promise.all(cleanedPeople)
  }

  async getWorldAndPop(homeworldUrl) {
    const {name, population} = await this.fetchApi(homeworldUrl)
    return {homeworld: name, population}
  }

  async getSpecies(speciesUrl) {
    const {name} = await this.fetchApi(speciesUrl)
    return name
  }

  vehicleCleaner(vehicles, category){
    const cleanedVehicles = vehicles.map(vehicle => {
      return {
        category,
        name: vehicle.name,
        model: vehicle.model,
        vehicleClass: vehicle.vehicle_class,
        numOfPassengers: vehicle.passengers,
      }
    })
    return cleanedVehicles
  }

  planetCleaner(planets, category){
    const cleanedPlanets = planets.map( async (planet) => {
      const residents = await this.getResidents(planet.residents)
      return await {
        category,
        name: planet.name,
        terrain: planet.terrain,
        population: planet.population,
        climate: planet.climate,
        residents,
      }
    })
    return Promise.all(cleanedPlanets) 
  }

  async getResidents(residentUrls) {
    if (!residentUrls.length) {
      return ['None']
    } else {
      const names = await residentUrls.map(async (residentUrl) => {
        const {name} = await this.fetchApi(residentUrl)
        return name;
      })
      return Promise.all(names)
    }
  }
}
export default DataCleaner;
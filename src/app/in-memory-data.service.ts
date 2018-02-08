import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Mr. Nice' },
	  { id: 2, name: 'Narco' },
	  { id: 3, name: 'Bombasto' },  
	  { id: 4, name: 'Celeritas' },
	  { id: 5, name: 'RubberMan' },
	  { id: 6, name: 'Dynama' },
	  { id: 7, name: 'Dr IQ' },
	  { id: 8, name: 'Magma' },
	  { id: 9, name: 'Tornado' }
    ];
    return {heroes};
  }
}
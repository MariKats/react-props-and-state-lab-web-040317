import React from 'react';
import Filters from './Filters';
import PetBrowser from './PetBrowser';
import { getAll } from '../data/pets';
const ALL_PETS = getAll();

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: ALL_PETS,
      adoptedPets: [],
      filters: {
        type: '',
      }
    };
  }

  handleAdopt = (id) => {
    this.setState({
      adoptedPets: [...this.state.adoptedPets, id]
    })
  }

  onFilterChange = (value) => {
    this.setState({
      filters: {
        type: value
      }
    }, console.log(value))
  }

  fetchPets = () => {
    let url = '/api/pets';
    let type = this.state.filters.type;

    if ( type !== 'all' && type != '') {
      url += `?type=${type}`;
    }

    fetch(url)
    .then(res => res.json())
    .then(pets => this.setState({ pets }))
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters filters={this.state.filters} onChangeType={this.onFilterChange} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} adoptedPets={this.state.adoptedPets} onAdoptPet={this.handleAdopt}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

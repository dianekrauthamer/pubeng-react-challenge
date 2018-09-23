/* Diane Krauthamer
Mediavine Coding Challenge
September 23, 2018 */ 
  

import React from 'react'
// Added 'Select' from ./components
import { Checkbox, Repeatable, Text, Textarea, Select } from './components' 
import api from './mockApi'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        title: '',
        rating: 0,
        year: 2010,
        description: '',
        upcoming: true, 
        cast: [],
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.Input = this.Input.bind(this)
  }

  /**
   * 
   */
  handleChange(delta) {
    this.setState(({ data }) => ({ data: { ...data, ...delta }}))
  }

  /**
   * 
   */
  async handleUpdate(publish = false) {
    const { data } = this.state
    const results = await api.post({ ...data, publish })
    console.log('Content updated!')
    return results
  }

  /**
   * 
   */
  Input({ children, iterable, label, id }) {
    const handleChange = value => {
      this.handleChange({ [id]: value })
    }
    const value = this.state.data[id]
    let props = {}

    if(iterable) {
      props = {
        id,
        value,
        onCreate: (item) => handleChange([...value, {
          ...item,
          id: Math.floor(Math.random() * 100000),
        }]),
        onUpdate: (item) => handleChange(value.map(prev => {
          if(item.id === prev.id) {
            return item
          }
          return prev
        })),
        onDelete: (id) => handleChange(value.filter(prev => prev.id !== id))
      }
    } else {
      props = {
        id,
        value,
        onBlur: () => this.handleUpdate(false),
        onChange: e => handleChange(e.target.value),
      }
    }
    return (
      <div className="Form-Group">
        <div className="Form-Label">{label}</div>
        {children(props)}
      </div>
    )
  }
/*Added release year with select element*/
  render() {
    const { Input } = this
    return (
      <div className="Form">
        <Input label="Title" id="title">
          {props => <Text {...props} />}
        </Input>
        <Input label="Upcoming" id="upcoming">
          {props => <Checkbox {...props} />}
        </Input>
        <Input label="Description" id="description">
          {props => <Textarea {...props} />}
        </Input>
        <Input label="Cast" iterable id="cast">
          {props => <Repeatable {...props} />}
        </Input>
        <Input label="Year Released" iterable id="year">
          {props => <Select {...props} />}
        </Input>
        <Input label="Rating" id="rating">
          {props => <Text {...props} />}
        </Input>
        <button onClick={() => this.handleUpdate(true)}>
          {'Publish'}
        </button>
      </div>
    )
  }
}

export default App

import React, { Component } from 'react';

import dataSet from './dataSet';
import './App.css';

class App extends Component {
  state = {
    num: null,
    found: false,
    tries: 0,
  };

  handleSubmit(ev) {
    ev.preventDefault();
    const num = parseInt(ev.target.num.value);
    const searchType = ev.target.searchType.value;
    if (searchType === 'linear') {
      this.setState(this.linearSearch(dataSet, num));
    }
    if (searchType === 'binary') {
      const tempData = dataSet.sort((a, b) => a - b);
      this.setState(this.binarySearch(tempData, num));
    }
  }

  linearSearch(arr, num) {
    let tries = 0;
    for (let i = 0; i < arr.length; i++) {
      tries++;
      if (arr[i] === num) {
        return {
          num,
          found: true,
          tries,
        };
      }
    }
    return {
      num,
      found: false,
      tries,
    };
  }

  binarySearch(arr, num, start = 0, end = arr.length - 1, tries = 0) {
    tries++;
    if (start > end) {
      return {
        num,
        found: false,
        tries,
      };
    }
    const index = Math.floor((start + end) / 2);
    const midVal = arr[index];
    if (num === midVal) {
      return {
        num,
        found: true,
        tries,
      };
    } else if (num > midVal) {
      return this.binarySearch(arr, num, index + 1, end, tries);
    } else if (num < midVal) {
      return this.binarySearch(arr, num, start, index - 1, tries);
    }
  }

  render() {
    const { num, found, tries } = this.state;
    return (
      <div className="App">
        <form onSubmit={(ev) => this.handleSubmit(ev)}>
          <h2 className="mb-3 mt-3 col_theme">Enter Number for Search</h2>
          <div className="inputDiv mb-3 mt-3">
            <label htmlFor="num">Number </label>
            <input type="number" id="num" name="num" required></input>
          </div>
          <div className="inputDiv mb-3 mt-3">
            <label htmlFor="linear">Linear Search</label>
            <input
              type="radio"
              name="searchType"
              id="linear"
              value="linear"
              required
            ></input>
          </div>
          <div className="inputDiv mb-3 mt-3">
            <label htmlFor="binary">Binary Search</label>
            <input
              type="radio"
              name="searchType"
              id="binary"
              value="binary"
            ></input>
          </div>
          {num !== null && (
            <div>
              <h2>Searching for {num}</h2>
              <h2>{found ? `Found In ${tries} tries` : `Not Found`}</h2>
            </div>
          )}
          <div class="text-center mb-2">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
export default App;

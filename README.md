# node-data-preprocessing
[![Build Status](https://img.shields.io/travis/maael/node-data-preprocessing.svg)](https://travis-ci.org/maael/node-data-preprocessing)
[![Code Climate](https://img.shields.io/codeclimate/github/maael/node-data-preprocessing.svg)](https://codeclimate.com/github/maael/node-data-preprocessing)

A node package for data preprocessing.

The package exposes the individual steps, as well as one to the entire process.

## Individual Steps
### csvParser
```js
var data = process.csvParser(options);
```
#### options
List of options with defaults -
```js
var options = {
    path: ''
};
```
##### path
**String -** The path to the data.

### extract
```js
var extracted = process.extract(options, data);
```
#### options
List of options with defaults -
```js
var options = {
    useHeaders: 'true'
};
```
##### useHeaders
**Boolean -**  Indicates whether the first row of data is the heading or not.
**Note -** The heading will not be used in the process. Setting it to true simply strips the first row from the data.

### cleanse
```js
var cleansed = process.cleanse(options, data);
```
#### options
List of options with defaults -
```js
var options = {
    formats: [],
    ranges: []
};
```
##### formats
**Array -** of strings representing the formats that the fields should be. The string should match the result of ```typeof()``` applied to the expected data format.

##### ranges
**Array -** of objects, such that { 'validatorName': 'validatorValue' }.

###### validators
Available validators -
- **greater** - expects ```value, min```, returns ```value > min```;
- **greaterOrEqual** - expects ```value, min```, returns ```value >= min```;
- **less** - expects ```value, max```, returns ```value > max```;
- **lessOrEqual** - expects ```value, max```, returns ```value > max```;
- **between** - expects ```value, range```, where range is a string such that ```'min-max'```, and returns ```greater(value, min) && less(value, max)```;
- **betweenOrEqual** - expects ```value, range```, where range is a string such that ```'min-max'```, and returns ```greaterOrEqual(value, min) && lessOrEqual(value, max)```;

### standardise
```js
var standardised = process.standardise(options, data);
```
#### options
List of options with defaults -
```js
var options = {
    min: 0.1,
    max: 0.9,
    standardisationMethod: 'default'
};
```
##### min
**number -** The minimum value for the standardisation.

##### max
**number -** The maximum value for the standardisation.

##### standardisationMethod
**string -** Can be ```default```, ```normal``` or ```ss``` (Sum of Squares).

##### ignore
**Array -** of integers representing columns of the data to ignore while standardising. They will retain their non-standardised values.

### divide
```js
var divided = process.divide(options, data);
```
#### options
List of options with defaults -
```js
var options = {
    split: [60, 20, 20]
};
```
##### split
**Array -** Indicates how many subsets the data should be split into, and with what weighting. 

### process (combined)
```js
var result = process.process(options);
```
#### options
The combined proces takes all the options that the individual steps take, in one object.
```js
var options = {
    path: '',
    useHeaders: true,
    formats: [],
    min: 0.1,
    max: 0.9,
    standardisationMethod: 'default',
    split: [60, 20, 20]
};
```

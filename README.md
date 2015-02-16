# node-data-preprocessing
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
    formats: []
};
```
##### formats
**Array -** of strings representing the formats that the fields should be. The string should match the result of ```typeof()``` applied to the expected data format.

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

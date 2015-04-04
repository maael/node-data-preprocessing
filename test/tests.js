var process = require('..'),
  chai = require('chai'),
  should = chai.should();
describe('Normal Pre-processing', function() {
  describe('Processes', function() {
    var csv, extracted, cleansed, standardised, processed;
    describe('#csvParser', function() {
      it('should extract csv from a file correctly correctly', function() {
        var fs = require('fs'),
            source = fs.readFileSync('data/CWData.csv').toString();
        csv = process.csvParser(source);
        csv.should.be.length(598);
        csv.should.be.a('array');
      });
    });
    describe('#extraction', function() {
      it('should return csv as array', function() {
        extracted = process.extract({}, csv);
        extracted.should.be.an('array');
        for(var i = 0; i < extracted.length; i++) {
          extracted[i].should.be.length(597);
        }
      });
    });
    describe('#cleanse', function() {
      it('should cleanse data of invalid types', function() {
        var formats = ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'],
            ranges = [{ 'greaterOrEqual': 0 }, {}, {}, {}, { 'greaterOrEqual': 0 }, {}, {}, {}, {}];
        cleansed = process.cleanse({formats: formats, ranges: ranges}, extracted);
        for(var i = 0; i < cleansed.length; i++) {
          for(var j = 0; j < cleansed[i].length; j++) {
            cleansed[i][j].should.be.a(formats[i]);
          }
        }
      });
    });
    describe('#standardisation', function() {
      it('should standardise between 0.1-0.9 with default method', function() {
        var formats = ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'],
            ignore = [8];
        standardised = process.standardise({formats: formats, ignore: ignore}, cleansed);
        for(var i = 0; i < standardised.length; i++) {
          for(var j = 0; j < standardised[i].length; j++) {
            if(ignore.indexOf(i) === -1) {
              standardised[i][j].should.be.within(0.1, 0.9);
            }
          }
        }
      });
      it('should standardise between 0-1 with normal method', function() {
        /* TODO */
        var formats = ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'],
            ignore = [8];
        standardised = process.standardise({formats: formats, standardiseMethod: 'normal'}, cleansed);
        for(var i = 0; i < standardised.length; i++) {
          for(var j = 0; j < standardised[i].length; j++) {
            standardised[i][j].should.be.within(0, 1);
          }
        }
      });
      it('should standardise between - with sum of squares method', function() {
        /* TODO */
        var formats = ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'],
            ignore = [8];
        standardised = process.standardise({formats: formats, standardiseMethod: 'ss'}, cleansed);
        for(var i = 0; i < standardised.length; i++) {
          for(var j = 0; j < standardised[i].length; j++) {
            if(ignore.indexOf(i) === -1) {
              standardised[i][j].should.be.within(0.1, 0.9);
            }
          }
        }
      });
    });
    describe('#divide', function() {
      it('should correctly divide data into subsets', function() {
        var splits = [60, 20, 20],
            divided = process.divide({splits: splits}, standardised);
        divided.should.be.an('array');
        divided.should.be.length(3);
        for(var i = 0; i < divided.length; i++) {
          divided[i].should.be.length(9);
          for(var j = 0; j < divided[i].length; j++) {
            divided[i][j].length.should.be.closeTo((csv.length * (splits[i]/100)), 2);
          }
        }
      });
    });
    describe('#process', function() {
      it('should correctly perform the entire data preprocessing', function() {
        var splits = [60, 20, 20],
          formats = ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'],
          ignore = [8];
          ranges = [{ 'greaterOrEqual': 0 }, {}, {}, {}, { 'greaterOrEqual': 0 }, {}, {}, {}, {}],
          test = process.process({path: 'data/CWData.csv', formats: formats, ranges: ranges});
        test.should.be.length(splits.length);
        for(var i = 0; i < test.length; i++) {
          for(var j = 0; j < test.length; j++) {
            test[i][j].length.should.be.closeTo((csv.length * (splits[i]/100)), 2);
          }
        }
        for(var i = 0; i < test.length; i++) {
          for(var j = 0; j < test[i].length; j++) {
            for(var k = 0; k < test[i][j].length; k++) {
              test[i][j][k].should.be.a(formats[i]);
            }
          }
        }
        for(var i = 0; i < test.length; i++) {
          for(var j = 0; j < test[i].length; j++) {
            for(var k = 0; k < test[i][j].length; k++) {
              if(ignore.indexOf(j) === -1) {
                test[i][j][k].should.be.within(0.1, 0.9);
              }
            }
          }
        }
      });
    });
  });
});
describe('Big Integer Pre-processing', function() {
  describe('Processes', function() {
    var csv, extracted, cleansed, standardised, processed;
    describe('#csvParser', function() {
      it('should extract csv from a file correctly correctly', function() {
        var fs = require('fs'),
          source = fs.readFileSync('data/bigInt.csv').toString();
        csv = process.csvParser(source);
        csv.should.be.length(4);
        csv.should.be.a('array');
      });
    });
    describe('#extraction', function() {
      it('should return csv as array', function() {
        extracted = process.extract({}, csv);
        extracted.should.be.an('array');
        for(var i = 0; i < extracted.length; i++) {
          extracted[i].should.be.length(3);
        }
      });
    });
    describe('#cleanse', function() {
      it('should cleanse data of invalid types', function() {
        var formats = ['object', 'number', 'number'],
            ranges = [{ 'greaterOrEqual': 0 }, { 'betweenOrEqual': '0-100' }, { 'betweenOrEqual': '0-100' }];
        cleansed = process.cleanse({formats: formats, ranges: ranges}, extracted);
        for(var i = 0; i < cleansed.length; i++) {
          for(var j = 0; j < cleansed[i].length; j++) {
            cleansed[i][j].should.be.a(formats[i]);
          }
        }
      });
    });
    describe('#standardisation', function() {
      it('should standardise between 0.1-0.9 with default method', function() {
        var formats = ['object', 'number', 'number'];
        standardised = process.standardise({formats: formats}, cleansed);
        for(var i = 0; i < standardised.length; i++) {
          for(var j = 0; j < standardised[i].length; j++) {
            standardised[i][j].should.be.within(0.1, 0.9);
          }
        }
      });
    });
  });
});
var process = require('..'),
  chai = require('chai'),
  should = chai.should();
describe('Coursework', function() {
  describe('#process', function() {
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
        var formats = ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'];
        cleansed = process.cleanse({formats: formats}, extracted);
        for(var i = 0; i < cleansed.length; i++) {
          for(var j = 0; j < cleansed[i].length; j++) {
            cleansed[i][j].should.be.a(formats[i]);
          }
        }
      });
    });
    describe('#standardisation', function() {
      it('should standardise between 0.1-0.9 with default method', function() {
        var formats = ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'];
        standardised = process.standardise({formats: formats}, cleansed);
        for(var i = 0; i < standardised.length; i++) {
          for(var j = 0; j < standardised[i].length; j++) {
            standardised[i][j].should.be.within(0.1, 0.9);
          }
        }
      });
      it('should standardise between 0-1 with normal method', function() {
        /* TODO */
        var formats = ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'];
        standardised = process.standardise({formats: formats, standardiseMethod: 'normal'}, cleansed);
        for(var i = 0; i < standardised.length; i++) {
          for(var j = 0; j < standardised[i].length; j++) {
            standardised[i][j].should.be.within(0, 1);
          }
        }
      });
      it('should standardise between - with sum of squares method', function() {
        /* TODO */
        var formats = ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'];
        standardised = process.standardise({formats: formats, standardiseMethod: 'ss'}, cleansed);
        for(var i = 0; i < standardised.length; i++) {
          for(var j = 0; j < standardised[i].length; j++) {
            standardised[i][j].should.be.within(0, 1);
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
            divided[i][j].length.should.be.closeTo((csv.length * (splits[i]/100)), 1);
          }
        }
      });
    });
    describe('#process', function() {
      it('should correctly perform the entire data preprocessing', function() {
        var splits = [60, 20, 20],
          formats = ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'],
          test = process.process({path: 'data/CWData.csv', formats: formats});
        test.should.be.length(splits.length);
        for(var i = 0; i < test.length; i++) {
          for(var j = 0; j < test.length; j++) {
            test[i][j].length.should.be.closeTo((csv.length * (splits[i]/100)), 1);
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
              test[i][j][k].should.be.within(0.1, 0.9);
            }
          }
        }
      });
    });
  });
});
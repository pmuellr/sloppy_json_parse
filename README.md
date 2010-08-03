`sloppy_json_parse` - a parser for a sloppier kind of JSON
========================================================

The function `sloppy_json_parse()` is a fork of the `json_parse()` function 
available at 
[http://www.json.org/json_parse.js](http://www.json.org/json_parse.js).  The
API for the two functions is the same, besides the format of the text that
they parse.

`sloppy_json_parse()` parses a language similar to JSON, but with these 
differences:

* commas are optional

* comments start with the '#' character and end with the end of the line

* strings which match the regex `/[$_A-Z][$\w]*/i` don't need to be quoted,
except that the strings "null", "true", and "false" must always be quoted.
The regex is the syntax of JavaScript identifiers.

Re-inspired by [CoffeeScript](http://jashkenas.github.com/coffee-script/#objects_and_arrays)
after [thinking about it](http://pmuellr.blogspot.com/2008/08/better-than-json.html) 
[for a short while](http://pmuellr.blogspot.com/2007/03/json-array-vulnerability.html).

examples
--------

----

### sloppy JSON ###
        [1 2 3 dogs cats]

### equivalent JSON ###
        [1, 2, 3, "dogs", "cats"]

----

### sloppy JSON ###
        {x:y z:a}

### equivalent JSON ###
        {"x":"y", "z":"a"}

----

### sloppy JSON ###
        {
            # some properties of the object
            a: z                             # z is a string!
            b: y                             # so is y
            c: [1 2 3]
            d: [                             # d is an array
                {
                    abc: true
                    def: false
                }                            # end of this inner object
                
                {
                    xyz: null
                    uvw: [101 202 303]       # weird numbers
                }
                
                [4 5 6]                      # last element
            ]
            # end of the properties
        }

### equivalent JSON ###
        {
            "a": "z",
            "b": "y",
            "c": [1, 2, 3],
            "d": [
                {
                    "abc": true,
                    "def": false
                },
                
                {
                    "xyz": null,
                    "uvw": [101, 202, 303]
                },
                
                [4, 5, 6]
            ]
        }


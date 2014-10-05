var assert = require('assert');
var is = require('is2');
var makeObjConst = require('../lib/const-obj').makeObjConst;
var makePropConst = require('../lib/const-obj').makePropConst;

describe('makeObjConst()', function() {
    it('Should make an object\'s properties constant.', function() {
        var obj = {
            a: 111,
            b: '222',
            c: { d: 333 } };
        makeObjConst(obj);
        obj.a = 222;            // this is legal, but has no effect
        assert.ok(obj.a === 111);
        obj.b = 'Hmm';          // this is legal, but has no effect
        assert.ok(obj.b === '222');
        obj.c.d = true;
        assert.ok(obj.c.d === 333);
    });
});

describe('makePropConst()', function() {
    it('Should make a single property constant.', function() {
        var obj = { alpha: '0', beta: false };
        makePropConst(obj, 'alpha');
        obj.alpha = 678;
        assert.ok(obj.alpha === '0');
        obj.beta = true;
        assert.ok(obj.beta === true);
    });
});

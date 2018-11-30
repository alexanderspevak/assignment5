
var fs = require('fs')
var path = require('path')
var assert=require('assert');

class SomeFuncs {
    constructor(name, surname, someNum) {
        this.name = name;
        this.surname = surname
        this.someNum = someNum
    };
    getName() {
        return this.name
    }
    getSurname() {
        if (this.surname == 'Doe') {
            return 'Connor'
        } else {
            return this.surname
        }
    }
    getSomeNum() {
        var self = this
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (self.someNum == 5) {
                    resolve(self.someNum)
                } else {
                    reject('error, should be 5')
                }
            }, 50)
        })
    }

}

var someFuncs = new SomeFuncs('John', 'Doe', 5)

var app = {}

app['someFuncs.getName=>should return John'] = function (callback) {
    var name = someFuncs.getName()
    assert.equal('John',name)
    callback()
}

app['someFuncs.getsurname=>should return Doe'] = function (callback) {
    var surname = someFuncs.getSurname()
    assert.equal('Doe',surname)
    callback()
}

app['someFuncs.getSomeNum=>should return 5'] = function (callback) {
    someFuncs.getSomeNum()
        .then((num) => {
            assert.equal(5,num)
            callback();
        })
        .catch((num) => {
            assert.equal(5,num)
            callback()
        })
}





module.exports = app;
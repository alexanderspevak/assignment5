var test = {}

test.unitTests = require('../app/lib');
test.init = function () {
    var limit = 0;
    var failed = 0
    var tests = test.countTested();
    var errors = []
    for (var key in test.unitTests) {
        if (test.unitTests.hasOwnProperty(key)) {
            var currentFuncName = key
            var currentFunc = test.unitTests[key]
            try {
                currentFunc(function () {
                    console.log(currentFuncName + ' ' + 'works')
                    limit++
                    if (limit == tests) {
                        test.createReport(limit, failed, errors)
                    }

                });
            } catch (e) {
                console.log('\x1b[33m%s\x1b[0m', key)
                limit++
                failed++
                errors.push({
                    'function': key,
                    'error': e
                })
                if (limit == tests) {
                    test.createReport(limit, failed, errors)
                }
            }

        }
    }
}
test.countTested = function () {
    var tests = 0;
    for (var key in test.unitTests) {
        if (test.unitTests.hasOwnProperty(key)) {
            tests++
        }
    }
    return tests
}
test.createReport = function (limit, failed, err) {
    console.log('---------------------------------------', limit)
    console.log('------------START REPORT-------------');
    console.log(' ');
    console.log('tested :', limit)
    console.log('failed ', failed)
    console.log(err);
    console.log(' ');
    console.log('------------END REPORT-------------');

}

test.init();

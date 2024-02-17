const { errorHandler } = require('../../middlewares/errorHandler')

describe('ErrorHandler', () => {
    test('errorHandler is a function', () => {
        expect(typeof errorHandler).toBe('function')
    }) 
}) 
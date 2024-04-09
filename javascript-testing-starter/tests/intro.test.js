import { describe, test, it, expect } from 'vitest'
import { calculatorAverage, factorialNumber, fizzBuzz, max } from '../src/intro'

// describe('max', () => {
//   it('should return fisrt agurment',() => {
//     // AAA
//     // Arrange
//     // Act -> action
//     const result = max(2,1)
//     // Assert
//     expect(result).toBe(2)
//   });

//   it('should return second agurment',() => {
//     // AAA
//     // Arrange
//     // Act -> action
//     const result = max(1,2)
//     // Assert
//     expect(result).toBe(2)
//   });

//   it('should return first agurment if two agurment equal',() => {
//     // AAA
//     // Arrange
//     // Act -> action
//     const result = max(1,1)
//     // Assert
//     expect(result).toBe(1)
//   });
// })

// //exercises

// describe('Function fizzBuzz', () => {
//   it('should return FizzBuzz',() => {
//     // Assert
//     expect(fizzBuzz(15)).toBe('FizzBuzz')
//   });

//   it('should return Fizz',() => {
//     // Assert
//     expect(fizzBuzz(27)).toBe('Fizz')
//   });

//   it('should return Buzz',() => {
//     // Assert
//     expect(fizzBuzz(50)).toBe('Buzz')
//   });

//   it('should return string of agurment',() => {
//     // Assert
//     expect(fizzBuzz('iu900@')).toBe('iu900@')
//   });
// })


//tdd 
// test driven development
// viết test case trước -> implement cho function
// 100% case sẽ được cover by test case
// describe('calculatorAverage', () => {
//   it('should return NaN if given empty array', () => {
//     // AAA
//     // Arrange
//     // Act -> action
//     const result = calculatorAverage([])
//     // Assert
//     expect(result).toBe(NaN)
//   })

//   it('should return average length of array', () => {
//     // AAA
//     // Arrange
//     // Act -> action
//     const result = calculatorAverage([1,2,3,4])
//     // Assert
//     expect(result).toBe(2.5)
//   })
// })


//0! = 1
//1! = 1
//2! = 2*1
//3! = 3*2*1

describe('factorialNumber', () => {
  it('should return 1 if given 0', () => {
    // AAA
    // Arrange
    // Act -> action
    const result = factorialNumber(0)
    // Assert
    expect(result).toBe(1)
  })

  it('should return -1 if given agument not typeof number', () => {
    // AAA
    // Arrange
    // Act -> action
    const result = factorialNumber([])
    // Assert
    expect(result).toBe(-1)
  })

  it('should return 2 if given 2', () => {
    // AAA
    // Arrange
    // Act -> action
    const result = factorialNumber(2)
    // Assert
    expect(result).toBe(2)
  })

  it('should return 6 if given 3', () => {
    // AAA
    // Arrange
    // Act -> action
    const result = factorialNumber(3)
    // Assert
    expect(result).toBe(6)
  })

  it('should return 24 if given 4', () => {
    // AAA
    // Arrange
    // Act -> action
    const result = factorialNumber(4)
    // Assert
    expect(result).toBe(24 )
  })
})
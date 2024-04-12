import { it, expect, describe } from 'vitest'
import { calculateDiscount, getCoupons } from '../src/core'

// describe('test reference', () => {
//   it('test object', () => {
//     const result = { name: 'tin' }
//     expect(result).toEqual({ name: 'tin' })
//     // false -> bởi vì to be chỉ dùng cho primitive type
//   })
// })

// describe('test suite', () => {
//   it('test case', () => {
//     const result = 'The requested file was not found !'
//     //Loose (to general)
//     expect(result).toBeDefined()
//     //Tight(to specific)
//     expect(result).toBe('The requested file was not found.')
//     // Better assertion
//     expect(result).toMatch(/not found/i)
//   })
// })

// describe('test suite', () => {
//   it('test case', () => {
//     const result = [1,2,3,4]
//     //Loose (to general)
//     expect(result).toBeDefined()
//     //Tight(to specific)
//     expect(result).toEqual(expect.arrayContaining([1,2,3,4]))
//     // Better assertion
//     expect(result).toHaveLength(4)
//   })
// }
// )

describe('getCoupons', () => {
  it('should return an array', () => {
    const result = getCoupons()
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })
  it('object in array should have two properties', () => {
    const result = getCoupons()
    result.forEach(item => {
      expect(item).toHaveProperty('code')
      expect(item).toHaveProperty('discount')
    })
  })
  it('object in array should have valid discount value', () => {
    const result = getCoupons()
    result.forEach(item => {
      expect(item).toHaveProperty('discount')
      expect(item.discount).toBeGreaterThanOrEqual(0)
      expect(typeof item.discount === 'number').toBe(true)
    })
  })
})

describe('calculatorDiscount', () => {
  it('should return valid discount', () => {
    const result = calculateDiscount(100, 'SAVE10')
    expect(typeof result === 'number').toBe(true)
    expect(result).toBe(90)
  })
  it('should handle non-numeric input', () => {
    const result = calculateDiscount('100', 'SAVE10')
    expect(result).toBe('Invalid price')
  })

  it('should handle negative input', () => {
    const result = calculateDiscount(-10, 'SAVE10')
    expect(result).toBe('Invalid price')
  })

  it('should handle discountCode input', () => {
    const result = calculateDiscount(10, 12312312)
    expect(result).toMatch(/invalid/i)
  })
})

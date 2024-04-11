import { it, expect, describe } from 'vitest'

describe('test reference', () => {
  it('test object', () => {
    const result = { name: 'tin' }
    expect(result).toEqual({ name: 'tin' }) 
    // false -> bởi vì to be chỉ dùng cho primitive type
  })
})

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

describe('test suite', () => {
  it('test case', () => {
    const result = [1,2,3,4]
    //Loose (to general)
    expect(result).toBeDefined()
    //Tight(to specific)
    expect(result).toEqual(expect.arrayContaining([1,2,3,4]))
    // Better assertion
    expect(result).toHaveLength(4)
  })
}
)


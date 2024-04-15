import { it, expect, describe, beforeEach, beforeAll, afterEach } from "vitest";
import {
  Stack,
  calculateDiscount,
  canDrive,
  fetchData,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  validateUserInput,
} from "../src/core";

describe("test reference", () => {
  it("test object", () => {
    const result = { name: "tin" };
    expect(result).toEqual({ name: "tin" });
    // false -> bởi vì to be chỉ dùng cho primitive type
  });
});

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

describe("test suite", () => {
  it("test case", () => {
    const result = [1, 2, 3, 4];
    //Loose (to general)
    expect(result).toBeDefined();
    //Tight(to specific)
    expect(result).toEqual(expect.arrayContaining([1, 2, 3, 4]));
    // Better assertion
    expect(result).toHaveLength(4);
  });
});

describe("getCoupons", () => {
  it("should return an array", () => {
    const result = getCoupons();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
  it("object in array should have two properties", () => {
    const result = getCoupons();
    result.forEach((item) => {
      expect(item).toHaveProperty("code");
      expect(item).toHaveProperty("discount");
    });
  });
  it("object in array should have valid discount value", () => {
    const result = getCoupons();
    result.forEach((item) => {
      expect(item).toHaveProperty("discount");
      expect(item.discount).toBeGreaterThanOrEqual(0);
      expect(typeof item.discount === "number").toBe(true);
    });
  });
});

describe("calculatorDiscount", () => {
  it.each([
    {
      price: 100,
      discountCode: "SAVE10",
      result: 90,
    },
    {
      price: "100",
      discountCode: "SAVE10",
      result: "Invalid price",
    },
    {
      price: -10,
      discountCode: "SAVE10",
      result: "Invalid price",
    },

    {
      price: 10,
      discountCode: 12312312,
      result: /invalid/i,
    },
  ])(
    "should return $result when price = $price and discountCode = $discountCode",
    ({ price, discountCode, result }) => {
      if (result.toString().includes("/invalid/i")) {
        expect(calculateDiscount(price, discountCode)).toMatch(result);
      } else {
        expect(calculateDiscount(price, discountCode)).toBe(result);
      }
    },
  );
  // it('should return valid discount', () => {
  //   const result = calculateDiscount(100, 'SAVE10')
  //   expect(typeof result === 'number').toBe(true)
  //   expect(result).toBe(90)
  // })
  // it('should handle non-numeric input', () => {
  //   const result = calculateDiscount('100', 'SAVE10')
  //   expect(result).toBe('Invalid price')
  // })

  // it('should handle negative input', () => {
  //   const result = calculateDiscount(-10, 'SAVE10')
  //   expect(result).toBe('Invalid price')
  // })

  // it('should handle discountCode input', () => {
  //   const result = calculateDiscount(10, 12312312)
  //   expect(result).toMatch(/invalid/i)
  // })
});

describe("validateUserInput", () => {
  it.each([
    {
      username: "tinnguyen",
      age: 19,
      result: "Validation successful",
    },
    {
      username: 123,
      age: 10,
      result: /invalid/i,
    },
    {
      username: "12",
      age: 10,
      result: /invalid/i,
    },
    {
      username: "tinnguyen",
      age: 10,
      result: /invalid/i,
    },
    {
      username: "nhattin",
      age: "10",
      result: /invalid/i,
    },
    {
      username: "12",
      age: "10",
      result: "Invalid username, Invalid age",
    },
  ])(
    "should return $result when username = $username and age = $age",
    ({ username, age, result }) => {
      if (result.toString().includes("/invalid/i")) {
        expect(validateUserInput(username, age)).toMatch(result);
      } else {
        expect(validateUserInput(username, age)).toBe(result);
      }
    },
  );
  // it('should return invalid error when username invalid', () => {
  //   expect(validateUserInput('12', 10)).toMatch(/invalid/i)
  //   expect(validateUserInput(123, 10)).toMatch(/invalid/i)
  // })
  // it('should return invalid error when age invalid', () => {
  //   expect(validateUserInput('tinnguyen', 10)).toMatch(/invalid/i)
  //   expect(validateUserInput('nhattin', '10')).toMatch(/invalid/i)
  // })

  // it('should return message error when two input error', () => {
  //   expect(validateUserInput('12', '10')).toBe('Invalid username, Invalid age')
  // })

  // it('should return validate success if valid value', () => {
  //   expect(validateUserInput('tin nguyen', 19)).toBe('Validation successful')
  // })
});

describe("isPriceInRange", () => {
  it.each([
    {
      price: 100,
      min: 0,
      max: 100,
      result: true,
    },
    {
      price: -10,
      min: 0,
      max: 100,
      result: false,
    },
    {
      price: 50,
      min: 0,
      max: 100,
      result: true,
    },
  ])(
    "should return $result when price = $price, min = $min, max = $max",
    ({ price, min, max, result }) => {
      expect(isPriceInRange(price, min, max)).toBe(result);
    },
  );
  // it('should return false if price out of range', () => {
  //   expect(isPriceInRange(-10, 0, 100)).toBe(false)
  //   expect(isPriceInRange(210, 0, 100)).toBe(false)
  // })

  // it('should return true if price in range', () => {
  //   expect(isPriceInRange(100, 0, 100)).toBe(true)
  //   expect(isPriceInRange(0, 0, 100)).toBe(true)
  // })

  // it('should return true if price is within the range', () => {
  //   expect(isPriceInRange(50, 0, 100)).toBe(true)
  // })
});

describe("isValidUsername", () => {
  it.each([
    {
      username: "tinnguyen",
      result: true,
    },
    {
      username: "tin12345",
      result: true,
    },
    {
      username: undefined,
      result: false,
    },
  ])(
    "should return $result when username = $username",
    ({ username, result }) => {
      expect(isValidUsername(username)).toBe(result);
    },
  );
  // it('should return false if length of username out of range', () => {
  //   expect(isValidUsername('nguyennhattingdfgdf')).toBe(false)
  //   expect(isValidUsername('12')).toBe(false)
  // })

  // it('should return true if length of username is in range', () => {
  //   expect(isValidUsername('tinnguyen')).toBe(true)
  //   expect(isValidUsername('tin12345')).toBe(true)
  // })

  // it('should return false if invalid value of username out of range', () => {
  //   expect(isValidUsername(undefined)).toBe(false)
  //   expect(isValidUsername(null)).toBe(false)
  //   expect(isValidUsername(123)).toBe(false)
  // })
});

describe("canDrive", () => {
  it.each([
    {
      age: 15,
      country: "US",
      result: false,
    },
    {
      age: 16,
      country: "US",
      result: true,
    },
    {
      age: 17,
      country: "US",
      result: true,
    },
    {
      age: 16,
      country: "UK",
      result: false,
    },
    {
      age: 17,
      country: "UK",
      result: true,
    },
    {
      age: 18,
      country: "UK",
      result: true,
    },
  ])(
    "should return $result when age is $age and country is $country",
    ({ age, country, result }) => {
      expect(canDrive(age, country)).toBe(result);
    },
  );
  // it('should return false if age is less than legal driving age', () => {
  //   expect(canDrive(15, 'US')).toBe(false)
  // })

  // it('should return invalid message if country code is invalid', () => {
  //   expect(canDrive(15, 'VN')).toMatch(/invalid/i)
  //   expect(canDrive(16, 123)).toMatch(/invalid/i)
  // })

  // it('should return invalid message if age is invalid', () => {
  //   expect(canDrive('15', 'US')).toMatch(/invalid/i)
  // })

  // it('should return true message if age >= legal driving age', () => {
  //   expect(canDrive(18, 'US')).toBe(true)
  //   expect(canDrive(16, 'US')).toBe(true)
  // })

  // it('should return false message if age < legal driving age', () => {
  //   expect(canDrive(15, 'US')).toBe(false)
  // })
});

describe("fetchData", () => {
  it("should return an array", async () => {
    try {
      const result = await fetchData();
      expect(result).toEqual([1, 2, 3]);
    } catch (error) {
      expect(error).toHaveProperty("message");
    }
  });
});

describe("test suite", () => {
  beforeAll(() => {
    console.log("beforeAll call");
  });
  beforeEach(() => {
    console.log("beforeEach call");
  });

  afterEach(() => {
    console.log("afterEach call");
  });
  it("test case", () => {});
  it("test case", () => {});
});

describe("stack", () => {
  let stack;
  beforeEach(() => {
    stack = new Stack();
    stack.push(1);
    stack.push(2);
  });

  afterEach(() => {
    stack.clear();
  });
  it("push item to the stack", () => {
    expect(stack.size()).toBe(2);
  });
  it("pop item should remove item from the stack", () => {
    const popItem = stack.pop();
    expect(popItem).toBe(2);
    expect(stack.size()).toBe(1);
  });
  it("pop item should throw an error if stack is empty", () => {
    const stack = new Stack();
    expect(() => {
      stack.pop();
    }).toThrow(/empty/i);
  });

  it("peek item should return the top item of the stack", () => {
    const peekItem = stack.peek();
    expect(peekItem).toBe(2);
  });

  it("peek item should throw an error if stack is empty", () => {
    const stack = new Stack();
    expect(() => {
      stack.peek();
    }).toThrow(/empty/i);
  });

  it("isEmpty should return true if stack is empty", () => {
    const stack = new Stack();
    expect(stack.isEmpty()).toBe(true);
  });

  it("isEmpty should return false if stack is not empty", () => {
    expect(stack.isEmpty()).toBe(false);
  });

  it("size should return the size of the stack", () => {
    expect(stack.size()).toBe(2);
  });

  it("clear should clear the stack", () => {
    stack.clear();
    expect(stack.size()).toBe(0);
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getDiscount,
  getPriceInCurrency,
  getShippingInfo,
  isOnline,
  login,
  renderPage,
  signUp,
  submitOrder,
} from "../src/mocking";
import { getExchangeRate } from "../src/libs/currency";
import { getShippingQuote } from "../src/libs/shipping";
import { trackPageView } from "../src/libs/analytics";
import { charge } from "../src/libs/payment";
import { sendEmail } from "../src/libs/email";
import security from "../src/libs/security";

vi.mock("../src/libs/currency");
vi.mock("../src/libs/shipping");
vi.mock("../src/libs/analytics");
vi.mock("../src/libs/payment");
vi.mock("../src/libs/email", async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    sendEmail: vi.fn(),
  };
});

// describe('mocking', () => {
//   it('mocking', () => {
//     const greet = vi.fn()
//     //mockReturnValue -> return 1 value
//     //mockResolveValue -> return value in promise
//     //mockImplementation -> can write logic
//     greet.mockImplementation(name => `hello ${name}`)
//     const result = greet('tin')
//     expect(greet).toHaveBeenCalled()
//     expect(greet).toBeCalledTimes(1)
//     expect(result).toBe('hello tin')
//   })
// })

//exercise
//create a mock for the following function
//sendText(message) {}
//call the mock function
//assert that the function was called
//assert that the result is 'ok'

// describe('Exercise', () => {
//   it('sendText', () => {
//     const sendText = vi.fn()
//     sendText.mockImplementation((message) => message)
//     const result = sendText('ok')
//     expect(sendText).toHaveBeenCalled()
//     expect(sendText).toBeCalledTimes(1)
//     expect(result).toBe('ok')
//   })
// })

describe("getPriceInCurrency", () => {
  it("should return price in target currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);
    const price = getPriceInCurrency(10, "AUD");
    expect(price).toBe(15);
  });
});

describe("getShippingInfo", () => {
  it("should return price in target currency", () => {
    vi.mocked(getShippingQuote).mockReturnValue({
      cost: 10,
      estimatedDays: 2,
    });
    const result = getShippingInfo("description");
    expect(result).toBe("Shipping Cost: $10 (2 Days)");
  });

  it("should return error message in target currency", () => {
    vi.mocked(getShippingQuote).mockReturnValue("");
    const result = getShippingInfo("description");
    expect(result).toBe("Shipping Unavailable");
  });
});

describe("renderPage", () => {
  it("should return content", async () => {
    const result = await renderPage();
    expect(result).toBe("<div>content</div>");
  });

  it("should call analytics", async () => {
    await renderPage();
    expect(trackPageView).toHaveBeenLastCalledWith("/home");
  });
});

describe("SubmitOrder", () => {
  it("should return success", async () => {
    vi.mocked(charge).mockReturnValue({ status: "success" });
    const result = await submitOrder(
      { totalAmount: 10 },
      { creditCardNumber: "123" },
    );
    expect(result).toEqual({ success: true });
  });

  it("should return payment error", async () => {
    vi.mocked(charge).mockReturnValue({ status: "failed" });
    const result = await submitOrder(
      { totalAmount: 10 },
      { creditCardNumber: "123" },
    );
    expect(result).toHaveProperty("error");
    expect(result.error).toBe("payment_error");
  });
});

describe("signUp", () => {
  it("should return false if email is invalid", async () => {
    const result = await signUp("12321");
    expect(result).toBe(false);
  });

  it("should return true if email is valid", async () => {
    const result = await signUp("tin@gmail.com");
    expect(result).toBe(true);
  });

  it("should send the welcome email if email valid", async () => {
    const result = await signUp("tin@gmail.com");
    expect(sendEmail).toHaveBeenCalledOnce();
    const args = vi.mocked(sendEmail).mock.calls[0];
    expect(args[0]).toBe("tin@gmail.com");
    expect(args[1]).toBe("Welcome aboard!");
  });
});

describe("login", () => {
  it("should email the one-time login code", async () => {
    const spy = vi.spyOn(security, "generateCode");
    await login("tin@gmail.com");
    const securityCode = spy.mock.results[0].value.toString();
    expect(sendEmail).toHaveBeenCalledWith("tin@gmail.com", securityCode);
  });
});

describe("isOnline", () => {
  it("should return false if current hour is outside opening hours", () => {
    vi.setSystemTime(new Date("2022-01-01 07:00:00"));
    expect(isOnline()).toBe(false);
  });

  it("should return true if current hour is inside opening hours", () => {
    vi.setSystemTime(new Date("2024-01-01 20:01:00"));
    expect(isOnline()).toBe(true);
  });
});

describe("getDiscount", () => {
  it("should return discount if date and month are valid", () => {
    vi.setSystemTime(new Date("12-25-2022"));
    expect(getDiscount()).toBe(0.2);
  });

  it("should return 0 if date and month not valid", () => {
    vi.setSystemTime(new Date("2024-01-01"));
    expect(getDiscount()).toBe(0);
  });
});

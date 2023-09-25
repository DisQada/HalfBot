// Date: 2023-9-24
// Author: Generated by GoCodeo.

const { asNumber } = require("../../../src/func/colour");

describe("asNumber", () => {
    describe("positive cases", () => {
        it('should return a number when a string starting with "#" is provided', () => {
            const result = asNumber("#ffffff");
            expect(result).toBe(16777215);
        });

        it("should return the same number when a number is provided", () => {
            const result = asNumber(16777215);
            expect(result).toBe(16777215);
        });
    });

    describe("negative cases", () => {
        it("should return NaN when an invalid string is provided", () => {
            const result = asNumber("invalid");
            expect(result).toBe(0);
        });

        it("should return NaN when a non-number value is provided", () => {
            const result = asNumber("xyz");
            expect(result).toBe(0);
        });
    });

    describe("edge cases", () => {
        it("should return 0 when an empty string is provided", () => {
            const result = asNumber("");
            expect(result).toBe(0);
        });

        it("should return 0 when 0 is provided", () => {
            const result = asNumber(0);
            expect(result).toBe(0);
        });

        // it("should return the maximum safe integer when Number.MAX_SAFE_INTEGER is provided", () => {
        //     const result = asNumber(Number.MAX_SAFE_INTEGER);
        //     expect(result).toBe(Number.MAX_SAFE_INTEGER);
        // });

        // it("should return the minimum safe integer when Number.MIN_SAFE_INTEGER is provided", () => {
        //     const result = asNumber(Number.MIN_SAFE_INTEGER);
        //     expect(result).toBe(Number.MIN_SAFE_INTEGER);
        // });

        // it("should return the maximum value of a 32-bit signed integer when Number.MAX_VALUE is provided", () => {
        //     const result = asNumber(Number.MAX_VALUE);
        //     expect(result).toBe(2147483647);
        // });

        // it("should return the minimum value of a 32-bit signed integer when Number.MIN_VALUE is provided", () => {
        //     const result = asNumber(Number.MIN_VALUE);
        //     expect(result).toBe(0);
        // });

        // it("should return the maximum value of a 32-bit signed integer when Infinity is provided", () => {
        //     const result = asNumber(Infinity);
        //     expect(result).toBe(2147483647);
        // });

        // it("should return the minimum value of a 32-bit signed integer when -Infinity is provided", () => {
        //     const result = asNumber(-Infinity);
        //     expect(result).toBe(-2147483648);
        // });
    });
});

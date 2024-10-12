const unitTestingTask = require("./unitTestingTask.js");
describe("unitTestingTask", () => {
  describe("leadingZeroes function functionality", () => {
    it("should add leading zeroes to meet the required length", () => {
      expect(unitTestingTask.leadingZeroes(5, 3)).toBe("005");
      expect(unitTestingTask.leadingZeroes(123, 5)).toBe("00123");
      expect(unitTestingTask.leadingZeroes(0, 4)).toBe("0000");
    });

    it("should return the value if the length is equal or less than the length defined", () => {
      expect(unitTestingTask.leadingZeroes(1234, 3)).toBe("1234");
      expect(unitTestingTask.leadingZeroes(56, 2)).toBe("56");
    });

    it("should default to a length of 2 if the second argument is not provided", () => {
      expect(unitTestingTask.leadingZeroes(9)).toBe("09");
      expect(unitTestingTask.leadingZeroes(100)).toBe("100");
    });
  });
  describe("unitTestingTask function functionality", () => {
    it("should format date correctly for valid format and date", () => {
      const format = "YYYY-MM-dd";
      const date = new Date("2024-10-10");
      const result = unitTestingTask(format, date);
      expect(result).toBe("2024-10-10");
    });

    it("should use the current date if no date is provided", () => {
      const format = "YYYY";
      const result = unitTestingTask(format);
      const currentYear = new Date().getFullYear().toString();
      expect(result).toBe(currentYear);
    });

    it("should throw error if format is not a string", () => {
      expect(() => unitTestingTask(123, new Date())).toThrow(TypeError);
      expect(() => unitTestingTask(123, new Date())).toThrow(
        "Argument `format` must be a string"
      );
    });

    it("should throw error if date is not a valid type", () => {
      expect(() => unitTestingTask("YYYY-MM-dd", {})).toThrow(TypeError);
      expect(() => unitTestingTask("YYYY-MM-dd", {})).toThrow(
        "Argument `date` must be instance of Date or Unix Timestamp or ISODate String"
      );
    });

    it("should format using a timestamp correctly", () => {
      const format = "YYYY-MM-dd";
      const timestamp = Date.now();
      const date = new Date(timestamp);
      const result = unitTestingTask(format, timestamp);
      expect(result).toBe(date.toISOString().split("T")[0]);
    });

    it("should return a registered format if format matches a registered one", () => {
      unitTestingTask.register("shortDate", "MM-dd");
      const result = unitTestingTask("shortDate", new Date("2024-10-10"));
      expect(result).toBe("10-10");
    });
  });
  describe("lang function functionality", () => {
    it("should set the English language correctly with months and weekdays", () => {
      unitTestingTask.lang("en", {
        _months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_"
          ),
        months: function (date) {
          return this._months[date.getMonth()];
        },
        _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split(
          "_"
        ),
        monthsShort: function (date) {
          return this._monthsShort[date.getMonth()];
        },
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        meridiem: function (hours, isLower) {
          return hours > 11 ? (isLower ? "pm" : "PM") : isLower ? "am" : "AM";
        },
      });

      expect(unitTestingTask.lang()).toBe("en");

      const testDate = new Date("2024-10-12T15:30:00");

      expect(unitTestingTask._languages["en"].months(testDate)).toBe("October");
      expect(unitTestingTask._languages["en"].monthsShort(testDate)).toBe(
        "Oct"
      );
      expect(unitTestingTask._languages["en"].weekdays[testDate.getDay()]).toBe(
        "Saturday"
      );
      expect(
        unitTestingTask._languages["en"].weekdaysShort[testDate.getDay()]
      ).toBe("Sat");
      expect(
        unitTestingTask._languages["en"].meridiem(testDate.getHours(), false)
      ).toBe("PM");
      expect(
        unitTestingTask._languages["en"].meridiem(testDate.getHours(), true)
      ).toBe("pm");
    });
  });
  describe("register function functionality", () => {
    it("should register a new formatter correctly", () => {
      const name = "customFormatter";
      const format = "YYYY-MM-DD";

      const registeredFormatter = unitTestingTask.register(name, format);

      expect(unitTestingTask._formatters[name]).toBeDefined();
      expect(unitTestingTask._formatters[name]).toBe(registeredFormatter);
    });
  });
  describe("formatters function functionality", () => {
    it("should return the correct formatter keys", () => {
      unitTestingTask._formatters = {
        date: {},
        time: {},
        datetime: {},
      };

      const result = unitTestingTask.formatters();
      expect(result).toEqual(["date", "time", "datetime"]);
    });
    it("should return the correct keys when some formatters are added", () => {
      unitTestingTask._formatters = {
        number: {},
      };
      const result1 = unitTestingTask.formatters();
      expect(result1).toEqual(["number"]);

      unitTestingTask._formatters["currency"] = {};

      const result2 = unitTestingTask.formatters();
      expect(result2).toEqual(["number", "currency"]);
    });
  });
});

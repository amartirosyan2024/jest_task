// import MockDate from "mockdate";
const unitTestingTask = require("./unitTestingTask.js");
describe("unitTestingTask", () => {
  describe("unitTestingTask functionality", () => {
    describe("invalid arguments", () => {
      it("should throw a TypeError with this message 'Argument `format` must be a string' if format is falsy", () => {
        expect(() => {
          unitTestingTask();
        }).toThrowError(new TypeError("Argument `format` must be a string"));
      });

      it("should throw a TypeError with this message 'Argument `format` must be a string' if format is not string ", () => {
        expect(() => {
          unitTestingTask(12);
        }).toThrowError(new TypeError("Argument `format` must be a string"));
      });

      it("Argument `date` must be instance of Date or Unix Timestamp or ISODate String' if date is invalid ", () => {
        expect(() => {
          unitTestingTask("YY", {});
        }).toThrowError(
          new TypeError(
            "Argument `date` must be instance of Date or Unix Timestamp or ISODate String"
          )
        );
      });
    });

    describe("valid arguments", () => {
      const StringDateFourDigitYear = "12.12.2021";
      const DateDateFourDigitYear = new Date(StringDateFourDigitYear);

      const StringDateFiveDigitYear = "12.12.20212";
      const DateDateFiveDigitYear = new Date(StringDateFiveDigitYear);

      const StringDateThreeDigitYear = "12.12.202";
      const DateDateThreeDigitYear = new Date(StringDateThreeDigitYear);

      const StringDateOneDigitYear = "12.12.2";
      const DateDateOneDigitYear = new Date(StringDateOneDigitYear);

      const StringDateTwoDigitMonth = "12.12.2011";
      const DateDateTwoDigitMonth = new Date(StringDateTwoDigitMonth);

      const StringDateOneDigitMonth = "2.12.2011";
      const DateDateOneDigitMonth = new Date(StringDateOneDigitMonth);

      const StringDateOneDigitDay = "2.8.2011";
      const DateDateOneDigitDay = new Date(StringDateOneDigitDay);

      const StringDateTwoDigitsDay = "2.12.2011";
      const DateDateTwoDigitsDay = new Date(StringDateTwoDigitsDay);

      const StringDateTwoDigitsHour = "2023-09-01T14:30:00";
      const DateDateTwoDigitsHour = new Date(StringDateTwoDigitsHour);

      const StringDateOneDigitHour = "2023-09-01T04:30:00";
      const DateDateOneDigitHour = new Date(StringDateOneDigitHour);

      const StringDateTwoDigitsUSAHour = "2023-09-01T12:30:00";
      const DateDateTwoDigitsUSAHour = new Date(StringDateTwoDigitsUSAHour);

      const StringDateOneDigitUSAHour = "2023-09-01T02:30:00";
      const DateDateOneDigitUSAHour = new Date(StringDateOneDigitUSAHour);

      const StringDateOneDigitMinute = "2023-09-01T02:02:00";
      const DateDateOneDigitMinute = new Date(StringDateOneDigitMinute);

      const StringDateTwoDigitsMinute = "2023-09-01T02:30:00";
      const DateDateTwoDigitsMinute = new Date(StringDateTwoDigitsMinute);

      const StringDateTwoDigitsSecond = "2023-09-01T14:30:45";
      const DateDateTwoDigitsSecond = new Date(StringDateTwoDigitsSecond);

      const StringDateOneDigitSecond = "2023-09-01T14:30:05";
      const DateDateOneDigitSecond = new Date(StringDateOneDigitSecond);

      const StringDateThreeDigitMillisecond = "2023-09-01T14:30:45.123";
      const DateDateThreeDigitMillisecond = new Date(
        StringDateThreeDigitMillisecond
      );

      const StringDateOneDigitMillisecond = "2023-09-01T14:30:45.003";
      const DateDateOneDigitMillisecond = new Date(
        StringDateOneDigitMillisecond
      );

      const StringPostMeridiem = "2023-09-01T12:30:00";
      const DatePostMeridiem = new Date(StringPostMeridiem);

      const StringAnteMeridiem = "2023-09-01T03:30:00";
      const DateAnteMeridiem = new Date(StringAnteMeridiem);

      const FormatTypes = {
        YYYY: "YYYY",
        YY: "YY",
        MMMM: "MMMM",
        MMM: "MMM",
        MM: "MM",
        M: "M",
        DDD: "DDD",
        DD: "DD",
        D: "D",
        dd: "dd",
        d: "d",
        HH: "HH",
        H: "H",
        hh: "hh",
        h: "h",
        mm: "mm",
        m: "m",
        ss: "ss",
        s: "s",
        ff: "ff",
        f: "f",
        A: "A",
        a: "a",
        ZZ: "ZZ",
        Z: "Z",
      };

      describe("date is provided as a Date type", () => {
        describe("year validity", () => {
          describe("YYYY format validity", () => {
            describe("given year has 4 digits", () => {
              it("should return the given years digits length", () => {
                const result = unitTestingTask(
                  FormatTypes.YYYY,
                  DateDateFourDigitYear
                );
                expect(result).toHaveLength(4);
              });

              it("should end with the full year", () => {
                const result = unitTestingTask(
                  FormatTypes.YYYY,
                  DateDateFourDigitYear
                );
                expect(result.endsWith("2021")).toBe(true);
              });
            });
            describe("given year has more than 4 digits", () => {
              it("should return the given years digits length", () => {
                const result = unitTestingTask(
                  FormatTypes.YYYY,
                  DateDateFiveDigitYear
                );
                expect(result).toHaveLength(5);
              });

              it("should end with the full year", () => {
                const result = unitTestingTask(
                  FormatTypes.YYYY,
                  DateDateFiveDigitYear
                );
                expect(result.endsWith("20212")).toBe(true);
              });
            });
            describe("given year has less than 4 digits", () => {
              it("should return the given years digits length", () => {
                const result = unitTestingTask(
                  FormatTypes.YYYY,
                  DateDateThreeDigitYear
                );
                expect(result).toHaveLength(3);
              });

              it("should end with the full year", () => {
                const result = unitTestingTask(
                  FormatTypes.YYYY,
                  DateDateFiveDigitYear
                );
                expect(result.endsWith("20212")).toBe(true);
              });
            });
          });
          describe("YY format validity", () => {
            describe("given year has more than 2 digits", () => {
              it("should have the length equal to 2", () => {
                const result = unitTestingTask(
                  FormatTypes.YY,
                  StringDateFourDigitYear
                );
                expect(result).toHaveLength(2);
              });
              it("should end with the given years last 2 chars", () => {
                const result = unitTestingTask(
                  FormatTypes.YY,
                  StringDateFourDigitYear
                );
                expect(result.endsWith("21")).toBe(true);
              });
            });
            describe("given year has less than 2 digits", () => {
              it("should have the length equal to 2", () => {
                const result = unitTestingTask(
                  FormatTypes.YY,
                  DateDateOneDigitYear
                );
                expect(result).toHaveLength(2);
              });

              it("should end with the given year's character", () => {
                const result = unitTestingTask(
                  FormatTypes.YY,
                  StringDateOneDigitYear
                );
                expect(result.endsWith("2")).toBe(true);
              });

              it("should append right amount of 0's at the start", () => {
                const result = unitTestingTask(
                  FormatTypes.YY,
                  StringDateOneDigitYear
                );
                expect(result.startsWith("0".repeat(1))).toBe(true);
              });
            });
          });
        });
        describe("month validity", () => {
          describe("MMMM format validity", () => {
            it("should return the full name of the month", () => {
              const result = unitTestingTask("MMMM", DateDateTwoDigitMonth);
              expect(result).toBe("December");
            });
          });
          describe("MMM format validity", () => {
            it("should return the partial name of the month", () => {
              const result = unitTestingTask("MMM", DateDateTwoDigitMonth);
              expect(result).toBe("Dec");
            });
          });
          describe("MM format validity", () => {
            describe("given month has 2 digits", () => {
              it("should have the length equal to 2", () => {
                const result = unitTestingTask("MM", DateDateTwoDigitMonth);
                expect(result).toHaveLength(2);
              });
              it("should end with the given month", () => {
                const result = unitTestingTask("MM", DateDateTwoDigitMonth);
                expect(result.endsWith("12")).toBe(true);
              });
            });
            describe("given month has 1 digit", () => {
              it("should have the length equal to 2", () => {
                const result = unitTestingTask("MM", DateDateOneDigitMonth);
                expect(result).toHaveLength(2);
              });
              it("should end with the given month", () => {
                const result = unitTestingTask("MM", DateDateOneDigitMonth);
                expect(result.endsWith("2")).toBe(true);
              });

              it("should append the right amount of 0's at the start", () => {
                const result = unitTestingTask("MM", DateDateOneDigitMonth);
                expect(result.startsWith("0".repeat(1))).toBe(true);
              });
            });
          });
          describe("M format validity", () => {
            it("should return the right value with a given month", () => {
              const result = unitTestingTask("M", DateDateOneDigitMonth);
              expect(result).toBe("2");
            });
          });
        });
        describe("weekday validity", () => {
          describe("DDD validity", () => {
            it("return the correct full weekday name", () => {
              const result = unitTestingTask("DDD", DateDateTwoDigitsDay);
              expect(result).toBe("Saturday");
            });
          });
          describe("DD validity", () => {
            it("return the correct partial weekday name", () => {
              const result = unitTestingTask("DD", DateDateTwoDigitsDay);
              expect(result).toBe("Sat");
            });
          });
          describe("D validity", () => {
            it("return the correct partial weekday name", () => {
              const result = unitTestingTask("D", DateDateTwoDigitsDay);
              expect(result).toBe("Sa");
            });
          });
        });
        describe("day validity", () => {
          describe("dd validity", () => {
            describe("has 2 digits", () => {
              it("should return the length equal to 2", () => {
                const result = unitTestingTask(
                  FormatTypes.dd,
                  DateDateTwoDigitsDay
                );
                expect(result).toHaveLength(2);
              });
              it("should end with the given month", () => {
                const result = unitTestingTask(
                  FormatTypes.dd,
                  DateDateTwoDigitsDay
                );
                expect(result.endsWith("12")).toBe(true);
              });
            });
            describe("has 1 digit", () => {
              it("should return the length equal to 2", () => {
                const result = unitTestingTask(
                  FormatTypes.dd,
                  DateDateOneDigitDay
                );
                expect(result).toHaveLength(2);
              });
              it("should end with the given month", () => {
                const result = unitTestingTask(
                  FormatTypes.dd,
                  DateDateOneDigitDay
                );
                expect(result.endsWith("8")).toBe(true);
              });
              it("should append the one 0 at the start", () => {
                const result = unitTestingTask(
                  FormatTypes.dd,
                  DateDateOneDigitDay
                );
                expect(result.startsWith("0".repeat(1))).toBe(true);
              });
            });
          });
          describe("d validity", () => {
            it("should return the given day", () => {
              const result = unitTestingTask(
                FormatTypes.d,
                StringDateOneDigitDay
              );
              expect(result).toBe("8");
            });
          });
        });
        describe("hour validity", () => {
          describe("HH validity", () => {
            describe("has 2 digits", () => {
              it("should the length be equal to 2", () => {
                const result = unitTestingTask(
                  FormatTypes.HH,
                  DateDateTwoDigitsHour
                );
                expect(result).toHaveLength(2);
              });
              it("should end with the given value", () => {
                const result = unitTestingTask(
                  FormatTypes.HH,
                  DateDateTwoDigitsHour
                );
                expect(result.endsWith("14")).toBe(true);
              });
            });
            describe("has 1 digit", () => {
              it("should the length be equal to 2", () => {
                const result = unitTestingTask(
                  FormatTypes.HH,
                  DateDateOneDigitHour
                );
                expect(result).toHaveLength(2);
              });
              it("should end with the given value", () => {
                const result = unitTestingTask(
                  FormatTypes.HH,
                  DateDateOneDigitHour
                );
                expect(result.endsWith("04")).toBe(true);
              });
            });
          });
          describe("H validity", () => {
            it("should return the given hour", () => {
              const result = unitTestingTask(
                FormatTypes.H,
                StringDateOneDigitHour
              );
              expect(result).toBe("4");
            });
          });
          describe("hh validity", () => {
            describe("has 2 digits", () => {
              it("should have the length equal to 2", () => {
                const result = unitTestingTask(
                  FormatTypes.hh,
                  DateDateTwoDigitsUSAHour
                );
                expect(result).toHaveLength(2);
              });
              it("should end with the usa format hour", () => {
                const result = unitTestingTask(
                  FormatTypes.hh,
                  DateDateTwoDigitsUSAHour
                );
                expect(result.endsWith("12")).toBe(true);
              });
            });
            describe("has 1 digit", () => {
              it("should the length be equal to 2", () => {
                const result = unitTestingTask(
                  FormatTypes.hh,
                  DateDateOneDigitUSAHour
                );
                expect(result).toHaveLength(2);
              });
              it("should end with the usa format hour", () => {
                const result = unitTestingTask(
                  FormatTypes.hh,
                  DateDateOneDigitUSAHour
                );
                expect(result.endsWith("2")).toBe(true);
              });
              it("should append one 0 at the start", () => {
                const result = unitTestingTask(
                  FormatTypes.hh,
                  DateDateOneDigitUSAHour
                );
                expect(result.startsWith("0".repeat(1))).toBe(true);
              });
            });
          });
          describe("h validity", () => {
            it("should return the right usa format hour", () => {
              const result = unitTestingTask(
                FormatTypes.h,
                DateDateOneDigitUSAHour
              );
              expect(result).toBe("2");
            });
          });
        });
        describe("minute validity", () => {
          describe("mm validity", () => {
            describe("has 2 digits", () => {
              it("should return the length equal to 2", () => {
                const result = unitTestingTask(
                  FormatTypes.mm,
                  DateDateTwoDigitsMinute
                );
                expect(result).toHaveLength(2);
              });
              it("should end with the given minutes", () => {
                const result = unitTestingTask(
                  FormatTypes.mm,
                  DateDateTwoDigitsMinute
                );
                expect(result.endsWith("30")).toBe(true);
              });
            });
            describe("has 1 digit", () => {
              it("should return the length equal to 2", () => {
                const result = unitTestingTask(
                  FormatTypes.mm,
                  DateDateOneDigitMinute
                );
                expect(result).toHaveLength(2);
              });
              it("should end with the given minutes", () => {
                const result = unitTestingTask(
                  FormatTypes.mm,
                  DateDateOneDigitMinute
                );
                expect(result.endsWith("2")).toBe(true);
              });

              it("should append one 0 at the start", () => {
                const result = unitTestingTask(
                  FormatTypes.mm,
                  DateDateOneDigitMinute
                );
                expect(result.startsWith("0".repeat(1))).toBe(true);
              });
            });
          });
          describe("m validity", () => {
            it("should return the given minutes", () => {
              const result = unitTestingTask(
                FormatTypes.m,
                StringDateOneDigitMinute
              );
              expect(result).toBe("2");
            });
          });
        });
        describe("second validity", () => {
          describe("ss validity", () => {
            describe("has 2 digits", () => {
              it("should return the length equal to 2", () => {
                const result = unitTestingTask(
                  FormatTypes.ss,
                  DateDateTwoDigitsSecond
                );
                expect(result).toHaveLength(2);
              });
              it("should end with the given second number", () => {
                const result = unitTestingTask(
                  FormatTypes.ss,
                  DateDateTwoDigitsSecond
                );
                expect(result.endsWith("45")).toBe(true);
              });
            });
            describe("has 1 digit", () => {
              it("should return the length equal to 2", () => {
                const result = unitTestingTask(
                  FormatTypes.ss,
                  DateDateOneDigitSecond
                );
                expect(result).toHaveLength(2);
              });
              it("should end with the given second number", () => {
                const result = unitTestingTask(
                  FormatTypes.ss,
                  DateDateOneDigitSecond
                );
                expect(result.endsWith("05")).toBe(true);
              });
            });
          });
          describe("s validity", () => {
            it("should return the give seconds", () => {
              const result = unitTestingTask(
                FormatTypes.s,
                DateDateOneDigitSecond
              );
              expect(result).toBe("5");
            });
          });
        });
        describe("milliseconds validity", () => {
          describe("ff validity", () => {
            describe("has 3 digits", () => {
              it("should return length equal to 3", () => {
                const result = unitTestingTask(
                  FormatTypes.ff,
                  DateDateThreeDigitMillisecond
                );
                expect(result).toHaveLength(3);
              });
              it("ends with the given milliseconds", () => {
                const result = unitTestingTask(
                  FormatTypes.ff,
                  DateDateThreeDigitMillisecond
                );
                expect(result.endsWith("123")).toBe(true);
              });
            });
            describe("has less than 3 digits", () => {
              it("should return length equal to 3", () => {
                const result = unitTestingTask(
                  FormatTypes.ff,
                  DateDateOneDigitMillisecond
                );
                expect(result).toHaveLength(3);
              });
              it("ends with the given milliseconds", () => {
                const result = unitTestingTask(
                  FormatTypes.ff,
                  DateDateOneDigitMillisecond
                );
                expect(result.endsWith("003")).toBe(true);
              });
            });
          });
          describe("f validity", () => {
            it("returns the given milliseconds without 0s", () => {
              const result = unitTestingTask(
                FormatTypes.f,
                DateDateOneDigitMillisecond
              );
              expect(result).toBe("3");
            });
          });
        });
        describe("meridiem validity", () => {
          describe("A validity", () => {
            describe("anti meridiem", () => {
              it("should return AM", () => {
                const result = unitTestingTask(FormatTypes.A, DateAnteMeridiem);
                expect(result).toBe("AM");
              });
            });
            describe("post meridiem", () => {
              it("should return PM", () => {
                const result = unitTestingTask(FormatTypes.A, DatePostMeridiem);
                expect(result).toBe("PM");
              });
            });
          });
          describe("a validity", () => {
            describe("anti meridiem", () => {
              it("should return am", () => {
                const result = unitTestingTask(FormatTypes.a, DateAnteMeridiem);
                expect(result).toBe("am");
              });
            });
            describe("post meridiem", () => {
              it("should return pm", () => {
                const result = unitTestingTask(FormatTypes.a, DatePostMeridiem);
                expect(result).toBe("pm");
              });
            });
          });
        });
        describe("timezone validity", () => {
          describe("ZZ validity", () => {
            let getTimezoneOffsetSpy;

            afterEach(() => {
              if (getTimezoneOffsetSpy) {
                getTimezoneOffsetSpy.mockRestore();
              }
            });

            it("should have the sign + if timezone sign is -", () => {
              getTimezoneOffsetSpy = jest
                .spyOn(Date.prototype, "getTimezoneOffset")
                .mockReturnValue(-240);
              const result = unitTestingTask(FormatTypes.ZZ, DateAnteMeridiem);
              expect(result[0]).toBe("+");
            });

            it("should have the sign - if timezone sign is +", () => {
              getTimezoneOffsetSpy = jest
                .spyOn(Date.prototype, "getTimezoneOffset")
                .mockReturnValue(240);
              const result = unitTestingTask(FormatTypes.ZZ, DateAnteMeridiem);
              expect(result[0]).toBe("-");
            });

            it("should have the right hours defined", () => {
              getTimezoneOffsetSpy = jest
                .spyOn(Date.prototype, "getTimezoneOffset")
                .mockReturnValue(240);
              const result = unitTestingTask(FormatTypes.ZZ, DateAnteMeridiem);
              const hours = result.substring(1, 3);
              expect(hours).toBe("04");
            });

            it("should have the right minutes defined", () => {
              getTimezoneOffsetSpy = jest
                .spyOn(Date.prototype, "getTimezoneOffset")
                .mockReturnValue(240);
              const result = unitTestingTask(FormatTypes.ZZ, DateAnteMeridiem);
              const minutes = result.substring(3, 5);
              expect(minutes).toBe("00");
            });
          });

          describe("Z validity", () => {
            let getTimezoneOffsetSpy;

            afterEach(() => {
              if (getTimezoneOffsetSpy) {
                getTimezoneOffsetSpy.mockRestore();
              }
            });
            it("should return the correct result", () => {
              getTimezoneOffsetSpy = jest
                .spyOn(Date.prototype, "getTimezoneOffset")
                .mockReturnValue(240);
              const result = unitTestingTask(FormatTypes.Z, DateAnteMeridiem);
              expect(result).toBe("-04:00");
            });
          });
        });
      });
      describe("date is provided as Number type", () => {});

      describe("date is provided as String type", () => {});

      describe("date is not provided", () => {});
    });
  });
});

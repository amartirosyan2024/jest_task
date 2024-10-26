const MockDate = require("mockdate");
const unitTestingTask = require("./unitTestingTask.js");
const timezonedDate = require("timezoned-date");

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

    describe("check the tokens thorough functionality (date is provided", () => {
      describe("YYYY format validity", () => {
        describe("given year has 4 digits", () => {
          it("should return the given years digits length", () => {
            const result = unitTestingTask(
              FormatTypes.YYYY,
              new Date("12.12.2021")
            );
            expect(result).toHaveLength(4);
          });

          it("should end with the full year", () => {
            const result = unitTestingTask(
              FormatTypes.YYYY,
              new Date("12.12.2021")
            );
            expect(result.endsWith("2021")).toBe(true);
          });
        });
        describe("given year has more than 4 digits", () => {
          it("should return the given years digits length", () => {
            const result = unitTestingTask(
              FormatTypes.YYYY,
              new Date("12.12.20212")
            );
            expect(result).toHaveLength(5);
          });

          it("should end with the full year", () => {
            const result = unitTestingTask(
              FormatTypes.YYYY,
              new Date("12.12.20212")
            );
            expect(result.endsWith("20212")).toBe(true);
          });
        });
        describe("given year has less than 4 digits", () => {
          it("should return the given years digits length", () => {
            const result = unitTestingTask(
              FormatTypes.YYYY,
              new Date("12.12.202")
            );
            expect(result).toHaveLength(3);
          });

          it("should end with the full year", () => {
            const result = unitTestingTask(
              FormatTypes.YYYY,
              new Date("12.12.20212")
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
              new Date("12.12.2021")
            );
            expect(result).toHaveLength(2);
          });
          it("should end with the given years last 2 chars", () => {
            const result = unitTestingTask(
              FormatTypes.YY,
              new Date("12.12.2021")
            );
            expect(result.endsWith("21")).toBe(true);
          });
        });
        describe("given year has less than 2 digits", () => {
          it("should have the length equal to 2", () => {
            const result = unitTestingTask(FormatTypes.YY, new Date("12.12.2"));
            expect(result).toHaveLength(2);
          });

          it("should end with the given year's character", () => {
            const result = unitTestingTask(FormatTypes.YY, new Date("12.12.2"));
            expect(result.endsWith("2")).toBe(true);
          });

          it("should append right amount of 0's at the start", () => {
            const result = unitTestingTask(FormatTypes.YY, new Date("12.12.2"));
            expect(result.startsWith("0".repeat(1))).toBe(true);
          });
        });
      });
      describe("MMMM format validity", () => {
        it("should return the full name of the month", () => {
          const result = unitTestingTask("MMMM", new Date("12.12.2011"));
          expect(result).toBe("December");
        });
      });
      describe("MMM format validity", () => {
        it("should return the partial name of the month", () => {
          const result = unitTestingTask("MMM", new Date("12.12.2011"));
          expect(result).toBe("Dec");
        });
      });
      describe("MM format validity", () => {
        describe("given month has 2 digits", () => {
          it("should have the length equal to 2", () => {
            const result = unitTestingTask("MM", new Date("12.12.2011"));
            expect(result).toHaveLength(2);
          });
          it("should end with the given month", () => {
            const result = unitTestingTask("MM", new Date("12.12.2011"));
            expect(result.endsWith("12")).toBe(true);
          });
        });
        describe("given month has 1 digit", () => {
          it("should have the length equal to 2", () => {
            const result = unitTestingTask("MM", new Date("2.12.2011"));
            expect(result).toHaveLength(2);
          });
          it("should end with the given month", () => {
            const result = unitTestingTask("MM", new Date("2.12.2011"));
            expect(result.endsWith("2")).toBe(true);
          });

          it("should append the right amount of 0's at the start", () => {
            const result = unitTestingTask("MM", new Date("2.12.2011"));
            expect(result.startsWith("0".repeat(1))).toBe(true);
          });
        });
      });
      describe("M format validity", () => {
        it("should return the right value with a given month", () => {
          const result = unitTestingTask("M", new Date("2.12.2011"));
          expect(result).toBe("2");
        });
      });
      describe("DDD validity", () => {
        it("return the correct full weekday name", () => {
          const result = unitTestingTask("DDD", new Date("2.12.2011"));
          expect(result).toBe("Saturday");
        });
      });
      describe("DD validity", () => {
        it("return the correct partial weekday name", () => {
          const result = unitTestingTask("DD", new Date("2.12.2011"));
          expect(result).toBe("Sat");
        });
      });
      describe("D validity", () => {
        it("return the correct partial weekday name", () => {
          const result = unitTestingTask("D", new Date("2.12.2011"));
          expect(result).toBe("Sa");
        });
      });
      describe("dd validity", () => {
        describe("has 2 digits", () => {
          it("should return the length equal to 2", () => {
            const result = unitTestingTask(
              FormatTypes.dd,
              new Date("2.12.2011")
            );
            expect(result).toHaveLength(2);
          });
          it("should end with the given month", () => {
            const result = unitTestingTask(
              FormatTypes.dd,
              new Date("2.12.2011")
            );
            expect(result.endsWith("12")).toBe(true);
          });
        });
        describe("has 1 digit", () => {
          it("should return the length equal to 2", () => {
            const result = unitTestingTask(
              FormatTypes.dd,
              new Date("2.8.2011")
            );
            expect(result).toHaveLength(2);
          });
          it("should end with the given month", () => {
            const result = unitTestingTask(
              FormatTypes.dd,
              new Date("2.8.2011")
            );
            expect(result.endsWith("8")).toBe(true);
          });
          it("should append the one 0 at the start", () => {
            const result = unitTestingTask(
              FormatTypes.dd,
              new Date("2.8.2011")
            );
            expect(result.startsWith("0".repeat(1))).toBe(true);
          });
        });
      });
      describe("d validity", () => {
        it("should return the given day", () => {
          const result = unitTestingTask(FormatTypes.d, new Date("2.8.2011"));
          expect(result).toBe("8");
        });
      });
      describe("HH validity", () => {
        describe("has 2 digits", () => {
          it("should the length be equal to 2", () => {
            const result = unitTestingTask(
              FormatTypes.HH,
              new Date("2023-09-01T14:30:00")
            );
            expect(result).toHaveLength(2);
          });
          it("should end with the given value", () => {
            const result = unitTestingTask(
              FormatTypes.HH,
              new Date("2023-09-01T14:30:00")
            );
            expect(result.endsWith("14")).toBe(true);
          });
        });
        describe("has 1 digit", () => {
          it("should the length be equal to 2", () => {
            const result = unitTestingTask(
              FormatTypes.HH,
              new Date("2023-09-01T04:30:00")
            );
            expect(result).toHaveLength(2);
          });
          it("should end with the given value", () => {
            const result = unitTestingTask(
              FormatTypes.HH,
              new Date("2023-09-01T04:30:00")
            );
            expect(result.endsWith("04")).toBe(true);
          });
        });
      });
      describe("H validity", () => {
        it("should return the given hour", () => {
          const result = unitTestingTask(
            FormatTypes.H,
            new Date("2023-09-01T04:30:00")
          );
          expect(result).toBe("4");
        });
      });
      describe("hh validity", () => {
        describe("has 2 digits", () => {
          it("should have the length equal to 2", () => {
            const result = unitTestingTask(
              FormatTypes.hh,
              new Date("2023-09-01T12:30:00")
            );
            expect(result).toHaveLength(2);
          });
          it("should end with the usa format hour", () => {
            const result = unitTestingTask(
              FormatTypes.hh,
              new Date("2023-09-01T12:30:00")
            );
            expect(result.endsWith("12")).toBe(true);
          });
        });
        describe("has 1 digit", () => {
          it("should the length be equal to 2", () => {
            const result = unitTestingTask(
              FormatTypes.hh,
              new Date("2023-09-01T02:30:00")
            );
            expect(result).toHaveLength(2);
          });
          it("should end with the usa format hour", () => {
            const result = unitTestingTask(
              FormatTypes.hh,
              new Date("2023-09-01T02:30:00")
            );
            expect(result.endsWith("2")).toBe(true);
          });
          it("should append one 0 at the start", () => {
            const result = unitTestingTask(
              FormatTypes.hh,
              new Date("2023-09-01T02:30:00")
            );
            expect(result.startsWith("0".repeat(1))).toBe(true);
          });
        });
      });
      describe("h validity", () => {
        it("should return the right usa format hour", () => {
          const result = unitTestingTask(
            FormatTypes.h,
            new Date("2023-09-01T02:30:00")
          );
          expect(result).toBe("2");
        });
      });
      describe("mm validity", () => {
        describe("has 2 digits", () => {
          it("should return the length equal to 2", () => {
            const result = unitTestingTask(
              FormatTypes.mm,
              new Date("2023-09-01T02:30:00")
            );
            expect(result).toHaveLength(2);
          });
          it("should end with the given minutes", () => {
            const result = unitTestingTask(
              FormatTypes.mm,
              new Date("2023-09-01T02:30:00")
            );
            expect(result.endsWith("30")).toBe(true);
          });
        });
        describe("has 1 digit", () => {
          it("should return the length equal to 2", () => {
            const result = unitTestingTask(
              FormatTypes.mm,
              new Date("2023-09-01T02:02:00")
            );
            expect(result).toHaveLength(2);
          });
          it("should end with the given minutes", () => {
            const result = unitTestingTask(
              FormatTypes.mm,
              new Date("2023-09-01T02:02:00")
            );
            expect(result.endsWith("2")).toBe(true);
          });

          it("should append one 0 at the start", () => {
            const result = unitTestingTask(
              FormatTypes.mm,
              new Date("2023-09-01T02:02:00")
            );
            expect(result.startsWith("0".repeat(1))).toBe(true);
          });
        });
      });
      describe("m validity", () => {
        it("should return the given minutes", () => {
          const result = unitTestingTask(
            FormatTypes.m,
            new Date("2023-09-01T02:02:00")
          );
          expect(result).toBe("2");
        });
      });
      describe("ss validity", () => {
        describe("has 2 digits", () => {
          it("should return the length equal to 2", () => {
            const result = unitTestingTask(
              FormatTypes.ss,
              new Date("2023-09-01T14:30:45")
            );
            expect(result).toHaveLength(2);
          });
          it("should end with the given second number", () => {
            const result = unitTestingTask(
              FormatTypes.ss,
              new Date("2023-09-01T14:30:45")
            );
            expect(result.endsWith("45")).toBe(true);
          });
        });
        describe("has 1 digit", () => {
          it("should return the length equal to 2", () => {
            const result = unitTestingTask(
              FormatTypes.ss,
              new Date("2023-09-01T14:30:05")
            );
            expect(result).toHaveLength(2);
          });
          it("should end with the given second number", () => {
            const result = unitTestingTask(
              FormatTypes.ss,
              new Date("2023-09-01T14:30:05")
            );
            expect(result.endsWith("05")).toBe(true);
          });
        });
      });
      describe("s validity", () => {
        it("should return the give seconds", () => {
          const result = unitTestingTask(
            FormatTypes.s,
            new Date("2023-09-01T14:30:05")
          );
          expect(result).toBe("5");
        });
      });
      describe("ff validity", () => {
        describe("has 3 digits", () => {
          it("should return length equal to 3", () => {
            const result = unitTestingTask(
              FormatTypes.ff,
              new Date("2023-09-01T14:30:45.123")
            );
            expect(result).toHaveLength(3);
          });
          it("ends with the given milliseconds", () => {
            const result = unitTestingTask(
              FormatTypes.ff,
              new Date("2023-09-01T14:30:45.123")
            );
            expect(result.endsWith("123")).toBe(true);
          });
        });
        describe("has less than 3 digits", () => {
          it("should return length equal to 3", () => {
            const result = unitTestingTask(
              FormatTypes.ff,
              new Date("2023-09-01T14:30:45.003")
            );
            expect(result).toHaveLength(3);
          });
          it("ends with the given milliseconds", () => {
            const result = unitTestingTask(
              FormatTypes.ff,
              new Date("2023-09-01T14:30:45.003")
            );
            expect(result.endsWith("003")).toBe(true);
          });
        });
      });
      describe("f validity", () => {
        it("returns the given milliseconds without 0s", () => {
          const result = unitTestingTask(
            FormatTypes.f,
            new Date("2023-09-01T14:30:45.003")
          );
          expect(result).toBe("3");
        });
      });
      describe("A validity", () => {
        describe("anti meridiem", () => {
          it("should return AM", () => {
            const result = unitTestingTask(
              FormatTypes.A,
              new Date("2023-09-01T03:30:00")
            );
            expect(result).toBe("AM");
          });
        });
        describe("post meridiem", () => {
          it("should return PM", () => {
            const result = unitTestingTask(
              FormatTypes.A,
              new Date("2023-09-01T12:30:00")
            );
            expect(result).toBe("PM");
          });
        });
      });
      describe("a validity", () => {
        describe("anti meridiem", () => {
          it("should return am", () => {
            const result = unitTestingTask(
              FormatTypes.a,
              new Date("2023-09-01T03:30:00")
            );
            expect(result).toBe("am");
          });
        });
        describe("post meridiem", () => {
          it("should return pm", () => {
            const result = unitTestingTask(
              FormatTypes.a,
              new Date("2023-09-01T12:30:00")
            );
            expect(result).toBe("pm");
          });
        });
      });
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
          const result = unitTestingTask(
            FormatTypes.ZZ,
            new Date("2023-09-01T03:30:00")
          );
          expect(result[0]).toBe("+");
        });

        it("should have the sign - if timezone sign is +", () => {
          getTimezoneOffsetSpy = jest
            .spyOn(Date.prototype, "getTimezoneOffset")
            .mockReturnValue(240);
          const result = unitTestingTask(
            FormatTypes.ZZ,
            new Date("2023-09-01T03:30:00")
          );
          expect(result[0]).toBe("-");
        });

        it("should have the right hours defined", () => {
          getTimezoneOffsetSpy = jest
            .spyOn(Date.prototype, "getTimezoneOffset")
            .mockReturnValue(240);
          const result = unitTestingTask(
            FormatTypes.ZZ,
            new Date("2023-09-01T03:30:00")
          );
          const hours = result.substring(1, 3);
          expect(hours).toBe("04");
        });

        it("should have the right minutes defined", () => {
          getTimezoneOffsetSpy = jest
            .spyOn(Date.prototype, "getTimezoneOffset")
            .mockReturnValue(240);
          const result = unitTestingTask(
            FormatTypes.ZZ,
            new Date("2023-09-01T03:30:00")
          );
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
          const result = unitTestingTask(
            FormatTypes.Z,
            new Date("2023-09-01T03:30:00")
          );
          expect(result).toBe("-04:00");
        });
      });
    });
    describe("date is provided as Number type", () => {
      const date = new Date("2011-12-14").getTime();
      it("should return correct date with 'YYYY' format", () => {
        const result = unitTestingTask(FormatTypes.YYYY, date);
        expect(result).toBe("2011");
      });
      it("should return correct date with 'YY' format", () => {
        const result = unitTestingTask(FormatTypes.YY, date);
        expect(result).toBe("11");
      });
      it("should return correct date with 'MMMM' format", () => {
        const result = unitTestingTask(FormatTypes.MMMM, date);
        expect(result).toBe("December");
      });
      it("should return correct date with 'MMM' format", () => {
        const result = unitTestingTask(FormatTypes.MMM, date);
        expect(result).toBe("Dec");
      });
      it("should return correct date with 'MM' format", () => {
        const result = unitTestingTask(FormatTypes.MM, date);
        expect(result).toBe("12");
      });
      it("should return correct date with 'M' format", () => {
        const result = unitTestingTask(FormatTypes.M, date);
        expect(result).toBe("12");
      });
      it("should return correct date with 'DDD' format", () => {
        const result = unitTestingTask(FormatTypes.DDD, date);
        expect(result).toBe("Wednesday");
      });
      it("should return correct date with 'DD' format", () => {
        const result = unitTestingTask(FormatTypes.DD, date);
        expect(result).toBe("Wed");
      });
      it("should return correct date with 'D' format", () => {
        const result = unitTestingTask(FormatTypes.D, date);
        expect(result).toBe("We");
      });
      it("should return correct date with 'dd' format", () => {
        const result = unitTestingTask(FormatTypes.dd, date);
        expect(result).toBe("14");
      });
      it("should return correct date with 'd' format", () => {
        const result = unitTestingTask(FormatTypes.d, date);
        expect(result).toBe("14");
      });
      it("should return correct date with 'HH' format", () => {
        const result = unitTestingTask(FormatTypes.HH, date);
        expect(result).toBe("04");
      });
      it("should return correct date with 'H' format", () => {
        const result = unitTestingTask(FormatTypes.H, date);
        expect(result).toBe("4");
      });
      it("should return correct date with 'hh' format", () => {
        const result = unitTestingTask(FormatTypes.hh, date);
        expect(result).toBe("04");
      });
      it("should return correct date with 'h' format", () => {
        const result = unitTestingTask(FormatTypes.h, date);
        expect(result).toBe("4");
      });
      it("should return correct date with 'mm' format", () => {
        const result = unitTestingTask(FormatTypes.mm, date);
        expect(result).toBe("00");
      });
      it("should return correct date with 'm' format", () => {
        const result = unitTestingTask(FormatTypes.m, date);
        expect(result).toBe("0");
      });
      it("should return correct date with 'ss' format", () => {
        const result = unitTestingTask(FormatTypes.ss, date);
        expect(result).toBe("00");
      });
      it("should return correct date with 's' format", () => {
        const result = unitTestingTask(FormatTypes.s, date);
        expect(result).toBe("0");
      });
      it("should return correct date with 'ff' format", () => {
        const result = unitTestingTask(FormatTypes.ff, date);
        expect(result).toBe("000");
      });
      it("should return correct date with 'f' format", () => {
        const result = unitTestingTask(FormatTypes.f, date);
        expect(result).toBe("0");
      });
      it("should return correct date with 'A' format", () => {
        const result = unitTestingTask(FormatTypes.A, date);
        expect(result).toBe("AM");
      });
      it("should return correct date with 'a' format", () => {
        const result = unitTestingTask(FormatTypes.a, date);
        expect(result).toBe("am");
      });
      it("should return correct date with 'ZZ' format", () => {
        const result = unitTestingTask(FormatTypes.ZZ, date);
        expect(result).toBe("+0400");
      });
      it("should return correct date with 'Z' format", () => {
        const result = unitTestingTask(FormatTypes.Z, date);
        expect(result).toBe("+04:00");
      });
    });
    describe("date is provided as String type", () => {
      const date = "2011-12-14";
      it("should return correct date with 'YYYY' format", () => {
        const result = unitTestingTask(FormatTypes.YYYY, date);
        expect(result).toBe("2011");
      });
      it("should return correct date with 'YY' format", () => {
        const result = unitTestingTask(FormatTypes.YY, date);
        expect(result).toBe("11");
      });
      it("should return correct date with 'MMMM' format", () => {
        const result = unitTestingTask(FormatTypes.MMMM, date);
        expect(result).toBe("December");
      });
      it("should return correct date with 'MMM' format", () => {
        const result = unitTestingTask(FormatTypes.MMM, date);
        expect(result).toBe("Dec");
      });
      it("should return correct date with 'MM' format", () => {
        const result = unitTestingTask(FormatTypes.MM, date);
        expect(result).toBe("12");
      });
      it("should return correct date with 'M' format", () => {
        const result = unitTestingTask(FormatTypes.M, date);
        expect(result).toBe("12");
      });
      it("should return correct date with 'DDD' format", () => {
        const result = unitTestingTask(FormatTypes.DDD, date);
        expect(result).toBe("Wednesday");
      });
      it("should return correct date with 'DD' format", () => {
        const result = unitTestingTask(FormatTypes.DD, date);
        expect(result).toBe("Wed");
      });
      it("should return correct date with 'D' format", () => {
        const result = unitTestingTask(FormatTypes.D, date);
        expect(result).toBe("We");
      });
      it("should return correct date with 'dd' format", () => {
        const result = unitTestingTask(FormatTypes.dd, date);
        expect(result).toBe("14");
      });
      it("should return correct date with 'd' format", () => {
        const result = unitTestingTask(FormatTypes.d, date);
        expect(result).toBe("14");
      });
      it("should return correct date with 'HH' format", () => {
        const result = unitTestingTask(FormatTypes.HH, date);
        expect(result).toBe("04");
      });
      it("should return correct date with 'H' format", () => {
        const result = unitTestingTask(FormatTypes.H, date);
        expect(result).toBe("4");
      });
      it("should return correct date with 'hh' format", () => {
        const result = unitTestingTask(FormatTypes.hh, date);
        expect(result).toBe("04");
      });
      it("should return correct date with 'h' format", () => {
        const result = unitTestingTask(FormatTypes.h, date);
        expect(result).toBe("4");
      });
      it("should return correct date with 'mm' format", () => {
        const result = unitTestingTask(FormatTypes.mm, date);
        expect(result).toBe("00");
      });
      it("should return correct date with 'm' format", () => {
        const result = unitTestingTask(FormatTypes.m, date);
        expect(result).toBe("0");
      });
      it("should return correct date with 'ss' format", () => {
        const result = unitTestingTask(FormatTypes.ss, date);
        expect(result).toBe("00");
      });
      it("should return correct date with 's' format", () => {
        const result = unitTestingTask(FormatTypes.s, date);
        expect(result).toBe("0");
      });
      it("should return correct date with 'ff' format", () => {
        const result = unitTestingTask(FormatTypes.ff, date);
        expect(result).toBe("000");
      });
      it("should return correct date with 'f' format", () => {
        const result = unitTestingTask(FormatTypes.f, date);
        expect(result).toBe("0");
      });
      it("should return correct date with 'A' format", () => {
        const result = unitTestingTask(FormatTypes.A, date);
        expect(result).toBe("AM");
      });
      it("should return correct date with 'a' format", () => {
        const result = unitTestingTask(FormatTypes.a, date);
        expect(result).toBe("am");
      });
      it("should return correct date with 'ZZ' format", () => {
        const result = unitTestingTask(FormatTypes.ZZ, date);
        expect(result).toBe("+0400");
      });
      it("should return correct date with 'Z' format", () => {
        const result = unitTestingTask(FormatTypes.Z, date);
        expect(result).toBe("+04:00");
      });
    });
    describe("date is not provided", () => {
      const originalDate = Date;
      beforeEach(() => {
        MockDate.set("2011-12-14");
        timezonedDate.makeConstructor(200);
      });

      afterEach(() => {
        Date = originalDate;
      });

      it("should return correct date with 'YYYY' format", () => {
        const result = unitTestingTask(FormatTypes.YYYY);
        expect(result).toBe("2011");
      });
      it("should return correct date with 'YY' format", () => {
        const result = unitTestingTask(FormatTypes.YY);
        expect(result).toBe("11");
      });

      it("should return correct date with 'MMMM' format", () => {
        const result = unitTestingTask(FormatTypes.MMMM);
        expect(result).toBe("December");
      });

      it("should return correct date with 'MMM' format", () => {
        const result = unitTestingTask(FormatTypes.MMM);
        expect(result).toBe("Dec");
      });

      it("should return correct date with 'MM' format", () => {
        const result = unitTestingTask(FormatTypes.MM);
        expect(result).toBe("12");
      });

      it("should return correct date with 'M' format", () => {
        const result = unitTestingTask(FormatTypes.M);
        expect(result).toBe("12");
      });
      it("should return correct date with 'DDD' format", () => {
        const result = unitTestingTask(FormatTypes.DDD);
        expect(result).toBe("Wednesday");
      });
      it("should return correct date with 'DD' format", () => {
        const result = unitTestingTask(FormatTypes.DD);
        expect(result).toBe("Wed");
      });
      it("should return correct date with 'D' format", () => {
        const result = unitTestingTask(FormatTypes.D);
        expect(result).toBe("We");
      });
      it("should return correct date with 'dd' format", () => {
        const result = unitTestingTask(FormatTypes.dd);
        expect(result).toBe("14");
      });
      it("should return correct date with 'd' format", () => {
        const result = unitTestingTask(FormatTypes.d);
        expect(result).toBe("14");
      });
      it("should return correct date with 'HH' format", () => {
        const result = unitTestingTask(FormatTypes.HH);
        expect(result).toBe("04");
      });
      it("should return correct date with 'H' format", () => {
        const result = unitTestingTask(FormatTypes.H);
        expect(result).toBe("4");
      });
      it("should return correct date with 'hh' format", () => {
        const result = unitTestingTask(FormatTypes.hh);
        expect(result).toBe("04");
      });
      it("should return correct date with 'h' format", () => {
        const result = unitTestingTask(FormatTypes.h);
        expect(result).toBe("4");
      });
      it("should return correct date with 'mm' format", () => {
        const result = unitTestingTask(FormatTypes.mm);
        expect(result).toBe("00");
      });
      it("should return correct date with 'm' format", () => {
        const result = unitTestingTask(FormatTypes.m);
        expect(result).toBe("0");
      });
      it("should return correct date with 'ss' format", () => {
        const result = unitTestingTask(FormatTypes.ss);
        expect(result).toBe("00");
      });
      it("should return correct date with 's' format", () => {
        const result = unitTestingTask(FormatTypes.s);
        expect(result).toBe("0");
      });
      it("should return correct date with 'ff' format", () => {
        const result = unitTestingTask(FormatTypes.ff);
        expect(result).toBe("000");
      });
      it("should return correct date with 'f' format", () => {
        const result = unitTestingTask(FormatTypes.f);
        expect(result).toBe("0");
      });
      it("should return correct date with 'A' format", () => {
        const result = unitTestingTask(FormatTypes.A);
        expect(result).toBe("AM");
      });
      it("should return correct date with 'a' format", () => {
        const result = unitTestingTask(FormatTypes.a);
        expect(result).toBe("am");
      });
      it("should return correct date with 'ZZ' format", () => {
        const result = unitTestingTask(FormatTypes.ZZ);
        expect(result).toBe("+0400");
      });
      it("should return correct date with 'Z' format", () => {
        const result = unitTestingTask(FormatTypes.Z);
        expect(result).toBe("+04:00");
      });
    });
    describe("format is divided by delimiters", () => {
      it("should divide the result's formats by a divider in a format argument", () => {
        const formats = unitTestingTask("YYYY/MM/D").split("/");
        expect(formats).toHaveLength(3);
      });
    });
  });
});

const Employee = require("../lib/employee")

describe("Employee class", () => {
    describe("getName method", () => {
        it("returns input name", () => {
            const employee = new Employee("Bob", 1, "sus@mong.us")
            employee.getName()
            expect(employee.name).toBe("Bob")
        })
    })
    describe("getID method", () => {
        it("returns input ID", () => {
            const employee = new Employee("Bob", 1, "sus@mong.us")
            employee.getID()
            expect(employee.id).toBe(1)
        })
    })
    describe("getEmail method", () => {
        it("returns input email", () => {
            const employee = new Employee("Bob", 1, "sus@mong.us")
            employee.getEmail()
            expect(employee.email).toBe("sus@mong.us")
        })
    })
})
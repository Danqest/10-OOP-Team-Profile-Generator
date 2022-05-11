const Manager = require("../lib/manager")

describe("Manager class", () => {
    describe("getName method", () => {
        it("returns input name", () => {
            const manager = new Manager("Bob", 1, "sus@mong.us", 4)
            manager.getName()
            expect(manager.name).toBe("Bob")
        })
    })
    describe("getID method", () => {
        it("returns input ID", () => {
            const manager = new Manager("Bob", 1, "sus@mong.us", 4)
            manager.getID()
            expect(manager.id).toBe(1)
        })
    })
    describe("getEmail method", () => {
        it("returns input email", () => {
            const manager = new Manager("Bob", 1, "sus@mong.us", 4)
            manager.getEmail()
            expect(manager.email).toBe("sus@mong.us")
        })
    })
})
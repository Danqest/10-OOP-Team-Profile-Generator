const Intern = require("../lib/intern")

describe("Intern class", () => {
    describe("getName method", () => {
        it("returns input name", () => {
            const intern = new Intern("Bob", 1, "sus@mong.us", "Dank Memes University")
            intern.getName()
            expect(intern.name).toBe("Bob")
        })
    })
    describe("getID method", () => {
        it("returns input ID", () => {
            const intern = new Intern("Bob", 1, "sus@mong.us", "Dank Memes University")
            intern.getID()
            expect(intern.id).toBe(1)
        })
    })
    describe("getEmail method", () => {
        it("returns input email", () => {
            const intern = new Intern("Bob", 1, "sus@mong.us", "Dank Memes University")
            intern.getEmail()
            expect(intern.email).toBe("sus@mong.us")
        })
    })
    describe("getSchool method", () => {
        it("returns input school", () => {
            const intern = new Intern("Bob", 1, "sus@mong.us", "Dank Memes University")
            intern.getSchool()
            expect(intern.school).toBe("Dank Memes University")
        })
    })
})
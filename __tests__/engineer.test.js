const Engineer = require("../lib/engineer")

describe("Engineer class", () => {
    describe("getName method", () => {
        it("returns input name", () => {
            const engineer = new Engineer("Bob", 1, "sus@mong.us", "sussybaka")
            engineer.getName()
            expect(engineer.name).toBe("Bob")
        })
    })
    describe("getID method", () => {
        it("returns input ID", () => {
            const engineer = new Engineer("Bob", 1, "sus@mong.us", "sussybaka")
            engineer.getID()
            expect(engineer.id).toBe(1)
        })
    })
    describe("getEmail method", () => {
        it("returns input email", () => {
            const engineer = new Engineer("Bob", 1, "sus@mong.us", "sussybaka")
            engineer.getEmail()
            expect(engineer.email).toBe("sus@mong.us")
        })
    })
    describe("getGithub method", () => {
        it("returns input github", () => {
            const engineer = new Engineer("Bob", 1, "sus@mong.us", "sussybaka")
            engineer.getGithub()
            expect(engineer.github).toBe("sussybaka")
        })
    })
})
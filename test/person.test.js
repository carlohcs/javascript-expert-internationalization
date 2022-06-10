import mocha from "mocha"
const { describe, it } = mocha
import chai from "chai"
const { expect } = chai
import Person from "../src/person.js"

describe("Person", () => {
  it("should return a person instance from a string", () => {
    const person = Person.generateInstanceFromString(
      "1 Motorcycle,Bike,Truck 20000 2020-01-01 2022-12-30"
    )
    const expected = {
      from: "2020-01-01",
      to: "2022-12-30",
      vehicles: ["Motorcycle", "Bike", "Truck"],
      kmTraveled: "20000",
      id: "1"
    }

    expect(person).to.be.deep.equal(expected)
  })

  it("should format values", () => {
    const person = new Person({
      from: "2020-01-01",
      to: "2022-12-30",
      vehicles: ["Motorcycle", "Bike", "Truck"],
      kmTraveled: "20000",
      id: "1"
    })

    const result = person.formatted("pt-BR")
    const expected = {
      id: 1,
      vehicles: "Motorcycle, Bike e Truck",
      kmTraveled: "20.000 km",
      from: "01 de fevereiro de 2020",
      to: "30 de janeiro de 2023"
    }

    expect(result).to.be.deep.equal(expected)
  })
})

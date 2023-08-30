/* eslint-disable no-undef */
const authServices = require("./auth")

const validUser = {
  email: "test@user.com",
  password: "Test1!",
}

const successResponse = {
  success: true,
  code: 200,
  message: "User logged in successfully",
  data: "some token",
}

const failureResponse = {
  success: false,
  code: 401,
  message: "Email or password incorrect",
}

describe("login function", () => {

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("is user login successfully", async () => {
    const spy = jest
      .spyOn(authServices, "login")
      .mockReturnValueOnce(successResponse)

    const data = authServices.login(validUser, () => {}, () => {})

    expect(spy).toHaveBeenCalled()
    expect(data).toBe(successResponse)
  })

  it("is user login wrong", async () => {
    const spy = jest
      .spyOn(authServices, "login")
      .mockReturnValueOnce(failureResponse)

    const data = authServices.login({}, () => {}, () => {})

    expect(spy).toHaveBeenCalled()
    expect(data).toBe(failureResponse)
  })
})


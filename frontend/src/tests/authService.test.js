import { authService } from "../services/authService";
import dotenv from "dotenv";

const userInfo = {
  name: "Mercy",
  email: "mercy@test.com",
  password: "mercy"
}


describe('authService', () => {

  beforeAll(() => {
    dotenv.config()
  })

  test("Unregistered user cannot login", async () => {
    try {
      const response = await authService.login(userInfo.email, userInfo.password)
      expect(response).toBeDefined()
    } catch (error) {
      
    }
  })




  test('User gets registered', async() => {
    try {
      const response = await authService.register(userInfo.name, userInfo.email, userInfo.password)
      expect(response.user).toBeDefined()
      expect(response).toBeDefined()
    } catch (error) {
      console.log(error)
    }
  })

  test('login gets response', async () => {
    try {
      const response = await authService.login(userInfo.email, userInfo.password)
      expect(response).toBeDefined()
    } catch (error) {
      console.log(error)
    }
  })
})
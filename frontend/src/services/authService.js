export const authService = {
  login: async (email, password) => {
    try {
      // Make API call to authenticate user and obtain JWT
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if login was successful
      if (response.ok) {
        const { token, user } = await response.json();
        return { token, user };
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      throw new Error("Login error");
    }
  },
  logout: async () => {
    try {
      // Clear the JWT token from local storage or cookies
      localStorage.removeItem("token");
    } catch (error) {
      throw new Error("Logout error");
    }
  },
  getUser: async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Invalid token");
      }
    } catch (error) {
      throw new Error("User authentication error");
    }
  },
};

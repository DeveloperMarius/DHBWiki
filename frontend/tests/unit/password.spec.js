import axios, { AxiosError } from "axios";

test("Das Passwort stimmt überein", async () => {
  const data = await axios.post("https://dhbwiki.th1nk.media/api/user/auth", {
    email: "tester@dhbwiki.de",
    password: "password",
  });
  expect(data.data.data.jwt).toBeDefined();
});

test("Die Passwort stimmt nicht überein", async () => {
  try {
    await axios.post("https://dhbwiki.th1nk.media/api/user/auth", {
      email: "tester@dhbwiki.de",
      password: "password2",
    });
  } catch (error) {
    expect(error).toBeInstanceOf(AxiosError);
  }
});

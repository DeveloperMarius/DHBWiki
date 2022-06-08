import axios, { AxiosError } from "axios";

test("Die E-Mail existiert", async () => {
  const data = await axios.post("https://dhbwiki.th1nk.media/api/user/exists", {
    email: "sebastian.hauschildt@live.de",
  });
  expect(data.data.success).toBe(true);
});

test("Die E-Mail existiert nicht", async () => {
  try {
    await axios.post("https://dhbwiki.th1nk.media/api/user/exists", {
      email: "sebastian.hausheesh@live.de",
    });
  } catch (error) {
    expect(error).toBeInstanceOf(AxiosError);
  }
});

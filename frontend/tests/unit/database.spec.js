import axios from "axios";

test("Die Datenbank ist online", async () => {
  const res = await axios.get("https://dhbwiki.th1nk.media/api/test/status");
  expect(res.data.data.database).toBe(true);
});

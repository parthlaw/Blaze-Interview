const { google } = require("googleapis");
const express = require("express");
const app = express();
const cors = require("cors");
const clientId =
  "726522669713-jejlstmji97pqtfv1hkmaga7olkjh315.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUrl = "http://localhost:3000/callback";

app.use(cors());
app.use(express.json());
app.post("/auth/google/callback", async (req, res) => {
  const { code } = req.body;
  try {
    // Getting access token using code
    const accTokenResponse = await fetch(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${clientId.trim()}&client_secret=${clientSecret.trim()}&grant_type=authorization_code&redirect_uri=${redirectUrl.trim()}`,
      {
        method: "POST",
        // headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    const accessToken = await accTokenResponse.json();
    if (accessToken.error) {
      res.json({ data: accessToken.error_description, error: true });
      return;
    }
    res.json({ data: accessToken, success: true });
  } catch (err) {
    console.log(err, "ERROR");
    res.json({ data: err, error: true });
  }
});
app.post("/calander/list", async (req, res) => {
  const { token, refresh } = req.body;
  const { hours } = req.query;
  try {
    const auth = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
    auth.setCredentials({
      access_token: token,
      token_type: "Bearer",
      expires_in: 3600,
    });
    //To get list of all events in calendar
    const allEvents = await google
      .calendar({ version: "v3", auth })
      .events.list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        timeMax: new Date(Date.now() + 12096e5).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      });
    const availableTimes = [];
    {
      // Loop to filter out the the free time slots according to the hours (if hours query parameter is provided)
      //******************************************************************************** */
      for (let i = 0; i < allEvents.data.items.length; i++) {
        if (i != 0) {
          let prevEnd = Date.parse(allEvents.data.items[i - 1].end.dateTime);
          let currStart = Date.parse(allEvents.data.items[i].start.dateTime);
          hourDifference = (currStart - prevEnd) / 3600000;
          if (prevEnd >= currStart) {
            continue;
          }
          if (parseInt(hours) && hourDifference <= parseInt(hours)) {
            continue;
          }
          availableTimes.push({ start: new Date(prevEnd), end: new Date(currStart) });
        }
      }
    }
    res.json({ data: availableTimes, success: true });
  } catch (err) {
    console.log(err);
    res.json({ data: err, error: true });
  }
});

app.listen(8000, () => {
  console.log("App running on 8000");
});

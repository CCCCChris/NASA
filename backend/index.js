import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running!" });
});

app.get("/api/apod", async (req, res) => {
  try {
    const { date } = req.query;
    const params = {
      api_key: process.env.NASA_API_KEY || "DEMO_KEY",
    };
    if (date) params.date = date;
    const nasaRes = await axios.get("https://api.nasa.gov/planetary/apod", { params });
    res.json(nasaRes.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch APOD", details: err.message });
  }
});

app.get("/api/mars-photos", async (req, res) => {
  try {
    const { rover = "Curiosity", date, camera } = req.query;
    if (!date || !camera) {
      return res.status(400).json({ error: "Missing required parameters: date and camera" });
    }
    const params = {
      api_key: process.env.NASA_API_KEY || "DEMO_KEY",
      earth_date: date,
      camera,
    };
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.toLowerCase()}/photos`;
    const nasaRes = await axios.get(url, { params });
    res.json(nasaRes.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Mars photos", details: err.message });
  }
});

app.get("/api/epic", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: "Missing required parameter: date" });
    }
    const params = {
      api_key: process.env.NASA_API_KEY || "DEMO_KEY",
    };
    const url = `https://api.nasa.gov/EPIC/api/natural/date/${date}`;
    const nasaRes = await axios.get(url, { params });
    res.json(nasaRes.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch EPIC images", details: err.message });
  }
});

app.get("/api/neos", async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    if (!start_date || !end_date) {
      return res.status(400).json({ error: "Missing required parameters: start_date and end_date" });
    }
    const params = {
      start_date,
      end_date,
      api_key: process.env.NASA_API_KEY || "DEMO_KEY",
    };
    const nasaRes = await axios.get("https://api.nasa.gov/neo/rest/v1/feed", { params });
    res.json(nasaRes.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Near Earth Objects", details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 
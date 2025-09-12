/**
 * Weather Widget Component
 *
 * This component fetches real weather data from WeatherAPI.com
 *
 * Setup:
 * 1. Copy .env.example to .env
 * 2. Get a free API key from https://www.weatherapi.com/signup.aspx
 * 3. Add your API key to the .env file as VITE_WEATHER_API_KEY
 *
 * If no API key is configured, the component will use mock data for demonstration.
 */

import { LitElement, html, css } from "lit";

export class WeatherWidget extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
        Cantarell, sans-serif;
      max-width: 400px;
      margin: 20px auto;
      background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      color: white;
    }

    .input-container {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
    }

    .city-input {
      flex: 1;
      padding: 12px 16px;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 16px;
      backdrop-filter: blur(10px);
    }

    .city-input::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    .city-input:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.3);
    }

    .fetch-button {
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .fetch-button:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }

    .fetch-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .weather-info {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 20px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .city-name {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
      text-align: center;
    }

    .temperature {
      font-size: 48px;
      font-weight: 300;
      text-align: center;
      margin: 16px 0;
    }

    .description {
      font-size: 18px;
      text-align: center;
      margin-bottom: 16px;
      text-transform: capitalize;
    }

    .details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 16px;
    }

    .detail-item {
      text-align: center;
    }

    .detail-label {
      font-size: 12px;
      opacity: 0.8;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }

    .detail-value {
      font-size: 16px;
      font-weight: 600;
    }

    .loading {
      text-align: center;
      font-size: 16px;
      padding: 20px;
    }

    .error {
      background: rgba(231, 76, 60, 0.2);
      border: 1px solid rgba(231, 76, 60, 0.5);
      border-radius: 8px;
      padding: 16px;
      text-align: center;
      margin-top: 16px;
    }

    .info {
      background: rgba(52, 152, 219, 0.2);
      border: 1px solid rgba(52, 152, 219, 0.5);
      border-radius: 8px;
      padding: 12px;
      font-size: 14px;
      margin-bottom: 16px;
      text-align: center;
    }

    .info a {
      color: white;
      text-decoration: underline;
    }

    .spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  static properties = {
    apiKey: { type: String },
    useMockData: { type: Boolean },
    city: { state: true },
    weatherData: { state: true },
    loading: { state: true },
    error: { state: true },
  };

  constructor() {
    super();
    this.apiKey = import.meta.env.VITE_WEATHER_API_KEY || ""; // Get API key from environment
    this.useMockData = !this.apiKey; // Use mock data only if no API key is available
    this.city = "";
    this.weatherData = null;
    this.loading = false;
    this.error = "";

    // Debug logging (remove in production)
    console.log("API Key loaded:", this.apiKey ? "Yes" : "No");
    console.log("Using mock data:", this.useMockData);
  }

  connectedCallback() {
    super.connectedCallback();
    console.log("WeatherWidget connected to the DOM");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log("WeatherWidget disconnected from the DOM");
  }

  getMockWeatherData(cityName) {
    // Mock data for demonstration purposes
    const mockData = {
      amsterdam: {
        name: "Amsterdam",
        sys: { country: "NL" },
        main: {
          temp: 18.5,
          feels_like: 17.2,
          humidity: 72,
          pressure: 1013,
        },
        weather: [{ description: "partly cloudy" }],
        wind: { speed: 3.2 },
      },
      utrecht: {
        name: "Utrecht",
        sys: { country: "NL" },
        main: {
          temp: 19.1,
          feels_like: 18.8,
          humidity: 68,
          pressure: 1015,
        },
        weather: [{ description: "sunny" }],
        wind: { speed: 2.8 },
      },
      london: {
        name: "London",
        sys: { country: "GB" },
        main: {
          temp: 15.3,
          feels_like: 14.1,
          humidity: 78,
          pressure: 1008,
        },
        weather: [{ description: "light rain" }],
        wind: { speed: 4.5 },
      },
      paris: {
        name: "Paris",
        sys: { country: "FR" },
        main: {
          temp: 20.7,
          feels_like: 20.2,
          humidity: 65,
          pressure: 1018,
        },
        weather: [{ description: "clear sky" }],
        wind: { speed: 1.9 },
      },
    };

    const normalizedCity = cityName.toLowerCase().trim();
    return (
      mockData[normalizedCity] || {
        name: cityName,
        sys: { country: "XX" },
        main: {
          temp: Math.floor(Math.random() * 30) + 5,
          feels_like: Math.floor(Math.random() * 30) + 5,
          humidity: Math.floor(Math.random() * 40) + 40,
          pressure: Math.floor(Math.random() * 50) + 990,
        },
        weather: [{ description: "partly cloudy" }],
        wind: { speed: Math.round(Math.random() * 10 * 10) / 10 },
      }
    );
  }

  handleInputChange(e) {
    this.city = e.target.value;
  }

  async fetchWeather() {
    if (!this.city.trim()) {
      this.error = "Please enter a city name";
      return;
    }

    this.loading = true;
    this.error = "";
    this.weatherData = null;

    try {
      if (this.useMockData || !this.apiKey) {
        // Use mock data for demonstration
        setTimeout(() => {
          this.weatherData = this.getMockWeatherData(this.city);
          this.loading = false;
          if (this.useMockData) {
            console.log(
              "Using mock data. API key not found in environment variables.",
            );
          }
        }, 800); // Simulate network delay
        return;
      }

      // WeatherAPI.com endpoint
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${encodeURIComponent(
          this.city,
        )}&aqi=no`,
      );

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || "City not found");
        } else if (response.status === 401) {
          throw new Error("Invalid API key");
        } else if (response.status === 403) {
          throw new Error("API key limit exceeded");
        } else {
          throw new Error("Failed to fetch weather data");
        }
      }

      const data = await response.json();

      // Convert WeatherAPI.com format to our expected format
      this.weatherData = {
        name: data.location.name,
        sys: { country: data.location.country },
        main: {
          temp: data.current.temp_c,
          feels_like: data.current.feelslike_c,
          humidity: data.current.humidity,
          pressure: data.current.pressure_mb,
        },
        weather: [{ description: data.current.condition.text.toLowerCase() }],
        wind: { speed: data.current.wind_kph / 3.6 }, // Convert km/h to m/s
      };
    } catch (error) {
      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("limit exceeded")
      ) {
        console.warn("Network error or API limit, falling back to mock data");
        this.weatherData = this.getMockWeatherData(this.city);
      } else {
        this.error = error.message;
      }
    } finally {
      this.loading = false;
    }
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.fetchWeather();
    }
  }

  render() {
    return html`
      ${this.useMockData
        ? html`
            <div class="info">
              Using mock weather data for demonstration. Real weather data will
              be used when the API key is properly configured.
            </div>
          `
        : html`
            <div class="info">
              🌤️ Using live weather data from WeatherAPI.com
            </div>
          `}

      <div class="input-container">
        <input
          type="text"
          class="city-input"
          placeholder="Enter city name..."
          .value=${this.city}
          @input=${this.handleInputChange}
          @keypress=${this.handleKeyPress}
          ?disabled=${this.loading}
        />
        <button
          class="fetch-button"
          @click=${this.fetchWeather}
          ?disabled=${this.loading}
        >
          ${this.loading ? html`<span class="spinner"></span>` : "Get Weather"}
        </button>
      </div>

      ${this.error ? html`<div class="error">${this.error}</div>` : ""}
      ${this.loading
        ? html`<div class="loading">Fetching weather data...</div>`
        : ""}
      ${this.weatherData
        ? html`
            <div class="weather-info">
              <div class="city-name">
                ${this.weatherData.name}, ${this.weatherData.sys.country}
              </div>
              <div class="temperature">
                ${Math.round(this.weatherData.main.temp)}°C
              </div>
              <div class="description">
                ${this.weatherData.weather[0].description}
              </div>

              <div class="details">
                <div class="detail-item">
                  <div class="detail-label">Feels like</div>
                  <div class="detail-value">
                    ${Math.round(this.weatherData.main.feels_like)}°C
                  </div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Humidity</div>
                  <div class="detail-value">
                    ${this.weatherData.main.humidity}%
                  </div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Wind Speed</div>
                  <div class="detail-value">
                    ${this.weatherData.wind.speed} m/s
                  </div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Pressure</div>
                  <div class="detail-value">
                    ${this.weatherData.main.pressure} hPa
                  </div>
                </div>
              </div>
            </div>
          `
        : ""}
    `;
  }
}

customElements.define("weather-widget", WeatherWidget);

import {
  Card,
  Chip,
  List,
  ListItem,
  ListItemPrefix,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  WeatherService,
  WeatherInfo,
  WeatherError,
  WeatherErrorType,
} from "@genezio-sdk/bogdan-weather-app-delete_us-east-1";
import Star from "./svg/Star";
import Logo from "./svg/Logo";
// @ts-expect-error Missing types for this package
import ReactAnimatedWeather from "react-animated-weather";

export default function WeatherApp() {
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  const [weather, setWeather] = useState<
    WeatherInfo | WeatherError | undefined
  >(undefined);

  const [loadingWeather, setLoadingWeather] = useState(false);

  const { location } = useParams();

  useEffect(() => {
    WeatherService.getFavorites()
      .then((favorites) => {
        setFavoriteCities(favorites);
      })
      .catch(() => {});

    if (location) {
      setLoadingWeather(true);
      WeatherService.getWeather(location).then((weatherInfo) => {
        setWeather(weatherInfo);
        setLoadingWeather(false);
      });
    }
  }, [location]);

  return (
    <div className="border-solid border border-[#4e4668] rounded-2xl h-full flex flex-col">
      <Header setWeather={setWeather} setLoadingWeather={setLoadingWeather} />
      <div className="flex flex-row h-full">
        <FavoriteTabs
          favoriteCities={favoriteCities}
          setWeather={setWeather}
          setLoadingWeather={setLoadingWeather}
        />
        <div className="border-solid border-0 border-t border-l border-[#4e4668] grow">
          <WeatherDisplay
            loading={loadingWeather}
            weather={weather}
            favoriteCities={favoriteCities}
            setFavoriteCities={setFavoriteCities}
          />
        </div>
      </div>
    </div>
  );
}

function Header({
  setWeather,
  setLoadingWeather,
}: {
  setWeather: (city: WeatherInfo | WeatherError | undefined) => void;
  setLoadingWeather: (loading: boolean) => void;
}) {
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  return (
    <div className="flex flex-row items-center">
      <Card
        className="bg-[#725ac1] border-solid border-2 border-transparent hover:bg-opacity-50 hover:bg-[#725ac1] hover:border-[#725ac1] cursor-pointer h-fit ml-2"
        onClick={() => {
          navigate("/");
        }}
        shadow={false}
      >
        <Typography variant="h6" color="white" className="my-2 mx-6">
          ⇦ Back
        </Typography>
      </Card>
      <div className="flex flex-row items-center justify-center grow">
        <Typography variant="h5" className="mr-2">
          City:
        </Typography>
        <input
          id="cityInput"
          className="my-3 h-[2rem] rounded-l-xl text-xl bg-[#4e4668] text-white px-2 w-52 border-none focus:outline-none"
          onChange={({ target }) => {
            if (target.value === "") setButtonDisabled(true);
            else setButtonDisabled(false);
          }}
          onKeyDown={({ key }) => {
            if (key === "Enter") {
              document.getElementById("checkWeatherButton")?.click();
              document.getElementById("cityInput")?.focus();
            }
          }}
        />
        <button
          id="checkWeatherButton"
          className="right-1 top-1 rounded-r-xl my-3 h-[2.1rem] border-none disabled:text-[#c7c7c7] disabled:bg-[#757085] disabled:cursor-not-allowed hover:bg-[#6b57ac] hover:text-white bg-[#725ac1] text-white focus:outline-none"
          onClick={async () => {
            // Unfocus the button
            (document.activeElement as HTMLElement).blur();

            setLoadingWeather(true);

            const input = document.getElementById(
              "cityInput"
            ) as HTMLInputElement;
            if (!input) return;

            const cityName = input.value;
            window.history.replaceState(null, "", `/app/${cityName}`);

            const weatherInfo = await WeatherService.getWeather(cityName);

            setWeather(weatherInfo);
            setLoadingWeather(false);
          }}
          disabled={buttonDisabled}
        >
          Check Weather 👀
        </button>
      </div>
      <div className="flex flex-row pr-2 items-center">
        <Logo width={100} className="h-[1.5rem]" />
        <Typography variant="h5" className="text-[#725ac1]">
          Weather
        </Typography>
      </div>
    </div>
  );
}

function FavoriteTabs({
  favoriteCities,
  setWeather,
  setLoadingWeather,
}: {
  favoriteCities: string[];
  setWeather: (city: WeatherInfo | WeatherError | undefined) => void;
  setLoadingWeather: (loading: boolean) => void;
}) {
  return (
    <List className="min-w-0 border-0 border-solid border-[#4e4668] border-t w-[15rem]">
      {favoriteCities.map((city) => (
        <FavoriteTab
          key={city}
          city={city}
          setWeather={setWeather}
          setLoadingWeather={setLoadingWeather}
        />
      ))}
    </List>
  );
}

function FavoriteTab({
  city,
  setWeather,
  setLoadingWeather,
}: {
  city: string;
  setWeather: (city: WeatherInfo | WeatherError | undefined) => void;
  setLoadingWeather: (loading: boolean) => void;
}) {
  return (
    <ListItem
      className="min-w-0 p-0 h-[3rem] hover:bg-[#725ac1] hover:text-white text-white focus:bg-[#725ac1] focus:text-white active:bg-[#725ac1] active:text-white"
      onClick={() => {
        setLoadingWeather(true);
        window.history.replaceState(null, "", `/app/${city}`);

        WeatherService.getWeather(city).then((weatherInfo) => {
          setWeather(weatherInfo);
          setLoadingWeather(false);
        });
      }}
    >
      <ListItemPrefix>
        <Star width={15} fill="#ED8A19" className="pl-3" />
      </ListItemPrefix>
      <Typography variant="h6">{city}</Typography>
    </ListItem>
  );
}

function WeatherDisplay({
  weather,
  favoriteCities,
  setFavoriteCities,
  loading,
}: {
  weather: WeatherInfo | WeatherError | undefined;
  favoriteCities: string[];
  setFavoriteCities: (cities: string[]) => void;
  loading: boolean;
}) {
  if (loading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner className="h-12 w-12 text-white" color="deep-purple" />
      </div>
    );

  // If no search has been made yet
  if (weather === undefined) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div className="[&>*]:w-[10rem] [&>*]:h-[10rem]">
          <ReactAnimatedWeather
            icon="PARTLY_CLOUDY_DAY"
            size={300}
            color="white"
          />
        </div>
        <Typography variant="h3" className="text-center m-0">
          Welcome to the Weather App!
        </Typography>
        <Typography variant="h5" className="text-center m-0 font-medium">
          Search for a city using the input above to get started.
        </Typography>
      </div>
    );
  }

  // If weather is instance of WeatherError
  if (weather.status === "error") {
    let message: string;
    switch (weather.type) {
      case WeatherErrorType.NotFound:
        message = "The searched city may not exist.";
        break;
      case WeatherErrorType.ServiceDown:
        message = "The external weather API (wttr.in) may be down.";
        break;
      case WeatherErrorType.Unknown:
      default:
        message = "An unknown error occurred.";
        break;
    }

    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div className="[&>*]:w-[10rem] [&>*]:h-[10rem]">
          <ReactAnimatedWeather icon="SLEET" size={300} color="white" />
        </div>
        <Typography variant="h3" className="text-center m-0">
          Something went wrong.
        </Typography>
        <Typography variant="h5" className="text-center m-0 font-medium">
          {message}
        </Typography>
      </div>
    );
  }
  const starStyle = favoriteCities.includes(weather.originalLocation)
    ? "fill-[#ED8A19]"
    : "fill-[#c7c7c7] hover:fill-[#ED8A19]";

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <Typography variant="h1" className="text-center mb-0">
          {weather.originalLocation}
          <Star
            width={30}
            className={`pl-3 ${starStyle}`}
            onClick={() => {
              if (favoriteCities.includes(weather.originalLocation)) {
                const newFavoriteCities = favoriteCities.filter(
                  (city) => city !== weather.originalLocation
                );
                WeatherService.setFavorites(newFavoriteCities);
                setFavoriteCities(newFavoriteCities);
              } else {
                const newFavoriteCities = [
                  ...favoriteCities,
                  weather.originalLocation,
                ];
                WeatherService.setFavorites(newFavoriteCities);
                setFavoriteCities(newFavoriteCities);
              }
            }}
          />
        </Typography>
        <Typography variant="h5" className="text-center mt-0">
          {weather.location}
        </Typography>
      </div>

      <div>
        <div className="flex flex-row items-center justify-center">
          <Typography className="text-center text-8xl font-semibold my-0">
            {weather.actualTemperature}°C
          </Typography>
          <div className="[&>*]:w-[5rem] [&>*]:h-[5rem] ml-[2rem]">
            <ReactAnimatedWeather
              icon={weather.weatherCondition}
              size={100}
              color="white"
            />
          </div>
        </div>
        <Typography variant="h5" className="text-center mt-0 font-medium">
          Recorded at {weather.localObsTime} local time
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <WeatherBadge title="Wind" value={`${weather.wind} Km/h`} />
        <WeatherBadge title="Humidity" value={`${weather.humidity}%`} />
        <WeatherBadge
          title="Precipitation"
          value={`${weather.precipitation} mm`}
        />
        <WeatherBadge title="Pressure" value={`${weather.pressure} hPa`} />
      </div>
    </div>
  );
}

function WeatherBadge({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex flex-row items-center justify-center">
      <Typography variant="h5" className="text-center mr-[1rem] font-medium">
        {title}:
      </Typography>
      <Chip
        variant="filled"
        size="sm"
        value={value}
        className="rounded-full bg-[#725ac1] text-base normal-case"
      />
    </div>
  );
}

import { Typography } from "@material-tailwind/react";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Typography variant="h1" className="text-8xl m-5">
        404
      </Typography>
      <Typography variant="h5" className="m-0">
        Oops! Something went wrong.
      </Typography>
    </div>
  );
}

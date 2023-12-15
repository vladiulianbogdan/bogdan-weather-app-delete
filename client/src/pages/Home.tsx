import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Logo from "./svg/Logo";

export default function Home() {
  const cards: RedirectCardProps[] = [
    {
      title: "Docs",
      description: "Explore our documentation",
      link: "https://docs.genez.io/",
    },
    {
      title: "Examples",
      description: "Explore our examples",
      link: "https://docs.genez.io/genezio-documentation/examples",
    },
    {
      title: "Blog",
      description: "Read about our lastest updates and tutorials",
      link: "https://genez.io/blog/",
    },
    {
      title: "Dashboard",
      description: "Manage your account and your deployed projects",
      link: "https://app.genez.io/",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-center justify-center grow">
        <Logo className="w-[20rem] md:w-[30rem] xl:w-[40rem]" />
        <TryDemoCard text="Try our Weather App ➤" link="/app" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 grow-0">
        {cards.map((card) => (
          <RedirectCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
}

type TryDemoCardProps = {
  text: string;
  link: string;
};

function TryDemoCard({ text, link }: TryDemoCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="mt-6 bg-[#725ac1] border-solid border-2 border-transparent hover:bg-opacity-50 hover:bg-[#725ac1] hover:border-[#725ac1] cursor-pointer"
      onClick={() => {
        navigate(link);
      }}
      shadow={false}
    >
      <CardBody className="p-4">
        <Typography variant="h4" color="white" className="m-0">
          {text}
        </Typography>
      </CardBody>
    </Card>
  );
}

type RedirectCardProps = {
  title: string;
  description: string;
  link: string;
};

function RedirectCard({ title, description, link }: RedirectCardProps) {
  return (
    <Card
      className="bg-opacity-0 border-solid border-2 border-transparent hover:bg-opacity-20 hover:bg-[#725ac1] hover:border-[#725ac1] cursor-pointer"
      onClick={() => {
        window.open(link, "_blank");
      }}
      shadow={false}
    >
      <CardBody>
        <div className="flex flex-row items-center">
          <Typography variant="h3" color="white" className="m-0">
            {title}
          </Typography>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="h-4 w-4 ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </div>

        <Typography variant="h5" className="m-0 mt-1 text-[#725ac1]">
          {description}
        </Typography>
      </CardBody>
    </Card>
  );
}

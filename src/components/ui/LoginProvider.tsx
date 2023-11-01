import { useEffect, useState } from "react";
import { getProviders } from "next-auth/react";
import { useLoginWithProvider } from "@/plugins/dependencies";
import Image from "next/image";

import { Button } from "./";

export const LoginProvider = () => {
  const [providers, setProviders] = useState<any>({});
  const loginWithProvider = useLoginWithProvider();

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  return Object.values(providers).map((provider: any) => {
    if (provider.id === "credentials") return <div key="credentials"></div>;

    return (
      <div key={provider.id} className="container-button">
        <Button
          backgroundColor={
            provider.name === "Google" ? "outline-red" : "outline-blue"
          }
          onClick={() => {
            loginWithProvider.provider(provider.id);
          }}
        >
          {" "}
          <Image
            priority
            style={{ marginRight: "1rem" }}
            src={
              provider.name === "Google"
                ? "/icons/google.svg"
                : "/icons/facebook.svg"
            }
            width={25}
            height={25}
            alt="trash"
          />{" "}
          Login con {provider.name}
        </Button>
      </div>
    );
  });
};

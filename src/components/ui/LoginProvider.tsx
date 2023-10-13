import { useEffect, useState } from "react";
import { getProviders } from "next-auth/react";
import Image from "next/image";

import { useLoginWithProvider } from "@/hooks/auth";
import { Button } from "./";

export const LoginProvider = () => {
  const [providers, setProviders] = useState<any>({});
  const loginProvider = useLoginWithProvider();

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  if (!Object.values(providers)) return;

  return (
    Object.values(providers).map((provider: any) => {
      if (provider.id === "credentials") return <div key="credentials"></div>;

      return (
        <Button
          backgroundColor={
            provider.name === "Google" ? "outline-red" : "outline-blue"
          }
          key={provider.id}
          onClick={() => loginProvider.mutate(provider.id)}
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
      );
    })
  )
}

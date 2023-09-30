import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useLoginProviderOrLogout } from "@/hooks/auth/useLoginProviderOrLogout";

import { useAuthentication } from "@/hooks/auth";

export const Header = () => {
  const router = useRouter();

  const { logOut } = useLoginProviderOrLogout();
  const { nextSession } = useAuthentication();

  const user = nextSession?.user;

  const existImage = user?.image?.length! > 0;
  const image = existImage ? user?.image : "/user.svg";

  const navigateTo = (url: string) => {
    router.push(url);
  };

  return (
    <header className="header">
      <div className="header__brand">
        <Link href="/">
          <Image
            priority
            className="header__brand--image"
            src="/logo.svg"
            alt=""
            width={75}
            height={70}
          />
        </Link>

        <ul className="header__brand--navigation">
          <li className="header__brand--navigation-item">
            <Link className="header__brand--navigation-link" href="/about">
              Nosotros
            </Link>
          </li>
          <li className="header__brand--navigation-item">
            <Link className="header__brand--navigation-link" href="/contact">
              Contacto
            </Link>
          </li>
        </ul>
      </div>

      <div className="header__login">
        <div className="header__login--cart">
          <Link href="cart">
            <Image src="/cart.svg" alt="" width={40} height={40} />
            <span className="header__login--number">1</span>
          </Link>
        </div>

        <ul className="header__login--nav">
          {!user ? (
            <>
              <li className="header__login--nav-item">
                <button
                  className="header__login--nav-link"
                  onClick={() =>
                    navigateTo(`/auth/register?p=${router.asPath}`)
                  }
                >
                  Crea tu cuenta
                </button>
              </li>
              <li className="header__login--nav-item">
                <button
                  className="header__login--nav-link"
                  onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
                >
                  Login
                </button>
              </li>
            </>
          ) : (
            <>
              <span
                style={{
                  textTransform: "uppercase",
                  fontSize: "1.2rem",
                  color: "#0f386a",
                }}
              >
                Bienvenido {user?.name}
              </span>
              <li className="header__login--nav-item">
                <button
                  className="header__login--nav-link"
                  onClick={() => logOut.mutate()}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
        {user ? (
          <Link href="/auth/configuration">
            <Image
              className="header__login--user"
              src={`${image!}`}
              alt="user"
              width={35}
              height={35}
            />
          </Link>
        ) : (
          <div>
            <Image
              className="header__login--user"
              src="/user.svg"
              alt="user"
              width={35}
              height={35}
            />
          </div>
        )}
      </div>
    </header>
  );
};

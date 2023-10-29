import { useUIStore, useFormStore } from "@/stores";
import Image from "next/image";
import Link from "next/link";

interface Props {
  src: string;
  alt: string;
  href: string;
  children: string | string[];
}

export const NavLink = ({ src, alt, children, href }: Props) => {
  const reset = useUIStore((state) => state.resetPage);
  const handleResetForm = useFormStore((state) => state.handleResetForm);
  const clearItems = useUIStore((state) => state.clearItems);

  const clearState = () => {
    clearItems();
    reset();
    handleResetForm({});
  };

  return (
    <li className="private-nav__container--item">
      <Image src={src} alt={alt} width={40} height={20} priority />
      <Link
        href={href}
        className="private-nav__container--link"
        onClick={clearState}
      >
        {children}
      </Link>
    </li>
  );
};

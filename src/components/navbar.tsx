"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
// import { signOut } from "../../auth/signout";

// Define the allowed color values
type ColorType = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

interface MenuItem {
  label: string;
  link: string;
}

interface ProfileItemAction {
  key: string;
  label: string;
  color?: ColorType;
  className?: string;
}

// Define a more specific type for avatar profile
interface AvatarProfile {
  type: "avatar";
  name: string;
  src?: string;
  actions: ProfileItemAction[];
}

// Define a custom profile component type
interface CustomProfile {
  type: "custom";
  component: ReactNode;
}

// Union type for all possible profile types
type ProfileItems = AvatarProfile | CustomProfile;

interface BaseNavbarProps {
  logoLink?: string;
  menuItems?: MenuItem[];
  profileItems: ProfileItems;
}

export function BaseNavbar({ logoLink, menuItems, profileItems }: BaseNavbarProps): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const routerUrl = usePathname();

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        {logoLink ? (
          <Link href={logoLink}>
            <h1 className="text-lg font-semibold text-primary mr-6 whitespace-nowrap">
              <span className="text-black">NHS</span> TutorMe
            </h1>
          </Link>
        ) : (
          <h1 className="text-lg font-semibold text-primary mr-6 whitespace-nowrap">
            <span className="text-black">NHS</span> TutorMe
          </h1>
        )}

        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {menuItems?.map((item, index) => (
            <NavbarItem
              key={`${item.label}-${index}`}
              isActive={routerUrl === item.link}
            >
              <Link
                href={item.link}
                aria-current={routerUrl === item.link ? "page" : undefined}
                color={routerUrl === item.link ? "primary" : "foreground" as any}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </NavbarContent>
      <NavbarContent justify="end">
        {profileItems.type === "avatar" ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={profileItems.name}
                size="sm"
                src={profileItems.src}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={profileItems.actions}>
              {(item: ProfileItemAction) => (
                <DropdownItem
                  key={item.key}
                  color={item.color as ColorType || "default"}
                  className={item.className || ""}
                  onClick={
                    item.key === "logout"
                      ? () => {
                        //   signOut();
                        }
                      : undefined
                  }
                >
                  {item.label}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div>{profileItems.component}</div>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems?.map((item, index) => (
          <NavbarMenuItem
            key={`${item.label}-${index}`}
            isActive={routerUrl === item.link}
          >
            <Link
              className="w-full"
              href={item.link}
              size="lg"
              color={routerUrl === item.link ? "primary" : "foreground" as any}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
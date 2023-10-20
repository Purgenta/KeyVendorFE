import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import { authSelector, authenticate } from "../redux/authSlice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiMenu,
  FiChevronDown,
  FiDatabase,
} from "react-icons/fi";
import { IconType } from "react-icons";
interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Keys", icon: FiHome, href: "/" },
];
const AdminRoutes: LinkItemProps[] = [
  { name: "Admin", icon: FiDatabase, href: "/admin" },
];
const SalesRoutes: LinkItemProps[] = [
  { name: "Sales", icon: FiTrendingUp, href: "/sales" },
];
export default function SidebarWithHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box position={"relative"} ml={{ base: 0, md: 60 }} p="4">
        {<Outlet />}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { roles } = useSelector(authSelector);
  const userRoles = new Set(roles ? roles : []);
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem href={link.href} key={link.name} icon={link.icon}>
          <Text>{link.name}</Text>
        </NavItem>
      ))}
      {userRoles.has("Marketing") ? (
        SalesRoutes.map((link) => (
          <NavItem href={link.href} key={link.name} icon={link.icon}>
            <Text>{link.name}</Text>
          </NavItem>
        ))
      ) : (
        <></>
      )}
      {userRoles.has("Administrator") ? (
        AdminRoutes.map((link) => (
          <NavItem href={link.href} key={link.name} icon={link.icon}>
            <Text>{link.name}</Text>
          </NavItem>
        ))
      ) : (
        <></>
      )}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  href: string;
}
const NavItem = ({ icon, href, children }: NavItemProps) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const navigate = useNavigate();
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Box display={{ base: "flex", md: "none" }}>
        <Image
          src={"https://www.g2a.com/static/assets/images/logo_g2a_white.svg"}
          width={75}
          height={75}
          alt="logo"
        ></Image>
      </Box>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{auth.email || ""}</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              {auth.email ? (
                <>
                  <MenuItem
                    onClick={() =>
                      dispatch(
                        authenticate({ email: "", jwt: "", roles: undefined })
                      )
                    }
                  >
                    Logout
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
                  <MenuItem onClick={() => navigate("/login")}>
                    Register
                  </MenuItem>
                </>
              )}
              <MenuDivider />
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

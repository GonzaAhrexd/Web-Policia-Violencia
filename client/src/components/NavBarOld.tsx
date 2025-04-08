// Hooks
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
// NEXT UI 
import { Avatar, Navbar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarBrand, NavbarContent, NavbarItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
// Iconos
import { ListBulletIcon, PencilSquareIcon, ChartPieIcon, UserPlusIcon, PresentationChartBarIcon, ArrowUpTrayIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline'

type NavBarProps = {
  user: any
}

function NavBar({ user }: NavBarProps) {

  // Estados
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isAdmin: boolean = user?.rol === 'admin';
  const isCarga: boolean = user?.rol === 'carga' || user?.rol === 'admin';
  const isAgente: boolean = user?.rol === 'agente' || user?.rol === 'admin' || user?.rol === 'carga';
  const APIURL = import.meta.env.VITE_BASE_URL
  // Menú de navegación
  const menuAdminItems = [
    "Administrar usuarios",
    "Registro de actividad",
    "Editar campos",
  ]
  // Menú de carga
  const menuCargaItems = [
    "Mis denuncias",
    "Verificar denuncias",
    "Cargar denuncias",
    "Estadísticas",
  ]

  // Menú de agente
  const menuAgenteItems = [
    "Búsqueda",
  ]

  // Seccion de denuncias para agentes
  const seccionDenunciasAgentes = [
    { titulo: 'Mis denuncias', href: '/mis-denuncias', icon: <ListBulletIcon className='h-6 w-6' /> },
    { titulo: 'Cargar denuncias', href: '/cargar-denuncias', icon: <PencilSquareIcon className='h-6 w-6' /> },
  ]

  // Seccion de denuncias para carga
  const SeccionDenunciasCarga = [
    { titulo: 'Mis denuncias', href: '/mis-denuncias', icon: <ListBulletIcon className='h-6 w-6' /> },
    { titulo: 'Cargar denuncias', href: '/cargar-denuncias', icon: <PencilSquareIcon className='h-6 w-6' /> },
    { titulo: 'Verificar denuncias', href: '/verificar-denuncias', icon: <ClipboardDocumentCheckIcon className='h-6 w-6' /> },
    { titulo: 'Estadísticas', href: '/estadísticas', icon: <ChartPieIcon className='h-6 w-6' /> },
  ]

  // Seccion de admin
  const SeccionAdmin = [
    { titulo: 'Administrar usuarios', href: '/administrar-usuarios', icon: <UserPlusIcon className='h-6 w-6' /> },
    { titulo: 'Registro de actividad', href: '/registro-de-actividad', icon: <PresentationChartBarIcon className='h-6 w-6' /> },
    { titulo: 'Editar campos', href: '/editar-campos', icon: <ArrowUpTrayIcon className='h-6 w-6' /> },
  ]

  return (
    <div className='flex flex-row'>
      <Navbar
        className='bg-sky-900 text-white font-medium leading-tight h-1/10 flex flex-row align-middle'
        isBordered
        as="div"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NavLink to='/'
            className="flex flex-row items-center space-x-2"
          >
            <figure className='w-full h-full flex flex-row items-center justify-center'>
              <img className='w-10' src="Escudo_Policia_Chaco_Transparente.png" alt="" />
            </figure>
          </NavLink>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {(isAgente && !isCarga) && (
            <Dropdown>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent font-medium data-[hover=true]:bg-transparent "
                    endContent={"🚀"}
                    radius="sm"
                    variant="light"
                  >
                    Denuncias
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="ACME features"
                className="bg-white border-teal-500 w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                {seccionDenunciasAgentes.map((item, index) => (
                  <DropdownItem
                    className='bg-white'
                    key={index}
                    startContent={
                      item.icon
                    }
                    >
                    {item.titulo}
                  </DropdownItem>
                    
                ))
                }
              </DropdownMenu>
            </Dropdown>
          )}
          {isCarga && (

            <Dropdown>

              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent font-medium data-[hover=true]:bg-transparent "
                    endContent={"🚀"}
                    radius="sm"
                    variant="light"
                  >
                    Denuncias
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="ACME features"
                className="bg-white border-teal-500 w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                {SeccionDenunciasCarga.map((item, index) => (

                  <DropdownItem
                    className='bg-white'
                    key={index}
                    startContent={
                      item.icon
                    }
                  >
              <NavLink to={item.href} aria-current="page">
                    {item.titulo}
              </NavLink>
                  </DropdownItem>
                ))
                }
              </DropdownMenu>
            </Dropdown>
          )}
          {isAgente && (
            <NavbarItem>
              <NavLink to="/búsqueda" aria-current="page">
                Búsqueda
              
              </NavLink>
            </NavbarItem>
          )}
          {isAdmin && (
            <Dropdown>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent font-medium data-[hover=true]:bg-transparent justify-start "
                    endContent={"🚀"}
                    radius="sm"
                    variant="light"
                  >
                    Admin
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="ACME features"
                className="bg-white border-teal-500 w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                {SeccionAdmin.map((item, index) => (
                  <DropdownItem
                    className='bg-white'
                    key={index}
                    startContent={
                      item.icon
                    }
                    >
                      <NavLink to={item.href} aria-current="page">
                    {item.titulo}
                    </NavLink>
                  </DropdownItem>
                ))
                }
              </DropdownMenu>
            </Dropdown>
          )}
        </NavbarContent>
        <NavbarContent as="div" className="items-center" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user.nombre + " " + user.apellido}
                size="sm"
                src={user.imagen != "sin_definir" ? `${APIURL}/users/${user.id}/image` : "/user.png"}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profilef Actions" variant="flat" className='bg-white'>
              <DropdownItem key="user" className="h-14 gap-2 ">
                <p className="font-semibold">Sesión iniciada como</p>
                <p className="font-semibold">{user.nombre + " " + user.apellido} </p>
              </DropdownItem>
              <DropdownItem key="profile" color="danger">
              <NavLink to="/mi-perfil" aria-current="page">
                Mi Perfil
                </NavLink>
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
              <NavLink to="/logout"> 
                Cerrar sesión
              </NavLink>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
        <NavbarMenu className='flex flex-col items-center bg-sky-900'>
          {isCarga && menuCargaItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NavLink
                color={
                  index === 2 ? "primary" : index === menuAdminItems.length - 1 ? "danger" : "foreground"
                }
                className="w-full text-2xl text-white"
                to={`/${item.toLowerCase().replace(" ", "-")}`}
              >
                {item}
              </NavLink>
            </NavbarMenuItem>
          ))}
          {isAgente && menuAgenteItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NavLink
                color={
                  index === 2 ? "primary" : index === menuAdminItems.length - 1 ? "danger" : "foreground"
                }
                className="w-full text-2xl text-white"
                to={`/${item.toLowerCase().replace(" ", "-")}`}
              >
                {item}
              </NavLink>
            </NavbarMenuItem>
          ))}
          {isAdmin && menuAdminItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NavLink
                color={
                  index === 2 ? "primary" : index === menuAdminItems.length - 1 ? "danger" : "foreground"
                }
                className="w-full text-2xl text-white"
                to={`/${item.toLowerCase().replace(/ /g, "-")}`}
              >
                {item}
              </NavLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  )


}

export default NavBar
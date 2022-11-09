import { useState, useContext, createContext } from 'react'
import sublinks from './data'

interface AppContextType {
    showSidebar: boolean
    showSubmenu: boolean
    openSidebar: () => void
    closeSidebar: () => void
    openSubmenu: (text: string, coordinates: { center: string, bottom: string }) => void
    closeSubmenu: () => void
    location: { center: string, bottom: string }
    page: any
}

const AppContext = createContext({} as AppContextType)

export const AppProvider = ({ children }: any) => {

    const [showSidebar, setShowSidebar] = useState(false);
    const [showSubmenu, setShowSubmenu] = useState(false)
    const [location, setLocation] = useState({ center: "", bottom: "" })
    const [page, setPage] = useState<any>({})

    const openSidebar = () => setShowSidebar(true)
    const closeSidebar = () => setShowSidebar(false)

    const openSubmenu = (text: string, coordinates: { center: string, bottom: string }) => {
        const menuPage = sublinks.find((sublink: any) => sublink.page === text)
        setPage(menuPage)
        setLocation(coordinates)
        setShowSubmenu(true)
    }

    const closeSubmenu = () => setShowSubmenu(false)

    return (
        <AppContext.Provider
            value={{
                showSidebar,
                showSubmenu,
                openSidebar,
                closeSidebar,
                openSubmenu,
                closeSubmenu,
                location,
                page
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

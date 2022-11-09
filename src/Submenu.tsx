import { useState, useRef, useEffect } from 'react'
import { useGlobalContext } from './context'

const Submenu = () => {

  const [columns, setColumns] = useState('col-2')
  const { showSubmenu, location, page: { page, links } } = useGlobalContext()
  const containerRef = useRef(null)

  useEffect(() => {

    setColumns('col-2')

    const submenu: any = containerRef.current;
    const { center, bottom } = location
    submenu.style.left = `${center}px`
    submenu.style.top = `${bottom}px`

    if (links?.length === 3) {
      setColumns('col-3')
    }
    if (links?.length > 3) {
      setColumns('col-4')
    }

  }, [location, links])

  return (
    <aside className={`${showSubmenu && "show"} submenu`} ref={containerRef}>
      <h4>{page}</h4>
      <div className={`submenu-center ${columns}`}>
        {links?.map((link: any, index: number) => {
          const { label, icon, url } = link
          return (
            <a key={index} href={url}>{icon}{label}</a>
          )
        })}
      </div>
    </aside>
  )
}

export default Submenu

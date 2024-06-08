import axios from 'axios'
import { toast } from 'react-toastify'
import { BiChevronDown } from 'react-icons/bi'
import styles from './navbar.module.scss'
import { useUser } from 'src/contexts/userContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logo from '../../assets/logo.svg'
import logoText from '../../assets/logoText.svg'
/* import logoTextWhite from '../../assets/logoTextWhite.svg' */

export const Navbar = () => {
  const navigate = useNavigate()
  const [active, setActive] = useState(false)
  const path = useLocation().pathname
  const { user } = useUser()

  const handleLogout = () => {
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/client/logout`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
      .then(() => {
        localStorage.removeItem('token')
        toast.success('Logged out successfully')
        navigate('/sign-in')
      })
      .catch((e) => {
        console.log(e)
        toast.error('Failed to logout')
      })
  }

  return (
    <>
      <nav className={styles.navbar}>
        <a href='/' className={styles.logo}>
          <img src={logoText} alt="logo" />
        </a>
        <div className={styles.links}>
          <a href='/'className={''}>Dashboard</a>
          <a href='/my-centrals'className={''}>My Centrals</a>
          <a href='/new-central'>New Central</a>          
          <div className={styles.dropdown}>
            <a className={styles.dropdownText} href='/account?tab=settings'>
              <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/2048px-Avatar_icon_green.svg.png' alt="picture" className={styles.profilePicture} />
              <span className={styles.name}>{user?.username.toUpperCase()}</span>
              <BiChevronDown />
            </a>

            <div className={styles.dropdownContent}>
              <button onClick={() => navigate({ pathname: '/account', search: '?tab=settings' })}>Settings</button>
              <hr />
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div >
      </nav >
      <nav className={`${styles.navbarMobile} ${active && styles.navbarMobileActive}`}>
        <div className={styles.navbarTop}>
          <a href='/' className={styles.logo}>
            {/* <img src={active ? logoTextWhite : logoText} alt="logo" /> */}
          </a>
          <img
            src={logo}
            alt="burger"
            className={styles.burger}
            onClick={() => setActive(!active)}
          />
        </div>
        {
          active &&
          <div className={styles.burgerMenu}>
            <button onClick={() => navigate('/reservations')} className={path.includes('reservations') ? styles.activeLink : ''}>Reservations</button>
            <button onClick={() => navigate('/notifications')} className={path.includes('notifications') ? styles.activeLink : ''}>Notifications</button>
            <button onClick={() => navigate({ pathname: '/account', search: '?tab=settings' })} className={styles.profile}>
              <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/2048px-Avatar_icon_green.svg.png' alt="picture" className={styles.profilePicture} />
              <span className={styles.name}>{user?.first_name.toUpperCase()}</span>
            </button>
          </div>
        }
      </nav>
    </>
  )
}

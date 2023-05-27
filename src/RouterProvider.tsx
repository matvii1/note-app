import { FC, ReactNode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return <Router>{children}</Router>
}

export default Layout

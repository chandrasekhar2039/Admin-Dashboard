import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        {/* <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">CoreUI</a> */}
        <span className="ml-2">&copy; 2021 Banahara. All Rights Reserved</span>
      </div>
      <div className="mfs-auto mr-3 d-md-down-none">
        <span className="mr-1">Made by</span>
        <a href="https://bagdigital.in/" target="_blank" rel="noopener noreferrer">BAG Digital</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)

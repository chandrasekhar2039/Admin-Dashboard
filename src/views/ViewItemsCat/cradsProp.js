import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CCardFooter,
  CTooltip,
  CBadge
} from '@coreui/react';

  import CIcon from '@coreui/icons-react';
  import { Link } from "react-router-dom";

  var CardProp =({prop})=>{

    return (
      <CCol className="" xs="12" sm="12" md="3" xl="3">
        <CCard>
          <CCardHeader>
            <h5>{prop.name}</h5>
          </CCardHeader>
          <CCardBody>
            <div className="row">
              <div className="col">
                {prop.sub_categories.length > 0 ? (prop.sub_categories.map((each)=>{
                  return <CTooltip key={each.id} content="Click to view items in this Sub category"><Link key={each.id} to={`/view/category/subcategory/${each.slug}`}><CButton size="sm" variant="outline" color="info" className="m-1 mr-3 position-relative">{each.name} {each.item_count !==0 && <CBadge color="danger" shape="pill" className="position-absolute top-0 start-100 translate-middle">{each.item_count}</CBadge>} </CButton></Link></CTooltip>
          })) : <p>No Sub category</p>}
          </div>
          </div>
          <p className="mt-3 mb-0">{prop.description ? prop.description.substr(0,120) : `Description not set` }</p>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-end">
          <Link to={`/view/category/${prop.slug}`}><CButton size="sm" color="primary">View Items</CButton></Link>

          </CCardFooter>
        </CCard>
        </CCol>
    )
  }

  export default CardProp;

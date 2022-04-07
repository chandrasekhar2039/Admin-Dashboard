import {
  CCard,
  CCardBody,
  CCol,
  CButton,
  CCardFooter,
  CCarousel,
  CCarouselCaption,
  CCarouselControl,
  CCarouselIndicators,
  CCarouselInner,
  CCarouselItem,
  CCardHeader
   } from '@coreui/react';

  import {Link} from "react-router-dom"
  import CIcon from '@coreui/icons-react';

  import { useSelector, useDispatch } from 'react-redux'
  import {delReq} from "../../Redux/Actions/Delete/action";

  var ItemsCard =({prop})=>{
    var dispatch=useDispatch();
    // console.log(prop);

    var deleteHandel=(e)=>{
      dispatch(delReq(e.target.value));
    }

    return (
      <CCol className="" xs="12" sm="12" md="6" xl="6">
        <CCard>
          <CCardBody>
            <div className="headingcarousel">
              <img className="d-block w-100 img-fluid rounded" src={prop.image} alt="Carousel 1"/>
              <h1 className="carouseltxt">{prop.text}</h1>
            </div>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-end">

            {/* <Link to ={`/editcarousel/${prop.id}`}><CButton size="sm" variant="outline" color="success" className="mr-1"><CIcon name="cil-pencil"/>  Edit</CButton></Link> */}
            <CButton size="sm" variant="outline" color="danger" className="ml-1" onClick={deleteHandel} value={prop.id} ><CIcon name="cil-trash"  /> Delete</CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    )
  }

  export default ItemsCard;

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

    // var deleteHandel=(e)=>{
    //   dispatch(delReq(e.target.value));
    // }

    return (
      <CCol className="" xs="12" sm="12" md="6" xl="6">
        <CCard>
          <CCardHeader>
            <h5>{prop.name}</h5>
          </CCardHeader>
          <CCardBody>
            <div className="headimage">
              <img className="d-block w-100 img-fluid rounded" src={prop.image} alt={`Img for ${prop.name}`}/>

            </div>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-end">

            <Link to ={`/editcategory/${prop.slug}`}><CButton size="sm" variant="outline" color="success" className="mr-1"><CIcon name="cil-pencil"/>  Edit</CButton></Link>
            {/* <CButton size="sm" variant="outline" color="danger" className="ml-1" onClick={deleteHandel} value={prop.id} ><CIcon name="cil-trash"  /> Delete</CButton> */}
          </CCardFooter>
        </CCard>
      </CCol>
    )
  }

  export default ItemsCard;

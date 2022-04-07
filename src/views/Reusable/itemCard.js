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
    var deleteHandel=(e)=>{
      dispatch(delReq(e.target.value));
    }

    return (
      <CCol className="" xs="12" sm="12" md="4" xl="4">
        <CCard>
          <CCardHeader>
            <h5>{prop.name}</h5>
          </CCardHeader>
          <CCardBody>
            <div className="Img_car">
              {/* <CCarousel>
                <CCarouselInner>
                  <CCarouselItem>
                <img className="d-block img-fluid rounded w-100 carousel-img-size" src="./item/me.jpg" alt="slide 1"/>
                  </CCarouselItem>
                  <CCarouselItem>
                <img className="d-block img-fluid rounded w-100 carousel-img-size " src={prop.img[1]} alt="slide 2"/>
                  </CCarouselItem>
                  <CCarouselItem>
                <img className="d-block img-fluid rounded w-100 carousel-img-size" src={prop.img[2]} alt="slide 3"/>
                  </CCarouselItem>
                </CCarouselInner>
                <CCarouselControl direction="prev"/>
                <CCarouselControl direction="next"/>
              </CCarousel> */}
              {/*eslint-disable-next-line*/}
              <img src={prop.image} className="card-img-top img-fluid rounded " />
            </div>
            <div className="mt-3 row">
              <p className="col"><b>Category</b> : {prop.category.name}</p>
              <p className="col"><b>Sub category</b> : {(prop.subcategory && prop.subcategory.name) || "Not set"}</p>
            </div>
            <div className="row">
              <p className="col"><b>Price</b> : {prop.price} INR</p>
              <p className="col"><b>Discount</b> : {prop.discount_percentage || 0} %</p>
            </div>
            <p><i>{prop.description || "No description available"}</i></p>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-end">

            <Link to ={`/edititem/${prop.slug}`}><CButton size="sm" variant="outline" color="success" className="mr-1"><CIcon name="cil-pencil"/>  Edit</CButton></Link>
            <CButton size="sm" variant="outline" color="danger" className="ml-1" onClick={deleteHandel} value={prop.slug} ><CIcon name="cil-trash"  /> Delete</CButton>
          </CCardFooter>
        </CCard>
        </CCol>
    )
  }

  export default ItemsCard;

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CCardFooter,
  CTooltip
} from '@coreui/react';

  import CIcon from '@coreui/icons-react';
  import { Link } from "react-router-dom";

  import { useSelector, useDispatch } from 'react-redux'

// middle ware
  import {remove_category} from "../../Redux/MiddleWare/Category/action";
  import {delReq} from "../../Redux/Actions/Delete/action";


  var CardProp =({prop})=>{
    var dispatch=useDispatch();
    var state = useSelector((state)=>state.toDelete);

    var deleteHandel=(e)=>{
      dispatch(delReq(e.target.value));
    }


    return (<>
      <CCol className="" xs="12" sm="12" md="3" xl="3">
        <CCard>
          <CCardHeader>
            <h5>{prop.name}</h5>
          </CCardHeader>
          <CCardBody>
            <div className="row">
              <div className="col">
                <span><b>Sub Categories: </b></span>
                {prop.sub_categories.length > 0 ? (prop.sub_categories.map((each)=>{
                  return <span key={each.id} className="p-1">{each.name}  </span>
                })) : <span>No Sub categories</span>}
              </div>
            </div>
            <p className="mt-3 mb-0"><i>{prop.description ? prop.description.substr(0,120) : `Description not set` }</i></p>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-end">
            <Link to={`/editcategory/${prop.slug}`}><CButton size="sm" variant="outline" color="success" className="mr-1"><CIcon name="cil-pencil"/>  Edit</CButton></Link>
            <CButton size="sm" variant="outline" color="danger" className="ml-1" onClick={deleteHandel} value={prop.id}><CIcon name="cil-trash" /> Delete</CButton>

          </CCardFooter>
        </CCard>
        </CCol>
        </>
    )
  }

  export default CardProp;

import React, {useEffect, useState} from 'react';

//translation
import { useTranslation } from 'react-i18next';

// Master Hooks
import { useAppDispatch, useAppSelector } from '../../Services/MasterStore/MasterHook';

import { useNavigate, useParams } from 'react-router-dom';

// Slices
import {  SelectUserProducts, SelectProductUsingUserIdAndPRoductId } from "../../Services/MasterStore/Reducers/UserProductSlice";

// Slices
import {  SelectGlobalProduct, Selectproducts} from '../../Services/MasterStore/Reducers/ProductSlice';
import { UserSignToProduct } from '../../Services/MasterStore/Reducers/UserSlice';

import ProjectImag from '../../Assets/Projects/download.jpg';

import jwtDecode from "jwt-decode";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import './ProductDetailsSub.css';

const ProductDetailsSub = () => {
const { id } = useParams();
const dispatch = useAppDispatch();
const { UserProducts } = useAppSelector(SelectUserProducts);
const { t } = useTranslation();
const { product } = useAppSelector(Selectproducts);
const Navigate = useNavigate();
const [Token] = useState(localStorage.getItem('token'));
const OpenApp = (Url:string) =>{
    window.open(Url, "_blank", "noreferrer");
}
useEffect(() => {
    dispatch(SelectGlobalProduct(Number(id)))
}, [dispatch, id]);

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);

interface UserSignToProductInterface {
  NAME_ONE: string;
  NAME_TWO: string;
  PASSWORD: string;
  MOBILE: number;
  EMAIL: string;
  IS_ACTIVE_Y_N: string;
  VALID_FROM: any;
  VALID_TO: any;
}

const [formData, setFormData] = useState({
  NAME_ONE: "",
  NAME_TWO: "",
  EMAIL: "",
  PASSWORD: "",
  MOBILE: 1,
  IS_ACTIVE_Y_N: "Y",
});

const handleSubmit = () => {
  const Data: UserSignToProductInterface = {NAME_ONE:formData.NAME_ONE, PASSWORD:formData.PASSWORD,  NAME_TWO: formData.NAME_TWO, MOBILE: formData.MOBILE, IS_ACTIVE_Y_N: formData.IS_ACTIVE_Y_N, 
    EMAIL: formData.EMAIL, VALID_FROM: null, VALID_TO: null}
  const URL = UserProducts && UserProducts[0]?.PROJECT_URL_API;
  const ProductId= UserProducts && UserProducts[0]?.PRODUCT_ID;
  dispatch(UserSignToProduct({ Data, URL, Navigate, ProductId })).then(response => {
    setShow(false);
    window.open(UserProducts[0]?.PRODUCT_URL, "_blank", "noreferrer");
  });
};

useEffect(() => {
    const decodedToken = Token && jwtDecode<any>(Token);
    const payload = {
        UserId: decodedToken?.UserId ,
        ProductId: id 
    }
    payload && dispatch(SelectProductUsingUserIdAndPRoductId(payload))
}, [dispatch, id, Token]);
 
const handleInputChange = (event: any) => {
    const { name, value, type } = event.target;
    const newValue = type === 'checkbox' ? 'Y' : value;
    
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: newValue
    }));
  };

  return (
    <React.Fragment>
        <div className="main-content side-content pt-0">
            <div className="main-container container-fluid">
                <div className="inner-body">
                    <div className="row row-sm">
                        <div className="col-lg-12 col-md-12">
                            <div className="card custom-card productdesc">
                                <div className="card-body h-100">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-12 col-md-12">
                                            <div className="row">
                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header>
                                                    <Modal.Title>{t('subscripe')}</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form>
                                                    <Form.Group className="mb-3" controlId="NAME_ONE">
                                                        <Form.Label>Name One</Form.Label>
                                                        <Form.Control  onChange={handleInputChange} name='NAME_ONE' type="input" autoFocus/>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="NAME_TWO">
                                                        <Form.Label>Name Two</Form.Label>
                                                        <Form.Control onChange={handleInputChange} name='NAME_TWO' type="input" autoFocus/>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="EMAIL">
                                                        <Form.Label>Email address</Form.Label>
                                                        <Form.Control onChange={handleInputChange} name='EMAIL' type="email" placeholder="name@example.com" autoFocus/>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="PASSWORD">
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control onChange={(e) => handleInputChange(e)} name='PASSWORD' type="password" autoFocus/>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="MOBILE">
                                                        <Form.Label>Mobile</Form.Label>
                                                        <Form.Control onChange={(e) => handleInputChange(e)} name='MOBILE' type="number" autoFocus/>
                                                    </Form.Group>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                    </Button>
                                                    <Button variant="primary" onClick={handleSubmit}>
                                                    Save Changes
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                                {/* <div className="col-2">
                                                    <div className="clearfix carousel-slider">
                                                        <div id="thumbcarousel" className="carousel slide" data-bs-interval="false">
                                                            <div className="carousel-inner">
                                                                <div className="carousel-item active">
                                                                    <div data-bs-target="#carousel" data-bs-slide-to="0" className="thumb my-2"><img src={ProjectImag} alt="img"/></div>
                                                                    <div data-bs-target="#carousel" data-bs-slide-to="1" className="thumb my-2"><img src={ProjectImag} alt="img"/></div>
                                                                    <div data-bs-target="#carousel" data-bs-slide-to="2" className="thumb my-2"><img src={ProjectImag} alt="img"/></div>
                                                                    <div data-bs-target="#carousel" data-bs-slide-to="3" className="thumb my-2"><img src={ProjectImag} alt="img"/></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                <div className="col-md-12 offset-md-1 col-sm-12 col-12">
                                                    <div className="product-carousel">
                                                        <div id="carousel" className="carousel slide" data-bs-ride="false">
                                                            <div className="carousel-inner">
                                                                <div className="carousel-item active"><img src={UserProducts[0]?.length && UserProducts[0]?.IMAGE_URL ? UserProducts[0]?.IMAGE_URL : ProjectImag} alt="img" className="img-fluid mx-auto d-block"/></div>
                                                                <div className="carousel-item"> <img src={UserProducts[0]?.length && UserProducts[0]?.IMAGE_URL ? UserProducts[0]?.IMAGE_URL : ProjectImag} alt="img" className="img-fluid mx-auto d-block"/></div>
                                                                <div className="carousel-item"> <img src={UserProducts[0]?.length && UserProducts[0]?.IMAGE_URL ? UserProducts[0]?.IMAGE_URL : ProjectImag} alt="img" className="img-fluid mx-auto d-block"/></div>
                                                                <div className="carousel-item"> <img src={UserProducts[0]?.length && UserProducts[0]?.IMAGE_URL ? UserProducts[0]?.IMAGE_URL : ProjectImag} alt="img" className="img-fluid mx-auto d-block"/></div>
                                                            </div>
                                                            
                                                        </div>                                                        
                                                    </div>
                                                </div>
                                                <div className="text-center mt-4 mb-4 btn-list">
                                                    {
                                                        <button type='button' onClick={() => OpenApp(UserProducts[0]?.PRODUCT_URL)} className="conferm">{t('start_app')}</button>                                                     
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-12 col-md-12">
                                            <div className="mt-4 mb-4">
                                                {/* <h4 className="mt-1 mb-3">{product?.PRODUCT?.length && product?.PRODUCT[0].NAME_ONE}</h4> */}
                                                <p className="text-muted float-start me-3">
                                                    <span className="fe fe-star text-warning"></span>
                                                    <span className="fe fe-star text-warning"></span>
                                                    <span className="fe fe-star text-warning"></span>
                                                    <span className="fe fe-star text-warning"></span>
                                                    <span className="fe fe-star"></span>
                                                </p>
                                                {/* <p className="text-muted mb-4">( 135 Customers Review )</p>
                                                <h6 className="text-success text-uppercase">20 % Off</h6>
                                                <h5 className="mb-2">Price : <span className="text-muted me-2"><del>$499 USD</del></span> <b>$299 USD</b></h5>
                                                <p className="tx-13 text-muted">FREE SHIPPING on above Purchase of <b>$359</b> </p> */}
                                                <h3 className="mt-4 fs-16">Description</h3>
                                                {/* <p>{product?.PRODUCT?.length && product?.PRODUCT[0].DETAIL_ONE}</p> */}
                                                <p>
                                                    {UserProducts[0]?.DETAIL_ONE}
                                                </p>
                                            </div>                                                                                        
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h5 className="mb-3">Specifications :</h5>
                                        <div className="">
                                            <div className="row">
                                                <div className="col-xl-12">
                                                    <div className="table-responsive">
                                                        <table className="table {UserProducts[0]mb-0 border-top table-bordered text-nowrap">
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row">Category</th>
                                                                    <td>{UserProducts[0]?.NAME_ONE}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">DESC_ONE</th>
                                                                    <td>{UserProducts[0]?.DESC_ONE}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">VALID_FROM</th>
                                                                    <td>{UserProducts[0]?.VALID_FROM}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">VALID_TO</th>
                                                                    <td>{UserProducts[0]?.VALID_TO}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">PAID_AMOUNT</th>
                                                                    <td>{UserProducts[0]?.PAID_AMOUNT}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">OFFERS </th>
                                                                    <td>{UserProducts[0]?.OFFERS}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">MAIN_BENEFIT</th>
                                                                    <td>{UserProducts[0]?.MAIN_BENEFIT}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">UserName </th>
                                                                    <td>{product?.USER_PRODUCT && product?.USER_PRODUCT[0]?.USER_NAME}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Password</th>
                                                                    <td>{ product?.USER_PRODUCT && product?.USER_PRODUCT[0]?.PASSWORD}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default ProductDetailsSub
import React, {useState} from 'react'

//translation
import { useTranslation } from 'react-i18next';

import Modal from 'react-bootstrap/Modal';

//css
import "./AccountBank.css"
const AccountBank = () => {
    const { t } = useTranslation();
    const [FreeShow, setFreeShow] = useState(false);
    const [FileData, setFileData] = useState<any>([]);
    const [fileDataURL, setFileDataURL] = useState<any>(null);

    const handleFreeClose = () => setFreeShow(false);

    const GetUploadData = (e: any, Type: any) => {
        let text = e.target.files[0].type;
        const ImageType = text.split("/");
        
        if((ImageType && ImageType[1] === 'png') || (ImageType && ImageType[1] === 'jpg') || (ImageType && ImageType[1] === 'jpeg')){
            if(FileData.filter((Item: any, Index2: any) => (Item.Name === Type)).length === 0){
                setFileData([...FileData, {Data: e.target.files, Name: Type}]);
            }
        }
    }

    const RemoveFile = (Index: any, type: any) => {
        const test = document.getElementById(type);
        if(test){
            (test as HTMLInputElement).value = "" ;
        }
        setFileData((Prev: any) => (Prev.filter((FileData: any, Index2: any) => Index2 !== Index)));
    }

    const ShowImage = (type: any) => {
        var reader = new FileReader();
        if (FileData) {
            reader.onload = (e) => {
                const result = e.target;
                if (result) {
                    setFileDataURL(result)
                }
            }
            FileData && FileData?.map((Item: any, Index: any) => (
                FileData[Index].Name === type &&
                reader.readAsDataURL(Item?.Data[0])
            ));
            setFreeShow(true);
            setFileDataURL(null);
        }
    }

    return (
        <React.Fragment>
            <div className='containerAcount_main' id='container_main'>
                <Modal aria-labelledby="contained-modal-title-vcenter"
                centered show={FreeShow} onHide={handleFreeClose} className='col-md-6'>
                <Modal.Header>
                    <i className="bi bi-x-circle" onClick={handleFreeClose}></i>
                </Modal.Header>
                <Modal.Body>
                        <div className='ShowImage'><img src={fileDataURL && fileDataURL.result} alt='#'/></div>
                </Modal.Body>
                </Modal>
                <div className='containerAcount_body'>
                    {/* <div className='Header_Content'>
                        <h1>{t("حساب بنكي")}</h1>
                        <p>{t('application coupons appear')}</p>
                    </div> */}
                    <div className='Card_Parent'>
                        <div className='rightSideParent'>
                            <div className='ChooseAccount'>
                                <h3>{t("الاسم للكوبون")}</h3>
                                <h4>{t("اختر نوع الحساب")}</h4>
                                <select className="form-select resultfilter" aria-label="Default select example">
                                <option value="0">{t('All applications')}</option>
                                <option value="1">{t('Most Subscription')}</option>
                                <option value="2">{t('the most recent')}</option>
                                <option value="3">{t('Highest rating')}</option>
                                <option value="4">{t('Free')}</option>
                                </select>
                            </div>
                            <div className='Form_Content'>
                                <div className='Header_Form'>                        
                                    <h3>{t('بيانات البنك')}</h3>
                                    <h4>{t('تعليمات وارشادات مهمة')}</h4>
                                    <ul>
                                        <li>يجب أن تكون الوثائق واضحة بدون اقتصاص</li>
                                        <li>يجب أن تكون جميع الوثائق سارية المفعول</li>
                                        <li>تأكد من صحة ودقة البيانات المدخلة لضمان قبولها وعدم رفضها</li>
                                        <li>يجب أن يكون الحساب البنكي مطابق للاسم الموجود في شهادة الآيبان</li>
                                    </ul>
                                </div>
                                <hr/>
                                <div className='Form_Details'>
                                    <div>
                                        <h4>{t('EMAIL Own Account')}</h4>
                                        <input name='default'/>
                                    </div>
                                    <div>
                                        <h4>{t('MOBILE')}</h4>
                                        <input name='default'/>
                                    </div>
                                    <div>
                                        <h4>{t('BANK')}</h4>
                                        <input name='default'/>
                                    </div>
                                    <div>
                                        <h4>{t('Account Holders Name')}</h4>
                                        <input name='default'/>
                                    </div>
                                    <div>
                                        <h4>{t('Account Number')}</h4>
                                        <input name='default'/>
                                    </div>
                                    <div>
                                        <h4>{t('IBAN')}</h4>
                                        <input name='default'/>
                                    </div>
                                </div>
                                <hr/>
                                <div className='Footer_Form'>
                                    <div className='Footer_Form_Details'>
                                        <h3>{t('National Identity')}</h3>
                                        <h5>{t('Image_Type')}</h5>
                                        <div className='Upload_Container'>
                                            <div className='Upload'>
                                                <i className="bi bi-cloud-upload"></i>
                                                <input type='file' onChange={(e) => {GetUploadData(e, 'National_Identity')}} id = "National_Identity"/>
                                                <p>{t('Choose File')}</p>
                                            </div>
                                            {FileData.length !== 0 && 
                                            FileData.map((Item: any, Index: any) => (
                                                Item.Name === 'National_Identity' && <div className='Show_Upload' key={Index}>
                                                <i className="bi bi-link-45deg"></i>
                                                <p>{Item.Data[0].name}</p>
                                                <span>({(Item.Data[0].size/(1000*1000)) + 'MB'})</span>
                                                <div className='settings'>
                                                    <div className='shape' onClick={() => {ShowImage(Item.Name)}}>
                                                        <i className="bi bi-eye"></i>
                                                    </div>
                                                    <div className='shape' onClick={() => {RemoveFile(Index, Item.Name)}}>
                                                        <i className="bi bi-trash3"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='Footer_Form'>
                                    <div className='Footer_Form_Details'>
                                        <h3>{t('Freelance document')}</h3>
                                        <h5>{t('Image_Type')}</h5>
                                        <div className='Upload_Container'>
                                            <div className='Upload'>
                                                <i className="bi bi-cloud-upload"></i>
                                                <input type='file' onChange={(e) => {GetUploadData(e, 'Freelance_document')}} id = "Freelance_document"/>
                                                <p>{t('Choose File')}</p>
                                            </div>
                                            {FileData.length !== 0 && FileData.map((Item: any, Index: any) => (
                                           Item.Name === 'Freelance_document' && <div className='Show_Upload' key={Index}>
                                                <i className="bi bi-link-45deg"></i>
                                                <p>{Item.Data[0].name}</p>
                                                <span>({(Item.Data[0].size/(1000*1000)) + 'MB'})</span>
                                                <div className='settings'>
                                                    <div className='shape' onClick={() => {ShowImage(Item.Name)}}>
                                                        <i className="bi bi-eye"></i>
                                                    </div>
                                                    <div className='shape' onClick={() => {RemoveFile(Index, Item.Name)}}>
                                                        <i className="bi bi-trash3"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='Footer_Form'>
                                    <div className='Footer_Form_Details'>
                                        <h3>{t('IBAN certificate')}</h3>
                                        <h5>{t('Image_Type')}</h5>
                                        <div className='Upload_Container'>
                                            <div className='Upload'>
                                                <i className="bi bi-cloud-upload"></i>
                                                <input type='file' onChange={(e) => {GetUploadData(e, 'IBAN_Certificate')}} id='IBAN_Certificate'/>
                                                <p>{t('Choose File')}</p>
                                            </div>
                                            {FileData.length !== 0 && FileData.map((Item: any, Index: any) => (
                                            Item.Name === 'IBAN_Certificate' && <div className='Show_Upload' key={Index}>
                                                <i className="bi bi-link-45deg"></i>
                                                <p>{t('أسم الملف المرفوع')}</p>
                                                <span>(3MB)</span>
                                                <div className='settings'>
                                                    <div className='shape' onClick={() => {ShowImage(Item.Name)}}>
                                                        <i className="bi bi-eye"></i>
                                                    </div>
                                                    <div className='shape' onClick={() => {RemoveFile(Index, Item.Name)}}>
                                                        <i className="bi bi-trash3"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='Actions'>
                                <button className='fast_currencies'>{t('Save')}</button>
                                <button className='fast_currencies'>{t('Back')}</button>
                            </div>
                        </div>
                        <div className='LeftSideParent'>
                            <div className='ChooseAccount'>                                
                                <h3>{t("بيانات أخري")}</h3>
                                <h4>{t("الاسم التوضيحي")}</h4>
                                <input name='default'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
       
    )
}

export default AccountBank;
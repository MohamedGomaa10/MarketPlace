import React, {useEffect, useState} from 'react'

// Static Data
import StaticCards from '../../Services/StaticData/ActiveRequest.json';

//translation
import { useTranslation } from 'react-i18next';

//css
import './MarketingHome.css'
const MarketingHome = () => {
    const { t } = useTranslation();
    const [StaticData, setStaticData] = useState<any>([]);

    useEffect(() => {
        setStaticData(StaticCards)
    }, [])
    return (
        <React.Fragment>
            <div className='container_main' id='container_main'>
                <div className='container_body'>
                    {!!StaticData.length && StaticData.map((Data: any, Index: any) => (
                        <div className='Content_Body' key={Index}>
                            <h1>{t(Data?.name)}</h1>
                            <div className='cards'>
                                {Data?.card_Body.map((Data: any, Index: any) => (
                                    <div className='cardDetails' key={Index}>
                                        <div>
                                            <h3>{t(Data?.name)}</h3>
                                            <h6 style={{color: Data?.color}}>{Data?.number}</h6>
                                        </div>
                                        <i className={Data?.icon}></i>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}

export default MarketingHome;
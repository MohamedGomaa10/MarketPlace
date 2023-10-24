import React, {useState, useEffect} from 'react'


// Static Data
import StaticMenu from '../../Services/StaticData/SideMenuData.json';

import { NavLink } from "react-router-dom";

//translation
import { useTranslation } from 'react-i18next';

//css
import "./MarketingSideMenu.css"
const MarketingSideMenu = () => {
    const { t } = useTranslation();
    const [StaticData, setStaticData] = useState<any>([]);

    useEffect(() => {
        setStaticData(StaticMenu)
    }, [])

    const ChangeMenu = (e: any, Data: any) => {
        const tabs = document.querySelectorAll('.content_body');
        const ShowMenu = document.getElementById('ChangeMenu');
        if(ShowMenu){
            ShowMenu?.classList.remove('ShowMenu');
        }
        tabs.forEach(tab => {
          if(Number(tab.id) === Data.id){
            tab.classList.add('activeHeader');
          }else{
            tab.classList.remove('activeHeader');
          }
        });
    }

    const CloseMenu = () => {
      const ShowMenu = document.getElementById('ChangeMenu');
      if(ShowMenu){
          ShowMenu?.classList.remove('ShowMenu');
      }
    }
    
    return (
        <React.Fragment>
            <div className='SideMenu' id='ChangeMenu'>
                <div className='content'>
                    <i className="bi bi-x-circle" onClick={CloseMenu}></i>
                    {!!StaticData.length && StaticData.map((Data: any, Index: any) => (
                        <NavLink to={Data?.URL} key={Index}>
                            <div className={`content_body ${Data?.id === 1 ? `activeHeader` : ''}`} id={Data?.id} onClick={(e: any) => { ChangeMenu(e, Data) }}>
                                <i className={Data?.icon}></i>
                                <h1>{t(Data?.Name)}</h1>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </React.Fragment>

    )
}

export default MarketingSideMenu;
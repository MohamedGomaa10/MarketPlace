import React, { useState } from 'react'

//icons
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md';

import arrow from '../../Assets/arrow.svg'

//css
import './Faq.css'
import { useTranslation } from 'react-i18next';
const  Faq = ( data:any) => {
    const { t } = useTranslation();
    const [showInfo, setShowInfo] = useState(false);
    const [Index, setIndex] = useState(0);
    const [questions] = useState(data);

    const ShowInfo = (e: any) => {
        setIndex(e);
        setShowInfo(false);
        setShowInfo(true);
    };
    return (
        <section className='faq'>
            <h2>{t(`fQuestions`)}</h2>
            {questions && questions.data.map((question: any) => {
                return (
                    <article key={question.id}>
                        <header onClick={() => ShowInfo(question.id)}>
                            <h4 className={`${showInfo && question.id === Index ? 'bold' : 'normal'}`}>{question.title}</h4>
                            <button className='btn'>
                                {showInfo && question.id === Index ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                            </button>
                        </header>
                        {showInfo && question.id === Index && <p>{question.info}</p>}
                    </article>
                );
            })}
            <div className="actions">
                <ul>
                    <li className='question'>
                        {t(`haveQuestion`)}
                    </li>
                    <li className='action'>
                        {t(`viewGuide`)}
                        <img src={arrow} alt="" />
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Faq
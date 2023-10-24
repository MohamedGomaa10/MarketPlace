import React, { useEffect, useState } from 'react'

//images
import slider from '../../Assets/slider_img.png'

//icons
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi';

//css
import './About.css'
import { useTranslation } from 'react-i18next';

const data = [
{
  content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem animi nihil dolor rerum illo vero nam aperiam sunt minus quam, ullam maiores.",
    clientName: "Yonis Attiya",
      clientJop: "Creative Director"
},
{
  content: "lorem",
    clientName: "Ali",
      clientJop: "Front End"
}
]
const About = () => {
  const { t } = useTranslation()
  const [Index, setIndex] = useState(0)
  const [SliderInfo, setSliderInfo] = useState(data[Index])

  const handleNext = () => {
    if (Index < data.length - 1) setIndex((prev) => prev + 1)
  }

  const handlePrev = () => {
    if (Index !== 0) setIndex((prev) => prev - 1)
  }

  useEffect(() => {
    setSliderInfo(data[Index])
  }, [Index])

  return (
    <section className='about'>
      <h2>{t(`aboutHead`)} <br /> {t(`aboutHead2`)}</h2>
      <div className="slider_container">
        <div className="slider_image">
          <div className="image_container">
            <img src={slider} alt="clientImage" />
          </div>
        </div>
        <div className="slider_content">
          <p>{t(SliderInfo.content)}</p>
          <div className="client_info">
            <h3>{t(SliderInfo.clientName)}</h3>
            <p>{t(SliderInfo.clientJop)}</p>
          </div>
          <div className="slider_actions">
            <ul>
              <li className={`${Index === 0 && 'disabled'}`} onClick={() => handlePrev()}><TfiArrowCircleLeft /> </li>
              <li className={`${Index >= data.length - 1 && 'disabled'}`} onClick={() => handleNext()}><TfiArrowCircleRight /></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
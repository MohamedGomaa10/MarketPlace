import React from 'react'

//css
import './Header.css'

const Header = (title:any, description:any ) => {
    return (
        <section className='page_header'>
            <h1>{title}</h1>
            <p>{description}</p>
        </section>
    )
}

export default Header
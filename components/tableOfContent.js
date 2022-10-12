import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import styles from '../styles/blog.module.css';
import { IoListOutline } from "react-icons/io5";
import { Button } from 'rsuite';
// Restrict value to be between the range [0, value]
const clamp = (value) => Math.max(0, value);

// Check if number is between two values
const isBetween = (value, floor, ceil) =>
  value >= floor && value <= ceil;
  
const useScrollspy = (ids, offset) => {
  const [activeId, setActiveId] = useState("");
  
  useLayoutEffect(() => {
    const listener = () => {
      const scroll = window.pageYOffset;

      const position = ids
        .map((id, index) => {
          const element = document.getElementById(id);
          
          if (!element) return { id, top: -1, bottom: -1 };
          
          const rect = element.getBoundingClientRect();
          const top = clamp(rect.top + scroll - offset);
          let bottom = clamp(rect.bottom + scroll - offset);

          if(index < Object.keys(ids)){
            const nextElement = document.getElementById(ids[index]);
            console.log(index + 1);
          }

          return { id, top, bottom };
        })
        .find(({ top, bottom }) => isBetween(scroll, top, bottom));

      setActiveId(position?.id || "");
    };


    listener();

    window.addEventListener("resize", listener);
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("resize", listener);
      window.removeEventListener("scroll", listener);
    };
  }, [ids, offset]);
 
  return activeId;
};

function useHeadings (){
  const elements = Array.from(document.getElementById('single-content').querySelectorAll("h2, h3, h4, h5, h6"))
  .map((element, index) => {
    element.setAttribute('id', 'title-' + index);
    return ({
      id: 'title-' + index,
      text: element.textContent ?? "",
      level: Number(element.tagName.substring(1))
    })
  });
  return elements;
}

const TableOfContent = () => {

    const [activeId, setActiveId] = useState();
    const [headings, setHeadings] = useState([]);
    const [activedNav, setActivedNav] = useState(false);
  

    const active = useScrollspy(
      headings.map(({id}) => id), 50
    );

    useEffect(() => {
      const listHeading = useHeadings();
      setHeadings(listHeading);
    },[]);

    useEffect(() => {
      if( active != ""){
        setActiveId(active)
      }
    },[active])

    if(headings.length > 0) {


      return (
        <nav className={ activedNav ? styles.x_toc_nav + ' ' + styles.x_toc_nav_actived : styles.x_toc_nav}>
            <Button 
            className={styles.x_toc_nav_button} 
            color='primary'
            onClick={() => { setActivedNav(!activedNav) }}
            >
              <IoListOutline color='black' size={'18px'}/>
            </Button>
            <h3 className={styles.x_table_of_content_title}>Nội dung chính</h3>
            <div className={styles.x_table_content_section}>
              <div className={styles.x_table_content_wrapper}>
                <ul  className={styles.x_table_of_content_list}>
                  {headings.map((heading, index) => {
                    return(
                      <li className={activeId === heading.id ? styles.x_table_of_content_list_item_actived + ' ' + styles.x_table_of_content_list_item : styles.x_table_of_content_list_item} key={index} style={{ marginLeft: `${heading.level - 1}em` }}>
                          <a  
                            id={'text-to-' + index}
                            href={`#title-${index}`}
                          >
                          {heading.text}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </nav>
        );
    } else {
      return ""
    }
   
}

export default TableOfContent
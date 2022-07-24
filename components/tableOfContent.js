import React, { useState, useEffect, useRef } from 'react'

export function useScrollSpy( ids, options ) {
  const [activeId, setActiveId] = useState();
  const observer = useRef();
  useEffect(() => {
    const elements = ids.map((id) =>
      document.getElementById(id)
    );
    observer.current?.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);
    elements.forEach((el) => {
      if (el) {
        observer.current?.observe(el);
      }
    });
    return () => observer.current?.disconnect();
  }, [ids, options]);
  return activeId;
}

const useHeadings = () => {
  const [headings, setHeadings] = useState([]);
  useEffect(() => {
    console.log(document.getElementById('single-content').querySelectorAll("h2, h3"));
    const elements = Array.from(document.getElementById('single-content').querySelectorAll("h2, h3, h4, h5, h6"))
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        text: element.textContent ?? "",
        level: Number(element.tagName.substring(1))
      }));
      if(elements.length > 0){
        setHeadings(elements);
      }
  }, []);
  return headings;
}

const TableOfContent = () => {
    const listHeading = useHeadings();
    const [headings, setHeadings] = useState(listHeading);

    console.log(headings);
    const activeId = useScrollSpy(
      headings.map(({ id }) => id),
      { rootMargin: "0% 0% -25% 0%" }
    );
    
    return (
      <nav className="xxxxxxxxxxxxxxxxxx" style={{ position: 'fixed', top: '1em', right: '1em' }}>
          <ul>
            {headings.map(heading => {
              console.log(heading)
              return(
                <li key={heading.id} style={{ marginLeft: `${heading.level}em` }}>
                  <a 
                    href={`#${heading.id}`} 
                    style={{ 
                      fontWeight: activeId === heading.id ? "bold" : "normal" 
                    }}
                  >
                    {heading}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      );
}

export default TableOfContent
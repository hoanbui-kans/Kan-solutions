import { useState, useEffect  } from 'react'
import { Grid, Container, Row, Col, Button, Divider, Whisper, Tooltip, ButtonToolbar, Modal } from 'rsuite' 
import { IoCheckmarkCircle, IoCaretForwardSharp, IoChevronBackOutline, IoChevronForwardOutline, IoCheckmarkCircleSharp  }  from "react-icons/io5"
import { ServicesWebsiteManager } from '../api/HeaderSeo'
import { MarketingTable, MarketingHead } from '../api/services'
import styles from '../../styles/services/managerwebsite.module.css'
import Image from 'next/image'
import Head from 'next/head'
import HTMLReactParser from 'html-react-parser'
import Link from 'next/link'
 import ServicesSubmitForm from '../../components/handleSubmitServices'

const WebsiteManager = () => {
  const [priceTab, setPriceTab] = useState(1);
  const [width, setWidth] = useState(0);

  const [open, setOpen] = useState(false);  
  const [service, setService] = useState(''); 

  const handleOpen = (service) => {
     setService(service);
     setOpen(true)
  };

  const handleClose = () => setOpen(false);
  const handleResize = () => setWidth(window.innerWidth);

  const handlePrePriceTab = () => {
    if(priceTab >= 0 && priceTab <= 2){
      if(priceTab == 0){
        setPriceTab(0);
      } else {
        let Pre = --priceTab;
        setPriceTab(Pre);
      }
    }
  }

  const handleNextPriceTab = () => {
    
    console.log(priceTab)
    if(priceTab <= 2 && priceTab >= 0){
      if(priceTab == 2){
        setPriceTab(2);
      } else {
        let Next = ++priceTab;
        setPriceTab(Next);
      }
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);
  
  console.log(width);

  return (
    <>
      <Head>
        { HTMLReactParser(ServicesWebsiteManager) }
      </Head>
      <div className={styles.x_webite_manager_main}>
        <div className={styles.x_banner_web_mannager}>
        <Grid className={'x_container'}>
            <Container>
              <Row>
                <Col xs={24} md={12}>
                    <div className={styles.x_website_manager_image}>
                        <Image src={'/marketing.svg'} width={500} height={400}/>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <div className={styles.x_position_relative}>
                        <div className={styles.x_website_manager_banner}>
                          <h3 className={styles.x_website_manager_banner_title}>
                            Dịch vụ quản trị website.
                          </h3>
                          <p className={styles.x_website_manager_banner_description}>
                            bao gồm các mảng công việc chính là bảo trì, vận hành kỹ thuật đảm bảo website luôn hoạt động ổn định và hiệu quả
                          </p>
                          <ul className={styles.x_website_manager_list}>
                            <li>
                              <div className={styles.x_website_manager_list_content}>
                                  <span><IoCheckmarkCircle size={18} color={'#6FCF97'}/></span>
                                  <p>Về cơ bản, quản trị website bao gồm:  Bảo trì kỹ thuật, tối ưu hóa server và code.</p>
                              </div>
                            </li>
                            <li>
                                <div className={styles.x_website_manager_list_content}>
                                  <span><IoCheckmarkCircle size={18} color={'#6FCF97'}/></span>
                                  <p>Cập nhật, phát triển nội dung chuẩn SEO, đảm bảo website luôn có tính cập nhật và thân thiện với Google.</p>
                              </div>
                          </li>
                          <li>
                                <div className={styles.x_website_manager_list_content}>
                                  <span><IoCheckmarkCircle size={18} color={'#6FCF97'}/></span>
                                  <p>Hỗ trợ các hoạt động kết nối social, quảng bá website trên môi trường internet.</p>
                              </div>
                          </li>
                          </ul>
                          <Button className={styles.x_adsButton} onClick={() => {handleOpen('Đăng ký tư vấn dịch vụ quản trị website')}}>
                              Đăng ký tư vấn miễn phí
                          </Button>
                      </div>  
                    </div>
                </Col>
              </Row>  
            </Container>      
        </Grid>
        </div>
        <div className={styles.x_section}>
          <Grid className={'x_container'}>
              <Container>
                <Row>
                    <Col xs={24}>
                        <div className={styles.x_website_manager_why}>
                          <h2 className={styles.x_website_manager_title}>Tại sao cần quản trị webiste?</h2>
                          <p>Bạn cần đội ngũ nhân sự bên ngoài hỗ trợ xây dựng và phát triển website dưới góc nhìn của một chuyên gia kỹ thuật</p>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div className={styles.x_website_manager_image}>
                        <Image src={'/layout/multipe_screen.png'} width={800} height={440}/>
                      </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <ul className={styles.x_website_manager_features_why}>
                          <li>
                            <p>
                              <span><IoCaretForwardSharp size={14}/></span>
                              Hỗ trợ xây dựng trang đích quảng cáo không tính phí mỗi khi có nhu cầu</p>
                          </li>
                          <li>
                            <p>
                              <span><IoCaretForwardSharp size={14}/></span>
                              Google sẽ ghi nhớ và gia tăng thứ hạng với website được cập nhật nội dung</p>
                          </li>
                          <li>
                            <p>
                              <span><IoCaretForwardSharp size={14}/></span>
                              Trang web được cập nhật nội dung mới, tự viết và với cấu trúc chuẩn SEO mang lại hiệu quả cáo</p>
                          </li>
                          <li>
                            <p>
                              <span><IoCaretForwardSharp size={14}/></span>
                              Website được làm tươi mới mỗi ngày về cả nội dung lẫn hình thức, các hình ảnh, banner và thông điệp</p>
                          </li>
                          <li>
                            <p>
                              <span><IoCaretForwardSharp size={14}/></span>
                              Tư vấn và chủ động nội dung website theo hướng tập trung vào từ khóa cần thiết giúp bạn dễ dàng tiếp cận khách hàng</p>
                          </li>
                          <li>
                            <p>
                              <span><IoCaretForwardSharp size={14}/></span>
                              Nâng cao khả năng kết nối của website với môi trường mạng như social, backlink, forum để nâng cao hiệu quả quảng cáo</p>
                          </li>
                        </ul>
                    </Col>
                  </Row>  
              </Container>      
          </Grid>
        </div>
        <Grid className={'x_container'}>
            <Container>
                <Divider />
            </Container>
      </Grid>
        <div className={styles.x_section}>
            <Grid className={'x_container'}>
                <Container>
                  <Row>
                    <Col md={24}>
                      <h3 className={styles.x_website_manager_title + ' ' + styles.x_margin_bottom}>
                        Những vẫn đề bạn thường gặp sau khi đã xây dựng website làm cho website trở nên kém hiệu quả, không được người dùng và khách hàng biết đến thậm chí ảnh hưởng đến thương hiệu
                      </h3>
                    </Col>
                    <Col md={24}>
                      <ul className={styles.x_website_manager_features_list}>
                        <li>
                          <div className={styles.x_website_manager_features}>
                            <div className={styles.x_website_manager_features_icon}>
                              <Image src={'/icons/Time_atack_light.svg'} width={45} height={45}/>
                            </div>
                            <div className={styles.x_website_manager_content}>
                              <h3><IoCaretForwardSharp size={14}/> Bạn không có thờI gian và nhân sự để chăm sóc, viết bàI để nâng thứ hạng website?</h3>  
                              <p>Hãy xem chúng tôi như đội ngũ nhân viên của bạn, chúng tôi sẽ làm việc dưới góc độ chuyên môn kỹ thuật và trao đổi với bạn những vấn đề về ngành nghề kinh doanh của bạn để website mang lại hiệu quả nhất</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className={styles.x_website_manager_features}>
                            <div className={styles.x_website_manager_features_icon}>
                              <Image src={'/icons/Chield_check_fill.svg'} width={45} height={45}/>
                            </div>
                            <div className={styles.x_website_manager_content}>
                              <h3><IoCaretForwardSharp size={14}/> Bạn cảm thấy khó hiểu khi muốn vận hành một website hiệu quả</h3>  
                              <p>Ngoài việc hỗ trợ bạn thời gian đầu trong việc phát triển website, chúng tôi cũng hỗ trợ bạn hoặc nhân viên của bạn những vấn đề cốt lõi để có thể quản trị website tốt nhất trong tương lai một cách chủ động</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className={styles.x_website_manager_features}>
                            <div className={styles.x_website_manager_features_icon}>
                              <Image src={'/icons/Wallet_alt_fill.svg'} width={35} height={35}/>
                            </div>
                            <div className={styles.x_website_manager_content}>
                              <h3><IoCaretForwardSharp size={14}/> Bạn cảm thấy tốn kém rất nhiều tài nguyên và chi phí để quản trị website</h3>  
                              <p>Chúng tôi mang đến cho bạn giải pháp quản trị website lâu dài, phát triển ổn định với một mức chi phí bạn có thể không ngờ đến mà không cần thêm nguồn lực nào khác. Dịch vụ của chúng tôi chỉ có mức phí bằng 50% một nhân viên chuyên trách cho công việc này</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </Container>      
          </Grid>
        </div>
        <Grid className={'x_container'}>
            <Container>
                <Divider />
            </Container>
      </Grid>
        <div className={styles.x_marketing_section}>
          <Grid className={'x_container'}>
            <Container>
                  <Row className='x_flex_center'>
                      <Col xs={24}>
                        <h3 className={styles.x_marketing_title}>Bảng giá dịch vụ</h3>
                      </Col>
                      <Col xs={24} className={styles.x_showing_on_desktop}>
                        <div className={styles.x_web_manager_container}>
                          <div className={styles.x_webite_manager_featured_container}>
                              <div className={styles.x_table_job}>
                              </div>
                                <div className={styles.x_table_column}>
                                  <ul className={styles.x_webite_manager_featured_list}>
                                      {
                                        MarketingHead.map((val, index) => {
                                          let featuredServicesClass = priceTab == index ? styles.x_featured_table_heading : ''
                                          return(
                                              <li key={index} className={featuredServicesClass}>
                                                <div className={styles.x_table_content_heading} onClick={ () => { setPriceTab(index) } }>
                                                  <h4><IoCheckmarkCircleSharp size={14} color={'#00cc88'}/> {val.name}</h4>
                                                  <strong>{val.price}</strong>
                                                  <Button className={styles.x_table_button}
                                                    onClick={() => {handleOpen('Đăng ký dịch vụ marketing gói ' + val.name)}}>
                                                      Đăng ký
                                                  </Button>
                                                </div>
                                              </li>
                                          )
                                        })
                                      }
                                  </ul>
                                </div>
                              </div>
                              <div className={styles.x_table_content_wrapper}>
                                {
                                  MarketingTable.map((val, index) => {
                                    return(
                                      <div className={styles.x_table_content_table} key={index}>
                                        <h5 className={styles.x_table_title}>{val.name}</h5>
                                          <div className={styles.x_table_index}>
                                              {
                                                val.data.map((valChild, indexChild) => {
                                                  return(
                                                  <div className={styles.x_table_row} key={indexChild}>
                                                    <div className={styles.x_table_job}>
                                                      <p><IoCaretForwardSharp size={8}/> {valChild.name}</p>
                                                    </div>
                                                    <div className={styles.x_table_column}>
                                                      <ul className={styles.x_table_list}>
                                                          {
                                                            valChild.data.map((valServices, indexServices) => {
                                                              let ClassIndexServices = indexServices == priceTab ? styles.x_featured_table : '';
                                                              return(
                                                                  <li key={indexServices} className={ ClassIndexServices }>
                                                                    <Whisper
                                                                      trigger="click"
                                                                      placement={'top'}
                                                                      controlId={`control-id-${indexServices}`}
                                                                      speaker={
                                                                        <Tooltip>{valChild.description}</Tooltip>
                                                                      }
                                                                    >
                                                                      <Button appearance="subtle">{valServices}</Button>
                                                                    </Whisper>
                                                                  </li>
                                                              )
                                                            })
                                                          }
                                                      </ul>
                                                    </div>
                                                  </div>
                                                  )
                                                })
                                              }
                                            </div>
                                        </div>
                                      )
                                  })
                                }
                          </div>
                        </div>
                      </Col>
                      
                      <Col xs={24} className={styles.x_showing_on_mobile}>
                          <div className={styles.x_pricing_tab}>
                            <ul className={styles.x_pricing_tab_list}>
                              <li className={styles.x_pricing_navigation}>
                                <ButtonToolbar className={styles.x_pricing_navigation_toolbar}>
                                    <Button onClick={handlePrePriceTab}>
                                      <IoChevronBackOutline size={16}/>
                                    </Button>
                                    <Button onClick={handleNextPriceTab}>
                                      <IoChevronForwardOutline size={16}/>
                                    </Button>
                                </ButtonToolbar>
                              </li>
                                  {
                                    MarketingHead.map((val, index) => {
                                      if(index != priceTab) return '';
                                        return(
                                          <li key={index} className={styles.x_featured_table_heading + ' ' + styles.x_featured_table_heading_mobile}>
                                            <div className={styles.x_table_content_heading}>
                                              <h4><IoCheckmarkCircleSharp size={14} color={'#00cc88'}/> {val.name}</h4>
                                              <strong>{val.price}</strong>
                                              <Button 
                                                type='submit' 
                                                className={styles.x_table_button}
                                                onClick={() => {handleOpen('Đăng ký dịch vụ marketing gói ' + val.name)}}
                                              >
                                                Đăng ký</Button>
                                            </div>
                                          </li>
                                        )
                                    })
                                  }
                              </ul>
                          </div>
                        
                          <div className={styles.x_pricing_tab_content}>
                          {
                            MarketingTable.map((val, index) => {
                              return(
                                <div className={styles.x_table_content_table} key={index}>
                                  <h5 className={styles.x_table_title}>{val.name}</h5>
                                  <div className={styles.x_table_index}>
                                    {
                                      val.data.map((valChild, indexChild) => {
                                        return(
                                        <div className={styles.x_table_row} key={indexChild}>
                                          <div className={styles.x_table_job_mobile}>
                                            <p><IoCaretForwardSharp size={8}/> {valChild.name}</p>
                                          </div>
                                          <div className={styles.x_table_column_mobile}>
                                            <ul className={styles.x_table_list_mobile}>
                                              {
                                                valChild.data.map((valServices, indexServices) => {
                                                  if(indexServices != priceTab) return '';
                                                    return(
                                                        <li key={indexServices} className={styles.x_featured_table_mobile}>
                                                          <Whisper
                                                            trigger="click"
                                                            placement={'top'}
                                                            controlId={`control-id-${indexServices}`}
                                                            speaker={
                                                              <Tooltip>{valChild.description}</Tooltip>
                                                            }
                                                          >
                                                            <Button appearance="subtle">{valServices}</Button>
                                                          </Whisper>
                                                        </li>
                                                    )
                                                })
                                              }
                                              
                                            </ul>
                                          </div>
                                        </div>
                                        )
                                      })
                                    }
                                    </div>
                                  </div>
                                )
                            })
                          }
                        </div>
                      </Col>
                  </Row>  
              </Container>
            </Grid>
        </div>
      </div>
      <Modal open={open} onClose={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>Đăng ký tư vấn dịch vụ quản trị website</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ServicesSubmitForm service={service}/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default WebsiteManager
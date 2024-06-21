import React from 'react'
import "./Report.css"
import report_diagram from "../Images/report_diagram.svg"
import diagram_img from "../Images/diagram.svg"
import archspace  from "../Images/archsapce.svg"
const Report = () => {
  return (
    <section className='report_outer cmn_width'>
        <div className='dashboard_container cmn_container pb-4'>
        <h3 className='cmn_heading_style dashboard_plan_heading'><span className='submit_plan_heading'>Dashboard</span>/Review</h3>
        <div className='row cmn_padding'>
          <div className='col-lg-8 col-sm-12 col-md-6 '>
            <div className='white_bg report_content_outer'>
                <div className='zone_outer'>

                <div className='zone_content_wrapper'>
                <h3 className='report_zone_heading'>Zones</h3>
              <div className='zone_inner_content'>
                <h3 className='italic_font'>Zone</h3>
                <h3 className='italic_font'>High</h3>
              </div>
              <div  className='zone_inner_content'>
                <h3 className='italic_font'>Exposure</h3>
                <h3 className='italic_font'>c</h3>
              </div>
              <div  className='zone_inner_content'>
                <h3 className='italic_font'>EARTHQUAKE</h3>
                <h3 className='italic_font'>F</h3>
              </div>
              <div  className='zone_inner_content'>
                <h3 className='italic_font'>TEMPERATURE</h3>
                <h3 className='italic_font'>10c</h3>
              </div>
                </div>
                
                <div className='plan_note_outer'>
                  <h3 className='report_zone_heading'>PLAN NOTES</h3>
                  <p className='italic_font'>Lorem ipsum dolor sit amet consectetur. 
                    Libero velit egestas pellentesque dolor mi quis augue elementum ac. 
                    Purus . </p>
                </div>

                </div>
                {/* diagram */}
                <div className='report_diagram_wrapper'>
                <img src={report_diagram} alt='report_diagram' className='report_diagram'/>
                <img src={diagram_img} alt='diagram_img' className='diagram_img'/>

                </div>
                 <div className='d-flex ground_floor_outer'>
                  <h3 className='report_zone_heading'>1</h3>
                  <h3 className='report_zone_heading'>GROUND FLOOR PLAN</h3>
                  <h3 className='report_zone_heading'>1:100</h3>
                 </div>
            </div>
                 <img className='mt-3' src={archspace} alt='archspace' width="100%"/>
          </div>

          <div className='col-lg-4 col-sm-12 col-md-6 '>
          <div className='white_bg report_content_outer'>

            <div className='legend_outer'>
            <h3 className='legend_heading pt-4 px-4'>Legend</h3>
            <ul className='legend_list'>
              <li>
                <div className='zone_content_wrapper'>
              <h3 className='legend_heading'>Lorem ipsum dolor sit amet</h3>
              <p>Lorem ipsum dolor sit amet consectetur. 
                Libero velit egestas pellentesque dolor mi .</p>

                </div>
              </li>
              
            <li >
           <div className='zone_content_wrapper'>
              <h3 className='legend_heading text-danger'>Exposure Zone D</h3>
              <p className='text-danger'>Lorem ipsum dolor sit amet consectetur. 
                Libero velit egestas pellentesque dolor  
                Purus vel phasellus volutpat elementum dignissim. 
                </p>

           </div>

            
            </li>

            <li >
              <div className='zone_content_wrapper'>
              <h3 className='legend_heading'>Ventilation</h3>
              <p>Lorem ipsum dolor sit amet consectetur. Libero velit egestas
                 mi quis augue elementum ac.
                  Vel phasellus elit quam in sed vulputate quis sed.</p>
              </div>
            </li>

            <li>
              <div className='zone_content_wrapper'>
              <h3 className='legend_heading'>Kitchen design</h3>
              <p>Lorem ipsum dolor sit amet consectetur. Libero velit 
                egestas pellentesque dolor mi quis augue elementum ac. 
                Purus vel phasellus.
                 </p>
              </div>
            </li>

            <li>
              <div className='zone_content_wrapper'>
              <h3 className='legend_heading'>Lighting</h3>
              <p>Lorem ipsum dolor sit amet consectetur. 
                Libero velit egestas pellentesque dolor mi quis augue elementum ac. 
                Purus vel phasellus volutpat .
                </p>
              </div>
            </li>
            </ul>
            </div>
          </div>
          </div>
        </div>
       <div className='confirm_submit_btn_outer text-end me-3'>
       <button className='cmn_btn confirm_submit_btn'>Confirm Submit</button>
       </div>
        </div>
    </section>
  )
}
export default Report
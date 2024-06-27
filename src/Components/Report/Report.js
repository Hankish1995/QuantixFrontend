import React, { useState, useEffect } from 'react';
import "./Report.css";



import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import Loader from '../CommonComponents/Loader';
import { useLocation } from 'react-router';

const Report = () => {
  const addPlanData = useSelector((store) => store.ADD_PLAN_SLICE);
  console.log(addPlanData,"this is from the report page")
  const [apiResponse, setApiResponse] = useState('');
  console.log(apiResponse,"tthis osi the api response")
  const location = useLocation();
  const { data } = location.state || {};
  const { planName, image } = data || {};
console.log(planName,image,"data from add plan")

const imageUrl = URL.createObjectURL(image[0]);

  useEffect(() => {
    if (addPlanData?.isSuccess) {
      // Regex pattern to match the main content between "Stream started..." and "Stream ended..."
      const contentRegex = /Stream started\.\.\.\n([\s\S]*)\nStream ended\./;

      // Match the main content using the regex pattern
      const match = addPlanData?.data.match(contentRegex);

      if (match) {
        // Extract the main content excluding the start and end markers
        const extractedContent = match[1];

        // Process the extracted content as needed (e.g., format into HTML)
        let processedContent = formatContent(extractedContent); // Implement this function

        setApiResponse(processedContent);
      }
    }
  }, [addPlanData]);

  const formatContent = (content) => {
    // Replace markdown symbols with HTML equivalents
    let htmlContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Convert **text** to <strong>text</strong>
    htmlContent = htmlContent.replace(/\|/g, '</td><td>'); // Convert | to </td><td>

    // Wrap table rows and cells in HTML table structure
    htmlContent = `<table>${htmlContent.split('\n').map(row => `<tr><td>${row}</td></tr>`).join('')}</table>`;

    // Convert **Grand Total**: $6794.55 to <p><strong>Grand Total:</strong> $6794.55</p>
    htmlContent = htmlContent.replace(/\*\*Grand Total\*\*: (.*?)$/m, '<p><strong>Grand Total:</strong> $1</p>');

    return htmlContent;
  };

  return (
    <section className='report_outer cmn_width'>
      <div className='dashboard_container cmn_container pb-4'>
        <h3 className='cmn_heading_style dashboard_plan_heading'><span className='submit_plan_heading'>Dashboard</span>/Review</h3>
        <h4 className='cmn_heading_style ps-4 plan_name_heading'> {planName}</h4>
        <div className='row cmn_padding'>
          <div className='col-lg-6 col-sm-12 col-md-6 '>
            <div className='white_bg report_content_outer'>
              <div className='zone_outer'>
                {/* <div className='zone_content_wrapper'>
                  <h3 className='report_zone_heading'>Zones</h3>
                  <div className='zone_inner_content'>
                    <h3 className='italic_font'>Zone</h3>
                    <h3 className='italic_font'>High</h3>
                  </div>
                  <div className='zone_inner_content'>
                    <h3 className='italic_font'>Exposure</h3>
                    <h3 className='italic_font'>c</h3>
                  </div>
                  <div className='zone_inner_content'>
                    <h3 className='italic_font'>EARTHQUAKE</h3>
                    <h3 className='italic_font'>F</h3>
                  </div>
                  <div className='zone_inner_content'>
                    <h3 className='italic_font'>TEMPERATURE</h3>
                    <h3 className='italic_font'>10c</h3>
                  </div>
                </div>

                <div className='plan_note_outer'>
                  <h3 className='report_zone_heading'>PLAN NOTES</h3>
                  <p className='italic_font'>Lorem ipsum dolor sit amet consectetur. 
                    Libero velit egestas pellentesque dolor mi quis augue elementum ac. 
                    Purus . </p>
                </div> */}

              </div>
              {/* diagram */}
              <div className='report_diagram_wrapper'>
                <img src={imageUrl} alt='report_diagram' className='report_diagram'/>
                
              </div>
              {/* <div className='d-flex ground_floor_outer'>
                <h3 className='report_zone_heading'>1</h3>
                <h3 className='report_zone_heading'>GROUND FLOOR PLAN</h3>
                <h3 className='report_zone_heading'>1:100</h3>
              </div> */}
            </div>
            {/* <img className='mt-3' src={archspace} alt='archspace' width="100%"/> */}
          </div>

          <div className='col-lg-6 col-sm-12 col-md-6 '>
            <div className='white_bg report_content_outer'>
              <div className='legend_outer'>
                <h3 className='legend_heading pt-4 px-4'>Legend</h3>
                <ul className='legend_list'>
                  <li>
                    {addPlanData?.loading? <Loader/>:
                    <div className='zone_content_wrapper report_response_outer'>
                    {/* <div dangerouslySetInnerHTML={{ __html: apiResponse }} /> */}
                    <div dangerouslySetInnerHTML={{ __html: apiResponse }} />
                    </div>
}
                  </li>
                  
                  {/* <li>
                    <div className='zone_content_wrapper'>
                      <h3 className='legend_heading text-danger'>Exposure Zone D</h3>
                      <p className='text-danger'>Lorem ipsum dolor sit amet consectetur. 
                        Libero velit egestas pellentesque dolor  
                        Purus vel phasellus volutpat elementum dignissim. 
                      </p>
                    </div>
                  </li>

                  <li>
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
                  </li> */}
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
  );
}

export default Report;

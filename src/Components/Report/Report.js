import React, { useState, useEffect } from 'react';
import "./Report.css";

import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import Loader from '../CommonComponents/Loader';
import { useLocation } from 'react-router';
import { capitalLiseString } from '../Utils/CommonUtils';

const Report = () => {
  const addPlanData = useSelector((store) => store.ADD_PLAN_SLICE);
  const [apiResponse, setApiResponse] = useState('');
  const location = useLocation();
  const { data } = location.state || {};
  const { planName, image } = data || {};

  const imageUrl = URL.createObjectURL(image[0]);

  useEffect(() => {
    if (addPlanData?.isSuccess) {
      let processedContent;

      // Example pattern to detect a table format
      const tableRegex = /^\|.*\|$/m; // Example: matches lines starting and ending with "|"

      // Function to determine format based on regex patterns
      const determineFormat = (data) => {
        if (tableRegex.test(data)) {
          return 'table'; // Example: data appears to be in a table format
        }
        return 'default'; // Default handling
      };

      // Match based on determined format or default
      let format = determineFormat(addPlanData.data);

      if (format === 'table') {
        processedContent = formatTableContent(addPlanData.data);
      } else {
        processedContent = formatContent(addPlanData.data);
      }

      setApiResponse(processedContent);
    }
  }, [addPlanData]);

  // Function to format table-like content
  const formatTableContent = (content) => {
    // Clean up unwanted characters
    content = content.replace(/["`,./[\]#\\]/g, '');

    // Replace markdown symbols with HTML equivalents
    let htmlContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Convert **text** to <strong>text</strong>

    // Split lines by newline and process each row
    const rows = htmlContent.split('\n');
    htmlContent = '<table>';
    rows.forEach(row => {
      htmlContent += '<tr>';
      const cells = row.split('|').filter(cell => cell.trim() !== '');
      cells.forEach(cell => {
        htmlContent += `<td>${cell.trim()}</td>`;
      });
      htmlContent += '</tr>';
    });
    htmlContent += '</table>';

    return htmlContent;
  };

  const formatContent = (content) => {
    // Clean up unwanted characters
    content = content.replace(/["`,./[\]#\\]/g, '');

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
        <h4 className='cmn_heading_style ps-4 plan_name_heading'> {capitalLiseString(planName)}</h4>
        <div className='row cmn_padding'>
          <div className='col-lg-6 col-sm-12 col-md-6 '>
            <div className='white_bg report_content_outer'>
              <div className='zone_outer'>


              </div>
              {/* diagram */}
              <div className='report_diagram_wrapper'>
                <img src={imageUrl} alt='report_diagram' className='report_diagram' />

              </div>

            </div>

          </div>

          <div className='col-lg-6 col-sm-12 col-md-6 '>
            <div className='white_bg report_content_outer'>
              <div className='legend_outer'>
                <h3 className='legend_heading pt-4 px-4'>Legend</h3>
                <ul className='legend_list'>
                  <li>
                    {addPlanData?.loading ? <Loader /> :
                      <div className='zone_content_wrapper report_response_outer'>
                        {/* <div dangerouslySetInnerHTML={{ __html: apiResponse }} /> */}
                        <div dangerouslySetInnerHTML={{ __html: apiResponse }} />
                      </div>
                    }
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
  );
}

export default Report;

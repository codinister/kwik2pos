import businessprofileEvent from '../state/events/pages/businessprofileEvent.js';
import CompanyDetails from '../utils/CompanyDetails.js';
import { Button, Input } from '../utils/InputFields.js';
const Businessprofile = () => {
  businessprofileEvent();

  return `
  <section class="businessprofile settings-wrapper">

      ${CompanyDetails({
        title: 'Business Profile',
        desc: 'Use the form below to update your business information.',
      })}

      <div class="businessprofbx">

        <div>
          <div class="file-upload-wrapper">
            <p>
            Upload Business Logo (optional - jpeg, jpg, png - Max size: 2mb)
            </p>
            <div>
              <div>
              <img src="" class="logo-img" alt="Logo" />
              </div>
              <div> 
              <label>
              Upload logo
              <input type="file" class="logo-file-upload" />
              </label>
              </div>
          </div>
          </div>
        </div>


        <div>

             ${Input({
               inputName: 'businessname',
               labelName: 'Business Name',
               required: 1,
               min: 1,
               stateName: 'businessprofile',
               stateFields: '',
               value: '',
             })}




             <div>
              <div>
                    ${Input({
                      inputName: 'region',
                      labelName: 'Region',
                      required: 1,
                      min: 1,
                      stateName: 'businessprofile',
                      stateFields: '',
                      value: '',
                    })}

                   ${Input({
                     inputName: 'phone',
                     labelName: 'Phone Number',
                     required: 1,
                     min: 1,
                     stateName: 'businessprofile',
                     stateFields: '',
                     value: '',
                   })}

              </div>
              <div>
                  ${Input({
                    inputName: 'location',
                    labelName: 'Business Location',
                    required: 1,
                    min: 1,
                    stateName: 'businessprofile',
                    stateFields: '',
                    value: '',
                  })}

                  ${Input({
                    inputName: 'email',
                    labelName: 'Email',
                    required: 1,
                    min: 1,
                    stateName: 'businessprofile',
                    stateFields: '',
                    value: '',
                  })}
              </div>
             </div>
            ${Input({
              inputName: 'currency',
              labelName: 'Currency',
              required: 1,
              min: 1,
              stateName: 'businessprofile',
              stateFields: '',
              value: '',
            })}


            ${Button({
              classname: 'save-businessprofile',
              buttonname: 'Save Changes',
            })}

        </div>


      </div>
    </section>
  `;
};

export default Businessprofile;

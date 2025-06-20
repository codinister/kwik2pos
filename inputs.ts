            ${Input({
              inputName: reqfields[0],
              labelName: 'First Name',
              required: true,
              min: 1,
              stateName: 'userprofile',
              stateFields: datalength,
              value: user?.firstname,
            })}


            ${TextArea({
              inputName: 'message',
              placeholder: 'Message',
              stateName: 'userprofile',
            })}


            /* 
            Create an image tag where a preview of the 
            uploaded image will show give the class name of the image tag the same name you 
            give to the file upload name 
            */
            ${FileUpload({
              inputName: 'pimg',
              labelName: 'Avatar',
              stateName: 'userprofile',
            })}


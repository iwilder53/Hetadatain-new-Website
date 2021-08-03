const form = document.getElementById("contact-forms");
var index = 0
const formEvent = form.addEventListener("submit", (event) => {
  $("#contact-forms").validator();
  event.preventDefault();
  if (event.defaultPrevented) {
  let mail = new FormData(form);
  mail.append('index',index);
 // sendMail(mail);
 /* document.getElementById("form_lastname").value = "";
 document.getElementById("form_name").value = "";
 document.getElementById("form_message").value = "";
 document.getElementById("form_email").value = "";
 document.getElementById("form_phone").value = "";
 */
 document.getElementById("contact-forms").reset();

 $('#submit_id').prop('disabled', true);
 $('#loader').show();
 //console.log(sendMail(mail));


if(sendMail(mail)== 200);
  {
    $('#submit_id').prop('disabled', false);
    $('#loader').hide();
  Swal.fire({
      icon: 'success',
      title: 'Success...',
      text: 'Message sent successfully',
     
    })
  }
 
}});

const sendMail = (mail) => {
  fetch("/send", {
    method: "post",
    body: mail,
  }).then((response) => {
    return response.status;
  });
};

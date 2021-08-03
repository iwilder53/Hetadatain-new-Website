
var presentation_button_index;
   function showCeoContact(){
     console.log('ceo button works');
    $("#ceoModal").modal('show'); 
}
function showModal(index ) {
  presentation_button_index = index;
    $("#myModal1").modal('show');  }
  
  function closeModal() {
    $("#myModal1").modal('hide');   }

const formModal = document.getElementById("modal-form");
var index = 0;

const formEventPresentation = formModal.addEventListener("submit", (event) => {
  $("#modal-form").validator();
  event.preventDefault();
  if (event.defaultPrevented) {
  let mail = new FormData(formModal);
  mail.append('index',presentation_button_index);
  console.log('form event fired');

 // sendMail(mail);
/*  document.getElementById("last_name").value = "Enter your last name ";
 document.getElementById("first_name").value = " Enter your first name";
 document.getElementById("email").value = " Enter your email address";
 */


 $('#submit_id').prop('disabled', true);
 $('#loader').show();
 //console.log(sendMail(mail));

if(sendMailPresentation(mail)== 200);
  {
    $('#submit_id').prop('disabled', false);
    $('#loader').hide();
    $("#myModal1").modal('hide');
  Swal.fire({
      icon: 'success',
      title: 'Success...',
      text: 'Please check your mailbox for the link',
     
    })
  }
  document.getElementById("modal-forms").reset();

}});

const sendMailPresentation = (mail) => {
  fetch("/presentation", {
    method: "post",
    body: mail,
  }).then((response) => {
    return response.status;
  });
};

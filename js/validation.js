$(document).ready( function() {
  $("#contact-forms").validator();

  // when the form is submitted
  $("#contact-forms").on("submit", function(e) {
    // if the validator does not prevent form submit
    if (!e.isDefaultPrevented()) {
     
      var messageAlert = "alert-success";
      var messageText =
        "Your message was sent, thank you. I will get back to you soon.";

      // let's compose Bootstrap alert box HTML
      var alertBox =
        '<div class="alert ' +
        messageAlert +
        ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
        messageText +
        "</div>";

      // If we have messageAlert and messageText
      if (messageAlert && messageText) {
        // inject the alert to .messages div in our form
        $("#contact-forms").find(".messages").html(alertBox);
        // empty the form
        $("#contact-forms")[0].reset();
      }

      return false;
    }
  });
});
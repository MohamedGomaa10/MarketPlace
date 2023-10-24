
import 'jquery';
import $ from 'jquery';
/* eslint-disable */

$("#SubmitPay").click(function(event) {
    // Prevent default browser behavior
    event.preventDefault();

    // Serialize data
    var form_data = $("#FormPay").serialize();

    // Send the POST request to Moyasar
    $.ajax({
        url: "https://api.moyasar.com/v1/payments",
        type: "POST",
        data: form_data,
        dataType: "json",
    })
    // uses `.done` callback to handle a successful AJAX request
    .done(function(data) {
        // Grab the payment ID
        var paymentId = data.id;
        // ... save your ID somewhere save in your backend.

        // Redirect the user to the bank page.
        window.location.href = data.source.transaction_url;
    });
});

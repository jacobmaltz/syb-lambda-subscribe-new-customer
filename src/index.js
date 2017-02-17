import axios from "axios";
import "babel-polyfill";

exports.handler = function(event, context) {
    console.log("Received event:", JSON.stringify(event, null, 2));
    console.log("Received context:", JSON.stringify(context, null, 2));

    const {zuoraApiHost} = event["stage-variables"];
    const url = `https://${zuoraApiHost}/rest/v1/accounts`;

    //TODO
    const billing = {};
    const paymentMethodId = "";
    const planId = "";

    axios.post(url, {
        name: "TODO",
        currency: "EUR",
        billToContact: {
            firstName: billing.givenName,
            lastName: billing.familyName
        },
        hpmCreditCardPaymentMethodId: paymentMethodId,
        subscription: {
            termType: "EVERGREEN",
            contractEffectiveDate: "TODO",
            subscribeToRatePlans: [
                {
                    productRatePlanId: planId
                }
            ]
        }
    }, {
        headers: {
            ...event["stage-variables"],
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
};

import axios from "axios";
import "babel-polyfill";
import moment from "moment";

exports.handler = function(event, context) {
    console.log("Received event:", JSON.stringify(event, null, 2));
    console.log("Received context:", JSON.stringify(context, null, 2));

    const {zuoraApiHost} = event["stage-variables"];
    const url = `https://${zuoraApiHost}/rest/v1/accounts`;

    const {billingInfo, subscriptionPlanId, paymentMethodId} = event["body-json"];

    //TODO verify all parameters
    axios.post(url, {
        name: "TODO",
        currency: "EUR",
        billToContact: {
            country: billingInfo.country,
            firstName: billingInfo.givenName,
            lastName: billingInfo.familyName
        },
        hpmCreditCardPaymentMethodId: paymentMethodId,
        subscription: {
            termType: "EVERGREEN",
            contractEffectiveDate: moment().format("YYYY-MM-DD"),
            subscribeToRatePlans: [
                {
                    productRatePlanId: subscriptionPlanId
                }
            ]
        }
    }, {
        headers: {
            ...event["stage-variables"],
            "Content-Type": "application/json"
        }
    })
    .then(({data}) => {
        if (data.success) {
            console.log("ZUORA OK");
        } else {
            console.log("ZUORA ERROR");
            console.log(data);
            context.fail(JSON.stringify({
                code: "ZuoraError",
                ...data
            }));
        }
    })
    .catch((error) => {
        console.log("ZUORA ERROR");
        console.log(error);
        context.fail(JSON.stringify({
            code: "ZuoraError",
            ...error
        }));
    });
};